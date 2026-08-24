import { NextResponse } from "next/server";
import { clearAllSessions, listSessions } from "@/lib/admin/sessionStore";

export const runtime = "nodejs";

export async function GET() {
  try {
    const sessions = await listSessions();
    return NextResponse.json({ sessions });
  } catch (err) {
    console.error("[api/admin/sessions] failed to load sessions:", err);
    return NextResponse.json({ error: "Failed to load sessions" }, { status: 500 });
  }
}

export async function DELETE() {
  const { clearedCount } = await clearAllSessions();
  return NextResponse.json({ clearedCount });
}
