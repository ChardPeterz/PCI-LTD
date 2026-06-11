import { NextRequest, NextResponse } from "next/server"
import {
  ADMIN_AUTH_COOKIE,
  getAdminAuthCookieValue,
  isAdminAuthConfigured,
} from "@/lib/admin/auth"

const BLOCKED_AGENTS = [
  "gptbot", "chatgpt-user", "ccbot", "anthropic-ai", "claude-web", "claudebot",
  "cohere-ai", "google-extended", "perplexitybot", "youbot",
  "bytespider", "petalbot", "amazonbot", "applebot-extended",
  "diffbot", "facebookbot", "imagesiftbot", "omgili", "omgilibot",
  "ia_archiver", "semrushbot", "ahrefsbot", "mj12bot", "dotbot",
  "seznambot", "sogou", "exabot", "blexbot", "yandexbot",
  "scrapy", "python-requests", "wget", "curl",
]

// Simple in-memory rate limiter: ip -> { count, windowStart }
const rateLimitMap = new Map<string, { count: number; windowStart: number }>()
const RATE_LIMIT = 60       // max requests
const RATE_WINDOW = 60_000  // per 60 seconds

// Tighter bucket for auth attempts
const authBucket = new Map<string, { count: number; resetAt: number }>()

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

function isAuthRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = authBucket.get(ip)
  const limit = 8
  const windowMs = 5 * 60 * 1000

  if (!entry || entry.resetAt <= now) {
    authBucket.set(ip, { count: 1, resetAt: now + windowMs })
    return false
  }

  if (entry.count >= limit) return true
  entry.count++
  return false
}

async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const cookieValue = req.cookies.get(ADMIN_AUTH_COOKIE)?.value
  if (!cookieValue) return false
  const expected = await getAdminAuthCookieValue()
  return cookieValue === expected
}

export async function middleware(req: NextRequest) {
  const ua = (req.headers.get("user-agent") || "").toLowerCase()
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const { pathname, search } = req.nextUrl

  // Block bots and AI scrapers
  if (BLOCKED_AGENTS.some((bot) => ua.includes(bot))) {
    return new NextResponse("Access denied.", { status: 403 })
  }

  // Rate limit API routes
  if (pathname.startsWith("/api/")) {
    if (isRateLimited(ip)) {
      return new NextResponse("Too many requests.", { status: 429 })
    }
  }

  const loginPath = "/admin/login"
  const authApiPath = "/api/admin/auth"
  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/")
  const isAdminApi = pathname.startsWith("/api/admin/")

  if (pathname === authApiPath && req.method === "POST" && isAuthRateLimited(ip)) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429 })
  }

  if ((isAdminPage || isAdminApi) && !isAdminAuthConfigured()) {
    return NextResponse.json(
      { error: "Admin security is not configured. Set ADMIN_PASSWORD to enable the admin area." },
      { status: 503 }
    )
  }

  if (isAdminPage || isAdminApi) {
    // Allow the login page and the auth endpoint without authentication.
    if (pathname === loginPath || pathname === authApiPath) {
      // If the user is already logged in and visits /admin/login, send them to the dashboard.
      if (pathname === loginPath && req.method === "GET" && (await isAuthenticated(req))) {
        return NextResponse.redirect(new URL("/admin", req.url))
      }
      return NextResponse.next()
    }

    if (!(await isAuthenticated(req))) {
      if (isAdminApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      const loginUrl = new URL(loginPath, req.url)
      loginUrl.searchParams.set("next", `${pathname}${search}`)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

