export type PrivacyWatchItem = {
  title: string
  published: string
  category: string
  source: string
  summary: string
  whyItMatters: string
  href: string
  isNew?: boolean
  isLive?: boolean
  relevance?: 'messaging' | 'general'
}

// Legacy export - now always true since feed updates dynamically
export const hasNewPrivacyWatchItem = true