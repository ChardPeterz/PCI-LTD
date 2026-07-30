import { readFile } from 'fs/promises'
import { join } from 'path'
import type { PrivacyWatchItem } from '@/lib/privacy-watch'

const FEEDS = [
  {
    name: 'EFF Updates',
    url: 'https://www.eff.org/rss/updates.xml',
  },
  {
    name: 'Schneier on Security',
    url: 'https://www.schneier.com/feed/atom/',
  },
  {
    name: 'The Register Security',
    url: 'https://www.theregister.com/security/headlines.atom',
  },
]

const MESSAGING_KEYWORDS = [
  'private message',
  'private messaging',
  'messaging app',
  'encrypted message',
  'end-to-end encryption',
  'e2ee',
  'signal',
  'whatsapp',
  'telegram',
  'imessage',
  'chat control',
  'metadata',
  'surveillance',
  'client-side scanning',
  'backdoor',
  'secure messaging',
]

function stripTags(input: string): string {
  return input.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function decodeEntities(input: string): string {
  return input
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCharCode(parseInt(hex, 16)))
}

function decodeEntitiesDeep(input: string): string {
  // Some feeds entity-encode content multiple times; decode in short passes.
  let value = input
  for (let i = 0; i < 3; i += 1) {
    const decoded = decodeEntities(value)
    if (decoded === value) break
    value = decoded
  }
  return value
}

function decodePercentEscapes(input: string): string {
  return input.replace(/%([0-9A-Fa-f]{2})/g, (_, hex: string) => {
    const value = Number.parseInt(hex, 16)
    return Number.isNaN(value) ? `%${hex}` : String.fromCharCode(value)
  })
}

function normaliseSummary(input: string): string {
  const decodedEntities = decodeEntitiesDeep(input)
  const decodedPercents = decodePercentEscapes(decodedEntities)
  const cleaned = stripTags(decodedPercents)

  // Keep card heights predictable and avoid oversized tiles from very long feed bodies.
  const MAX_SUMMARY_LENGTH = 460
  if (cleaned.length <= MAX_SUMMARY_LENGTH) return cleaned
  return `${cleaned.slice(0, MAX_SUMMARY_LENGTH).trimEnd()}...`
}

function extractBlocks(xml: string, tag: string): string[] {
  const regex = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'gi')
  return [...xml.matchAll(regex)].map((match) => match[1])
}

function extractTagValue(xml: string, tags: string[]): string | undefined {
  for (const tag of tags) {
    const regex = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i')
    const match = xml.match(regex)
    if (match?.[1]) {
      return normaliseSummary(match[1])
    }
  }
  return undefined
}

function extractAtomHref(xml: string): string | undefined {
  const relAlternate = xml.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["'][^>]*\/?>/i)
  if (relAlternate?.[1]) return relAlternate[1]

  const anyHref = xml.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i)
  if (anyHref?.[1]) return anyHref[1]

  const plainLink = extractTagValue(xml, ['link'])
  return plainLink
}

function scoreMessagingRelevance(text: string): number {
  const lowered = text.toLowerCase()
  return MESSAGING_KEYWORDS.reduce((score, keyword) => {
    return lowered.includes(keyword) ? score + 1 : score
  }, 0)
}

function coerceDate(value: string | undefined): string {
  if (!value) return new Date().toISOString()
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString()
}

function normaliseFeedEntries(feedName: string, xml: string): PrivacyWatchItem[] {
  const blocks = [...extractBlocks(xml, 'item'), ...extractBlocks(xml, 'entry')]

  return blocks
    .map((entryXml) => {
      const title = extractTagValue(entryXml, ['title'])
      const summary =
        extractTagValue(entryXml, ['description', 'summary', 'content', 'content:encoded']) ??
        'Recent privacy and security update from a trusted source.'
      const href = extractAtomHref(entryXml)
      const published = coerceDate(extractTagValue(entryXml, ['pubDate', 'published', 'updated']))

      if (!title || !href) return null

      const scoredText = `${title} ${summary}`
      const relevance = scoreMessagingRelevance(scoredText) > 0 ? 'messaging' : 'general'

      return {
        title,
        published,
        category: relevance === 'messaging' ? 'Private messaging / Security update' : 'Privacy / Security update',
        source: feedName,
        summary,
        whyItMatters:
          relevance === 'messaging'
            ? 'Private messaging policy and technical changes can directly affect confidentiality, legal exposure and data retention risk.'
            : 'Privacy and security regulation changes often shape how communication tools handle identity, retention and lawful access.',
        href,
        isLive: true,
        relevance,
      } satisfies PrivacyWatchItem
    })
    .filter((item): item is PrivacyWatchItem => item !== null)
}

async function getLiveItems(): Promise<PrivacyWatchItem[]> {
  const requests = FEEDS.map(async (feed) => {
    try {
      const res = await fetch(feed.url, {
        headers: {
          'User-Agent': 'PCI-Privacy-Watch/1.0',
        },
        next: { revalidate: 60 * 60 },
      })
      if (!res.ok) return []
      const xml = await res.text()
      return normaliseFeedEntries(feed.name, xml)
    } catch {
      return []
    }
  })

  const all = (await Promise.all(requests)).flat()
  return all
    .filter((item) => item.relevance === 'messaging')
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .slice(0, 12)
}

function markNew(items: PrivacyWatchItem[]): PrivacyWatchItem[] {
  const now = Date.now()
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000
  return items.map((item) => ({
    ...item,
    isNew: item.isNew ?? now - new Date(item.published).getTime() <= THIRTY_DAYS,
  }))
}

function dedupeItems(items: PrivacyWatchItem[]): PrivacyWatchItem[] {
  const seen = new Set<string>()
  return items.filter((item) => {
    const key = `${item.href}|${item.title}`.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public/data/privacy-watch.json')
    const data = await readFile(filePath, 'utf-8')
    const staticItems = JSON.parse(data) as PrivacyWatchItem[]
    const liveItems = await getLiveItems()

    const merged = dedupeItems(markNew([...liveItems, ...staticItems]))
      .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
      .slice(0, 36)

    return Response.json(merged)
  } catch (error) {
    console.error('Failed to load privacy watch items:', error)
    return Response.json({ error: 'Failed to load privacy watch items' }, { status: 500 })
  }
}
