import { NextResponse } from "next/server";
import {
  ADMIN_AUTH_COOKIE,
  getAdminAuthCookieValue,
  isAdminAuthConfigured,
  isValidAdminPassword,
} from "@/lib/admin/auth";
import {
  isIpLockedOut,
  recordFailedAttempt,
  clearFailureRecord,
} from "@/lib/admin/failban";

export const runtime = "nodejs";

type AuthPayload = {
  password?: string;
};

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const firstForwarded = forwarded?.split(",")[0]?.trim();
  return firstForwarded ?? "unknown";
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  let originHost = "";
  try {
    originHost = new URL(origin).hostname.toLowerCase();
  } catch {
    return false;
  }

  const hostHeader = request.headers.get("host");
  const forwardedHost = request.headers.get("x-forwarded-host");

  const candidates = [hostHeader, forwardedHost]
    .filter((value): value is string => Boolean(value))
    .flatMap((value) => value.split(","))
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
    .map((value) => value.split(":")[0]);

  if (candidates.length === 0) return true;
  return candidates.includes(originHost);
}

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Admin auth is not configured." },
      { status: 500 }
    );
  }

  if (await isIpLockedOut(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many failed attempts. Please try again later." },
      { status: 429 }
    );
  }

  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Invalid origin." }, { status: 403 });
  }

  let payload: AuthPayload = {};
  try {
    payload = (await request.json()) as AuthPayload;
  } catch {
    payload = {};
  }

  const password = payload.password ?? "";

  if (!isValidAdminPassword(password)) {
    await recordFailedAttempt(ip);
    return NextResponse.json({ ok: false, error: "Invalid password." }, { status: 401 });
  }

  await clearFailureRecord(ip);

  const cookieValue = await getAdminAuthCookieValue();
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_AUTH_COOKIE,
    value: cookieValue,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}

export async function DELETE() {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Admin auth is not configured." },
      { status: 500 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_AUTH_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
