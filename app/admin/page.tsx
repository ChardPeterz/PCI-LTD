"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

type PageVisit = { path: string; time: string }
type Session = {
  sessionNum: number
  pages: PageVisit[]
  startTime: string
  lastSeen: string
}
type Stats = {
  totalSessions: number
  totalPageViews: number
  pageCounts: Record<string, number>
  regionCounts: Record<string, number>
  sessions: Session[]
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050a09] flex items-center justify-center text-[#6b9b8a] text-sm">Loading...</div>}>
      <AdminDashboard />
    </Suspense>
  )
}

function AdminDashboard() {
  const params = useSearchParams()
  const key = params.get("key") || ""
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState("")
  const [lastRefresh, setLastRefresh] = useState("")
  const [clearing, setClearing] = useState(false)

  function load() {
    if (!key) { setError("Add ?key=YOUR_SECRET to the URL"); return }
    fetch(`/api/stats?key=${encodeURIComponent(key)}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json() })
      .then((d) => { setStats(d); setLastRefresh(new Date().toLocaleTimeString("en-GB")) })
      .catch(() => setError("Unauthorised or unavailable."))
  }

  function clearStats() {
    if (!confirm("Securing Privacy — this will permanently clear all session data. Continue?")) return
    setClearing(true)
    fetch(`/api/stats?key=${encodeURIComponent(key)}`, { method: "DELETE" })
      .then((r) => { if (!r.ok) throw new Error() })
      .then(() => { setStats(null); load() })
      .catch(() => setError("Failed to clear stats."))
      .finally(() => setClearing(false))
  }

  useEffect(() => { load() }, [key])

  return (
    <div className="min-h-screen bg-[#050a09] px-6 py-12 font-sans text-[#e8f4f0]">
      <div className="max-w-[960px] mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] mb-1">PCI — Internal</p>
            <h1 className="font-serif text-3xl font-light text-[#e8f4f0]">Session Stats</h1>
          </div>
          <div className="flex items-center gap-4">
            {lastRefresh && <span className="text-xs text-[#6b9b8a]">Updated {lastRefresh}</span>}
            <button
              onClick={load}
              className="text-sm px-5 py-2 rounded-full bg-[#10b981] hover:bg-[#0ea572] text-[#031a12] font-medium transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={clearStats}
              disabled={clearing}
              className="text-sm px-5 py-2 rounded-full border border-[rgba(248,113,113,0.4)] text-[#f87171] hover:bg-[rgba(248,113,113,0.08)] font-medium transition-colors disabled:opacity-50"
            >
              {clearing ? "Clearing…" : "Clear Stats"}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-[#f87171] bg-[rgba(255,80,80,0.08)] border border-[rgba(255,80,80,0.2)] rounded-xl px-5 py-4 mb-8">
            {error}
          </p>
        )}

        {stats && (
          <>
            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {[
                { label: "Total sessions", value: stats.totalSessions },
                { label: "Total page views", value: stats.totalPageViews },
                { label: "Pages tracked", value: Object.keys(stats.pageCounts).length },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-2xl p-6" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <div className="font-serif text-4xl font-light text-[#10b981] mb-1">{value}</div>
                  <div className="text-xs text-[#6b9b8a] uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>

            {/* Region summary */}
            <div className="rounded-2xl p-6 mb-8" style={{ background: "rgba(10,20,18,0.95)", border: "1px solid rgba(16,185,129,0.15)" }}>
              <h2 className="text-sm font-medium text-[#e8f4f0] mb-5">Sessions by region</h2>
              <div className="space-y-3">
                {Object.entries(stats.regionCounts)
                  .sort(([, a], [, b]) => b - a)
                  .map(([region, count]) => {
                    const max = Math.max(...Object.values(stats.regionCounts))
                    const pct = Math.round((count / max) * 100)
                    return (
                      <div key={region}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#9dc4b8]">{region}</span>
                          <span className="text-[#10b981] font-medium">{count} session{count !== 1 ? "s" : ""}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[rgba(16,185,129,0.12)]">
                          <div className="h-full rounded-full bg-[#10b981]" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            {/* Page click counts */}
            <div className="rounded-2xl p-6 mb-8" style={{ background: "rgba(10,20,18,0.95)", border: "1px solid rgba(16,185,129,0.15)" }}>
              <h2 className="text-sm font-medium text-[#e8f4f0] mb-5">Page view counts</h2>
              <div className="space-y-3">
                {Object.entries(stats.pageCounts)
                  .sort(([, a], [, b]) => b - a)
                  .map(([path, count]) => {
                    const max = Math.max(...Object.values(stats.pageCounts))
                    const pct = Math.round((count / max) * 100)
                    return (
                      <div key={path}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#9dc4b8]">{path}</span>
                          <span className="text-[#10b981] font-medium">{count}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[rgba(16,185,129,0.12)]">
                          <div className="h-full rounded-full bg-[#10b981]" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            {/* Sessions */}
            <h2 className="text-sm font-medium text-[#e8f4f0] mb-4">Sessions</h2>
            <div className="space-y-3">
              {stats.sessions.map((s) => (
                <div key={s.sessionNum} className="rounded-2xl p-5" style={{ background: "rgba(10,20,18,0.95)", border: "1px solid rgba(16,185,129,0.12)" }}>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <span className="text-sm font-medium text-[#10b981]">Session {s.sessionNum}</span>
                    {s.region && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", color: "#9dc4b8" }}>{s.region}</span>}
                    <span className="text-xs text-[#6b9b8a]">{s.pages.length} page{s.pages.length !== 1 ? "s" : ""}</span>
                    <span className="text-xs text-[#6b9b8a]">Started {new Date(s.startTime).toLocaleString("en-GB")}</span>
                    <span className="text-xs text-[#6b9b8a]">Last seen {new Date(s.lastSeen).toLocaleString("en-GB")}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {s.pages.map((p, i) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#9dc4b8" }} title={new Date(p.time).toLocaleString("en-GB")}>
                        {p.path}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
