import { NextResponse } from "next/server";
import { clearAllSessions, listSessions } from "@/lib/admin/sessionStore";

export const runtime = "nodejs";

export async function GET() {
  const sessions = await listSessions();
  return NextResponse.json({ sessions });
}

export async function DELETE() {
  const { clearedCount } = await clearAllSessions();
  return NextResponse.json({ clearedCount });
}
