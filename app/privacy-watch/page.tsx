'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import type { PrivacyWatchItem } from "@/lib/privacy-watch"

export default function PrivacyWatchPage() {
  const [items, setItems] = useState<PrivacyWatchItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch('/api/privacy-watch')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setItems(data)
      } catch (err) {
        setError('Failed to load privacy watch items')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [])

  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <main className="relative z-[1] py-16 md:py-24 px-6 md:px-12 max-w-[1100px] mx-auto">
        <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] mb-3">Privacy Watch</p>
        <h1 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#e8f4f0] mb-4 text-balance">
          Current privacy breaches, user exposure and message-evidence cases
        </h1>

        {loading && <p className="text-[#7aa898] py-8">Loading privacy watch items...</p>}
        {error && <p className="text-[#f87171] py-8">{error}</p>}

        <div className="grid gap-5 mb-12">
          {items.map((item) => (
            <article
              key={`${item.published}-${item.title}`}
              className="rounded-2xl p-6"
              style={{
                background: "rgba(10,20,18,0.92)",
                border: item.isNew ? "1px solid rgba(245,158,11,0.35)" : "1px solid rgba(16,185,129,0.18)",
                boxShadow: item.isNew ? "0 0 24px rgba(245,158,11,0.14)" : "none",
              }}
            >
              <div className="flex items-center gap-3 flex-wrap mb-3">
                <span className="text-[11px] tracking-widest uppercase text-[#6ee7b7]">{item.category}</span>
                <span className="text-xs text-[#7aa898]">{item.published}</span>
                <span className="text-xs text-[#7aa898]">{item.source}</span>
                {item.isNew ? <span className="text-[10px] uppercase tracking-widest text-[#f59e0b]">New</span> : null}
              </div>
              <h2 className="text-xl text-[#e8f4f0] font-light mb-3">{item.title}</h2>
              <p className="text-sm text-[#9dc4b8] leading-relaxed mb-3">{item.summary}</p>
              <p className="text-sm text-[#b6f5d9] leading-relaxed mb-4">Why it matters: {item.whyItMatters}</p>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#f8e7bf] hover:text-white underline underline-offset-4"
              >
                Read the article
              </a>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/speakez" className="inline-flex items-center border border-[rgba(16,185,129,0.4)] hover:border-[#10b981] text-[#9dc4b8] hover:text-[#e8f4f0] px-5 py-3 rounded-full text-sm transition-colors">
            Back to Speak Ez
          </Link>
          <Link href="/speakez/use-cases" className="inline-flex items-center border border-[rgba(16,185,129,0.4)] hover:border-[#10b981] text-[#9dc4b8] hover:text-[#e8f4f0] px-5 py-3 rounded-full text-sm transition-colors">
            Use cases and privacy gaps
          </Link>
          <Link href="/contact" className="inline-flex items-center bg-[#10b981] hover:bg-[#0ea572] text-[#031a12] px-5 py-3 rounded-full text-sm font-medium transition-colors">
            Talk to us
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}