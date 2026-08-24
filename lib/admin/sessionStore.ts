import fs from "node:fs/promises";
import path from "node:path";
import * as XLSX from "xlsx";
import { seedSessions } from "./seedSessions";
import type { VisitorSession } from "./types";

const DATA_DIR =
  process.env.DATA_DIR ||
  (process.env.NODE_ENV === "production" ? "/data" : path.join(process.cwd(), "data"));
const DB_FILE = path.join(DATA_DIR, "sessions-db.json");
const BAK_FILE = `${DB_FILE}.bak`;

type SessionDb = {
  sessions: VisitorSession[];
};

// Every read-modify-write runs through this promise chain so two concurrent
// requests can't interleave their writes and truncate the file.
let writeQueue: Promise<unknown> = Promise.resolve();
function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = writeQueue.then(fn, fn);
  writeQueue = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

async function ensureDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function isValidDb(value: unknown): value is SessionDb {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as SessionDb).sessions)
  );
}

// Best-effort extraction of individual session objects from a damaged file, so
// a truncated / partially-written DB can still be salvaged record by record.
// Session objects are nested inside the root, so we track brace starts on a
// stack and try to parse every closed object at any depth.
function salvageSessions(raw: string): VisitorSession[] {
  const salvaged: VisitorSession[] = [];
  const stack: number[] = [];
  let inString = false;
  let escaped = false;

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') {
      inString = true;
    } else if (ch === "{") {
      stack.push(i);
    } else if (ch === "}") {
      const start = stack.pop();
      if (start === undefined) continue;
      try {
        const obj = JSON.parse(raw.slice(start, i + 1));
        if (obj && typeof obj === "object" && "id" in obj && "timestamp" in obj) {
          salvaged.push(obj as VisitorSession);
        }
      } catch {
        /* skip unparseable fragment */
      }
    }
  }
  return salvaged;
}

// Atomic write: serialise to a temp file, then rename over the target. rename()
// is atomic on the same filesystem, so a crash can never leave a half-written DB.
async function writeDbAtomic(db: SessionDb): Promise<void> {
  await ensureDir();
  const json = JSON.stringify(db, null, 2);
  const tmp = `${DB_FILE}.${process.pid}.${Date.now()}.tmp`;

  // Keep the current file as a backup, but only if it is still valid JSON.
  try {
    const prev = await fs.readFile(DB_FILE, "utf8");
    JSON.parse(prev);
    await fs.writeFile(BAK_FILE, prev, "utf8");
  } catch {
    /* nothing valid to back up */
  }

  await fs.writeFile(tmp, json, "utf8");
  await fs.rename(tmp, DB_FILE);
}

async function readDb(): Promise<SessionDb> {
  await ensureDir();

  let raw: string;
  try {
    raw = await fs.readFile(DB_FILE, "utf8");
  } catch {
    const seeded: SessionDb = { sessions: seedSessions };
    await writeDbAtomic(seeded);
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw);
    if (isValidDb(parsed)) return parsed;
    throw new Error("unexpected shape");
  } catch {
    // Quarantine the damaged file so nothing is lost and it can be inspected.
    try {
      await fs.writeFile(`${DB_FILE}.corrupt-${Date.now()}.json`, raw, "utf8");
    } catch {
      /* ignore */
    }

    // 1) Restore from the last known-good backup if we have one.
    try {
      const bak = await fs.readFile(BAK_FILE, "utf8");
      const parsedBak = JSON.parse(bak);
      if (isValidDb(parsedBak)) {
        await writeDbAtomic(parsedBak);
        return parsedBak;
      }
    } catch {
      /* no usable backup */
    }

    // 2) Otherwise salvage as many individual records as possible.
    const salvaged = salvageSessions(raw);
    const recovered: SessionDb = {
      sessions: salvaged.length > 0 ? salvaged : seedSessions,
    };
    await writeDbAtomic(recovered);
    return recovered;
  }
}

export async function listSessions(): Promise<VisitorSession[]> {
  return withLock(async () => {
    const db = await readDb();
    return db.sessions;
  });
}

export async function addSession(session: VisitorSession): Promise<void> {
  await withLock(async () => {
    const db = await readDb();
    db.sessions.unshift(session);
    await writeDbAtomic(db);
  });
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

// Upsert a visit keyed on its stable clientId so repeated heartbeats update the
// running dwell time / page count instead of creating duplicate rows.
export async function upsertSession(session: VisitorSession): Promise<void> {
  await withLock(async () => {
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
    await writeDbAtomic(db);
  });
}

export async function clearAllSessions(): Promise<{ clearedCount: number }> {
  return withLock(async () => {
    const db = await readDb();
    const clearedCount = db.sessions.length;
    await writeDbAtomic({ sessions: [] });
    return { clearedCount };
  });
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
  return withLock(async () => {
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

    await writeDbAtomic({ sessions: remainingRows });

    return { archivedRows, remainingRows, xlsBuffer };
  });
}
