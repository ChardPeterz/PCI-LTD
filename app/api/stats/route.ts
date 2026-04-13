import { NextRequest, NextResponse } from "next/server"
import { getStats, clearStats } from "@/lib/stats-store"

function checkAuth(req: NextRequest): boolean {
  const secret = process.env.STATS_SECRET
  const provided = req.nextUrl.searchParams.get("key")
  return !!(secret && provided === secret)
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
  }
  return NextResponse.json(getStats())
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
  }
  clearStats()
  return NextResponse.json({ ok: true })
}
