import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_AUTH_COOKIE, getAdminAuthCookieValue, isAdminAuthConfigured } from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function GET() {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json({ isAdmin: false });
  }
  const store = await cookies();
  const cookie = store.get(ADMIN_AUTH_COOKIE);
  const expected = await getAdminAuthCookieValue();
  const isAdmin = cookie?.value === expected;
  return NextResponse.json({ isAdmin }, { headers: { "Cache-Control": "no-store" } });
}
