"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Lock } from "lucide-react"

export function AdminFab() {
  const pathname = usePathname()

  // Hide on admin pages themselves to avoid clutter / loops.
  if (pathname?.startsWith("/admin")) return null

  return (
    <Link
      href="/admin/login"
      aria-label="Admin login"
      title="Admin login"
      className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full border border-[rgba(16,185,129,0.35)] bg-[rgba(10,20,18,0.85)] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.22em] text-[#9dc4b8] shadow-[0_10px_30px_-12px_rgba(16,185,129,0.55)] backdrop-blur transition hover:border-[#10b981] hover:bg-[rgba(16,185,129,0.12)] hover:text-[#e8f4f0]"
    >
      <Lock size={14} className="text-[#10b981]" aria-hidden="true" />
      Admin
    </Link>
  )
}
