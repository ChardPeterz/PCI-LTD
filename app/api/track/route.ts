import { NextRequest, NextResponse } from "next/server"
import { recordPage } from "@/lib/stats-store"

const VALID_REGIONS = ["Europe", "Americas", "Africa", "Asia", "Asia-Pacific", "Other", "Unknown"]

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const sessionId: unknown = body.sessionId
    const path: unknown = body.path
    const region: unknown = body.region

    if (
      typeof sessionId !== "string" ||
      typeof path !== "string" ||
      sessionId.length > 64 ||
      path.length > 200
    ) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    const safeId = sessionId.replace(/[^a-zA-Z0-9\-]/g, "").slice(0, 64)
    const safePath = path.replace(/[^a-zA-Z0-9\/\-_]/g, "").slice(0, 100)
    const safeRegion = (typeof region === "string" && VALID_REGIONS.includes(region)) ? region : "Unknown"

    // Never record admin page visits in stats
    if (safePath.startsWith("/admin")) {
      return NextResponse.json({ ok: true })
    }

    const session = recordPage(safeId, safePath, safeRegion)
    return NextResponse.json({ ok: true, sessionNum: session.sessionNum })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
