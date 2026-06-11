import { NextResponse } from "next/server";
import { addSession } from "@/lib/admin/sessionStore";
import { lookupIpLocation } from "@/lib/admin/ipLocation";
import { parseSource, parseUserAgent } from "@/lib/admin/userAgent";
import type { JourneyStep, VisitorSession } from "@/lib/admin/types";

export const runtime = "nodejs";

type TrackPayload = {
  journey?: JourneyStep[];
  duration?: number;
  pages?: number;
};

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
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

// In-memory dedup: one session recorded per IP per 10 minutes
const DEDUP_STORE = globalThis as typeof globalThis & {
  __trackDedup?: Map<string, number>;
};
const dedup = DEDUP_STORE.__trackDedup ?? new Map<string, number>();
DEDUP_STORE.__trackDedup = dedup;

function isDuplicate(ip: string): boolean {
  const now = Date.now();
  const last = dedup.get(ip);
  if (last && now - last < 10 * 60 * 1000) return true;
  dedup.set(ip, now);
  return false;
}

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (isDuplicate(ip)) {
    return NextResponse.json({ ok: true });
  }

  let body: TrackPayload;
  try {
    body = (await request.json()) as TrackPayload;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const journey: JourneyStep[] = Array.isArray(body.journey) ? body.journey : [];
  const duration = typeof body.duration === "number" ? body.duration : 0;
  const pages = typeof body.pages === "number" ? body.pages : Math.max(1, journey.length);

  // Ignore very short visits (likely bots or accidental loads)
  if (duration < 5) {
    return NextResponse.json({ ok: true });
  }

  // Ignore admin paths in journey
  if (journey.some((step) => step.path?.startsWith("/admin"))) {
    return NextResponse.json({ ok: true });
  }

  const ua = request.headers.get("user-agent") ?? "";
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
    timestamp: new Date().toISOString(),
    pages: Math.max(1, pages),
    coordinates: geo.coordinates,
    journey,
    ip: geo.isPrivate ? "local" : geo.ip,
  };

  await addSession(session);
  return NextResponse.json({ ok: true });
}

