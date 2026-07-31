import fs from "node:fs/promises";
import path from "node:path";
import * as XLSX from "xlsx";
import { seedSessions } from "./seedSessions";
import type { VisitorSession } from "./types";

const DATA_DIR =
  process.env.DATA_DIR ||
  (process.env.NODE_ENV === "production" ? "/data" : path.join(process.cwd(), "data"));
const DB_FILE = path.join(DATA_DIR, "sessions-db.json");

type SessionDb = {
  sessions: VisitorSession[];
};

async function ensureDb(): Promise<void> {
  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const initialDb: SessionDb = { sessions: seedSessions };
    await fs.writeFile(DB_FILE, JSON.stringify(initialDb, null, 2), "utf8");
  }
}

async function readDb(): Promise<SessionDb> {
  await ensureDb();
  const raw = await fs.readFile(DB_FILE, "utf8");
  return JSON.parse(raw) as SessionDb;
}

async function writeDb(db: SessionDb): Promise<void> {
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), "utf8");
}

export async function listSessions(): Promise<VisitorSession[]> {
  const db = await readDb();
  return db.sessions;
}

export async function addSession(session: VisitorSession): Promise<void> {
  const db = await readDb();
  db.sessions.unshift(session);
  await writeDb(db);
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

// Upsert a visit keyed on its stable clientId so repeated heartbeats update the
// running dwell time / page count instead of creating duplicate rows.
export async function upsertSession(session: VisitorSession): Promise<void> {
  const db = await readDb();
  const clientId = session.clientId;
  const idx = clientId
    ? db.sessions.findIndex((s) => s.clientId && s.clientId === clientId)
    : -1;

  if (idx >= 0) {
    const existing = db.sessions[idx];
    const seconds = Math.max(existing.durationSeconds ?? 0, session.durationSeconds ?? 0);
    db.sessions[idx] = {
      ...existing,
      duration: formatDuration(seconds),
      durationSeconds: seconds,
      pages: Math.max(existing.pages, session.pages),
      journey: session.journey.length >= existing.journey.length ? session.journey : existing.journey,
      timestamp: session.timestamp,
      ip: session.ip && session.ip !== "local" ? session.ip : existing.ip,
    };
  } else {
    db.sessions.unshift(session);
  }
  await writeDb(db);
}

export async function clearAllSessions(): Promise<{ clearedCount: number }> {
  const db = await readDb();
  const clearedCount = db.sessions.length;
  await writeDb({ sessions: [] });
  return { clearedCount };
}

function monthsAgoDate(months: number): Date {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);
  return cutoff;
}

export async function archiveOlderThanMonths(months: number): Promise<{
  archivedRows: VisitorSession[];
  remainingRows: VisitorSession[];
  xlsBuffer: Buffer;
}> {
  const db = await readDb();
  const cutoff = monthsAgoDate(months);

  const archivedRows = db.sessions.filter((s) => new Date(s.timestamp) < cutoff);
  const remainingRows = db.sessions.filter((s) => new Date(s.timestamp) >= cutoff);

  const exportRows = archivedRows.map((s) => ({
    session_id: s.id,
    timestamp: s.timestamp,
    city: s.city,
    country: s.country,
    region: s.region,
    source: s.source,
    browser: s.browser,
    device: s.device,
    pages: s.pages,
    duration: s.duration,
    journey: s.journey.map((step) => `${step.at} ${step.label} (${step.path})`).join(" -> "),
    coordinates: `${s.coordinates[0]}, ${s.coordinates[1]}`,
  }));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(exportRows);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Archived Sessions");
  const xlsBuffer = Buffer.from(XLSX.write(workbook, { type: "buffer", bookType: "xls" }));

  await writeDb({ sessions: remainingRows });

  return { archivedRows, remainingRows, xlsBuffer };
}
