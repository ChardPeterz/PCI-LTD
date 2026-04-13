"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

function getSessionId(): string {
  try {
    const existing = sessionStorage.getItem("pci-sid")
    if (existing) return existing
    const id = crypto.randomUUID()
    sessionStorage.setItem("pci-sid", id)
    return id
  } catch {
    return "unknown"
  }
}

function getRegion(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
    if (!tz || tz === "UTC" || tz.startsWith("Etc/")) return "Other"
    const prefix = tz.split("/")[0]
    const map: Record<string, string> = {
      Europe: "Europe",
      America: "Americas",
      Atlantic: "Americas",
      Africa: "Africa",
      Asia: "Asia",
      Indian: "Asia",
      Australia: "Asia-Pacific",
      Pacific: "Asia-Pacific",
      Arctic: "Europe",
      Antarctica: "Other",
    }
    return map[prefix] || "Other"
  } catch {
    return "Other"
  }
}

export function SessionTracker() {
  const pathname = usePathname()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    if (lastPath.current === pathname) return
    lastPath.current = pathname

    // Don't track admin visits
    if (pathname.startsWith("/admin")) return

    const sessionId = getSessionId()
    const region = getRegion()
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, path: pathname, region }),
    }).catch(() => {})
  }, [pathname])

  return null
}
