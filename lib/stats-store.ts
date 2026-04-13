// Persisted to /data/stats.json — contains NO personal data.
// Stores only: anonymous session numbers, page paths, timestamps, and broad region (e.g. "Europe").
// No IPs, no identifiers, no personal data. Privacy policy unchanged.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"

const DATA_DIR = process.env.DATA_DIR || "/data"
const STATS_FILE = join(DATA_DIR, "stats.json")

export type PageVisit = {
  path: string
  time: string
}

export type Session = {
  sessionNum: number
  pages: PageVisit[]
  startTime: string
  lastSeen: string
  region?: string
}

type Store = {
  sessions: Record<string, Session>
  nextNum: number
}

function ensureDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
}

function readStore(): Store {
  ensureDir()
  if (!existsSync(STATS_FILE)) return { sessions: {}, nextNum: 1 }
  try {
    return JSON.parse(readFileSync(STATS_FILE, "utf-8"))
  } catch {
    return { sessions: {}, nextNum: 1 }
  }
}

function writeStore(store: Store) {
  ensureDir()
  writeFileSync(STATS_FILE, JSON.stringify(store))
}

export function recordPage(sessionId: string, path: string, region?: string): Session {
  const store = readStore()
  const now = new Date().toISOString()

  if (!store.sessions[sessionId]) {
    store.sessions[sessionId] = {
      sessionNum: store.nextNum++,
      pages: [],
      startTime: now,
      lastSeen: now,
      region: region || "Unknown",
    }
  }

  const session = store.sessions[sessionId]
  session.pages.push({ path, time: now })
  session.lastSeen = now
  writeStore(store)
  return session
}

export function getStats() {
  const store = readStore()
  const sessions = Object.values(store.sessions).sort(
    (a, b) => a.sessionNum - b.sessionNum
  )
  const pageCounts: Record<string, number> = {}
  for (const s of sessions) {
    for (const p of s.pages) {
      pageCounts[p.path] = (pageCounts[p.path] || 0) + 1
    }
  }
  const regionCounts: Record<string, number> = {}
  for (const s of sessions) {
    const r = s.region || "Unknown"
    regionCounts[r] = (regionCounts[r] || 0) + 1
  }
  return {
    totalSessions: sessions.length,
    totalPageViews: sessions.reduce((sum, s) => sum + s.pages.length, 0),
    pageCounts,
    regionCounts,
    sessions,
  }
}

export function clearStats() {
  ensureDir()
  writeStore({ sessions: {}, nextNum: 1 })
}

