import { NextResponse } from "next/server";
import { upsertSession } from "@/lib/admin/sessionStore";
import { isPrivateIp, lookupIpLocation } from "@/lib/admin/ipLocation";
import { parseSource, parseUserAgent } from "@/lib/admin/userAgent";
import type { JourneyStep, VisitorSession } from "@/lib/admin/types";

export const runtime = "nodejs";

type TrackPayload = {
  sessionId?: string;
  journey?: JourneyStep[];
  duration?: number;
  pages?: number;
};

// Pick the most trustworthy client IP available. Order matters: single-value
// proxy headers set by Cloudflare / a trusted reverse proxy are preferred over
// the multi-hop X-Forwarded-For chain, from which we take the first public IP.
function clientIp(request: Request): string {
  const h = request.headers;

  const direct =
    h.get("cf-connecting-ip") ||
    h.get("true-client-ip") ||
    h.get("x-real-ip");
  if (direct && direct.trim()) return direct.trim();

  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    const chain = forwarded.split(",").map((part) => part.trim()).filter(Boolean);
    const publicIp = chain.find((ip) => !isPrivateIp(ip));
    if (publicIp) return publicIp;
    if (chain[0]) return chain[0];
  }

  return "unknown";
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

function generateId(countryCode: string): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `S-${(countryCode || "XX").toUpperCase()}-${num}`;
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const ua = request.headers.get("user-agent") ?? "";

  let body: TrackPayload;
  try {
    body = (await request.json()) as TrackPayload;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const journey: JourneyStep[] = Array.isArray(body.journey) ? body.journey : [];
  const duration = typeof body.duration === "number" ? body.duration : 0;
  const pages = typeof body.pages === "number" ? body.pages : Math.max(1, journey.length);

  // Stable per-browser id used to upsert this visit. Falls back to IP+UA so
  // visits without a client id still coalesce instead of duplicating.
  const clientId =
    String(body.sessionId ?? "").trim().slice(0, 64) || `ipua:${ip}|${ua}`.slice(0, 128);

  // Ignore very short visits (likely bots or accidental loads)
  if (duration < 3) {
    return NextResponse.json({ ok: true });
  }

  // Ignore admin paths in journey
  if (journey.some((step) => step.path?.startsWith("/admin"))) {
    return NextResponse.json({ ok: true });
  }

  const referer = request.headers.get("referer");
  const host = request.headers.get("host") ?? "";

  const { browser, device } = parseUserAgent(ua);
  if (device === "Bot") {
    return NextResponse.json({ ok: true });
  }

  const origin = host ? `https://${host}` : "";
  const source = parseSource(referer, origin);

  const geo = await lookupIpLocation(ip);

  const session: VisitorSession = {
    id: generateId(geo.countryCode || "XX"),
    country: geo.country,
    city: geo.city,
    region: geo.region,
    source,
    browser,
    device: device === "Unknown" ? "Desktop" : device,
    duration: formatDuration(Math.round(duration)),
    durationSeconds: Math.round(duration),
    timestamp: new Date().toISOString(),
    pages: Math.max(1, pages),
    coordinates: geo.coordinates,
    journey,
    ip: geo.isPrivate ? "local" : geo.ip,
    clientId,
  };

  await upsertSession(session);
  return NextResponse.json({ ok: true });
}

