"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const CONSENT_KEY = "pci_cookie_consent_v1"

function readChoice(): "accepted" | "rejected" | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY)
    if (raw === "accepted" || raw === "rejected") return raw
  } catch {
    // ignore
  }
  return null
}

function writeChoice(choice: "accepted" | "rejected") {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice)
    window.dispatchEvent(
      new CustomEvent("pci-consent-change", { detail: { choice } })
    )
  } catch {
    // ignore
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(readChoice() === null)
  }, [])

  if (!visible) return null

  function accept() {
    writeChoice("accepted")
    setVisible(false)
  }

  function reject() {
    writeChoice("rejected")
    setVisible(false)
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 md:px-8 md:py-5"
      style={{ background: "rgba(5,10,9,0.97)", borderTop: "1px solid rgba(16,185,129,0.25)" }}
    >
      <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-sm text-[#9dc4b8] leading-relaxed max-w-2xl">
          <span className="text-[#10b981] font-medium">Privacy-first analytics.</span>{" "}
          We record anonymous session data (country, browser, pages visited, time on site) to improve our service. No personal data, no third-party trackers.{" "}
          <Link
            href="/privacy"
            className="text-[#10b981] underline underline-offset-2 hover:text-[#34d399] transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            onClick={reject}
            className="text-sm px-5 py-2 rounded-full border border-[rgba(16,185,129,0.4)] text-[#9dc4b8] hover:bg-[rgba(16,185,129,0.08)] hover:text-[#e8f4f0] font-medium transition-colors"
          >
            Reject
          </button>
          <button
            onClick={accept}
            className="text-sm px-5 py-2 rounded-full bg-[#10b981] hover:bg-[#0ea572] text-[#031a12] font-medium transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

