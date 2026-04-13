"use client"

import { useState } from "react"
import Link from "next/link"

export function CookieBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 md:px-8 md:py-5"
      style={{ background: "rgba(5,10,9,0.97)", borderTop: "1px solid rgba(16,185,129,0.25)" }}
    >
      <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-sm text-[#9dc4b8] leading-relaxed max-w-2xl">
          <span className="text-[#10b981] font-medium">No cookies. No tracking. No data stored.</span>{" "}
          This site does not use cookies, collect personal data, or track visitors in any way.{" "}
          <Link
            href="/privacy"
            className="text-[#10b981] underline underline-offset-2 hover:text-[#34d399] transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
        <button
          onClick={() => setVisible(false)}
          className="flex-shrink-0 text-sm px-5 py-2 rounded-full bg-[#10b981] hover:bg-[#0ea572] text-[#031a12] font-medium transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  )
}
