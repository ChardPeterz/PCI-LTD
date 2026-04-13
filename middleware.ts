import { NextRequest, NextResponse } from "next/server"

const BLOCKED_AGENTS = [
  "gptbot", "chatgpt-user", "ccbot", "anthropic-ai", "claude-web",
  "cohere-ai", "google-extended", "perplexitybot", "youbot",
  "bytespider", "petalbot", "amazonbot", "applebot-extended",
  "diffbot", "facebookbot", "imagesiftbot", "omgili", "omgilibot",
  "ia_archiver", "semrushbot", "ahrefsbot", "mj12bot", "dotbot",
  "seznambot", "sogou", "exabot", "blexbot", "yandexbot",
]

// Simple in-memory rate limiter: ip -> { count, windowStart }
const rateLimitMap = new Map<string, { count: number; windowStart: number }>()
const RATE_LIMIT = 60       // max requests
const RATE_WINDOW = 60_000  // per 60 seconds

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now - entry.windowStart > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, windowStart: now })
    return false
  }

  entry.count++
  if (entry.count > RATE_LIMIT) return true
  return false
}

export function middleware(req: NextRequest) {
  const ua = (req.headers.get("user-agent") || "").toLowerCase()
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"

  // Block bots and AI scrapers
  if (BLOCKED_AGENTS.some((bot) => ua.includes(bot))) {
    return new NextResponse("Access denied.", { status: 403 })
  }

  // Rate limit API routes
  if (req.nextUrl.pathname.startsWith("/api/")) {
    if (isRateLimited(ip)) {
      return new NextResponse("Too many requests.", { status: 429 })
    }
  }

  // Block direct access to admin without a key param
  if (req.nextUrl.pathname === "/admin" && !req.nextUrl.searchParams.get("key")) {
    return new NextResponse("Not found.", { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
