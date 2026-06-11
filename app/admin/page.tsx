"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import RotatingGlobe from "./RotatingGlobe";
import SessionsTable, { type TableSession } from "./SessionsTable";
import type { VisitorSession } from "@/lib/admin/types";

const navText =
  "text-[11px] font-medium uppercase tracking-[0.28em] text-[#9dc4b8] transition-colors hover:text-[#10b981]";

type GeoSegment = { label: string; value: number; visitors: number; color: string };
type VisitSeries = { labels: readonly string[]; values: readonly number[] };
type SourceStat = { source: string; visitors: number; share: number; trend: string };

const ranges = ["hourly", "daily", "weekly", "monthly", "annual", "all-time"] as const;
type Range = (typeof ranges)[number];

const SEGMENT_COLORS = [
  "#10b981",
  "#0ea5e9",
  "#34d399",
  "#3a7a55",
  "#6b9b8a",
  "#9dc4b8",
  "#0ea572",
  "#147a5f",
];

function computeGeoDistribution(sessions: VisitorSession[]): GeoSegment[] {
  if (sessions.length === 0) return [];
  const counts = new Map<string, number>();
  for (const s of sessions) {
    const key = s.region && s.region !== "Unknown" ? s.region : (s.country || "Unknown");
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const total = sessions.length;
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([label, visitors], i) => ({
      label,
      visitors,
      value: Math.round((visitors / total) * 100),
      color: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
    }));
}

function computeSourceStats(sessions: VisitorSession[]): SourceStat[] {
  if (sessions.length === 0) return [];
  const counts = new Map<string, number>();
  for (const s of sessions) {
    const key = s.source || "Direct";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const total = sessions.length;
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([source, visitors]) => ({
      source,
      visitors,
      share: Math.round((visitors / total) * 100),
      trend: "â€”",
    }));
}

function computeVisitSeries(sessions: VisitorSession[]): Record<Range, VisitSeries> {
  const now = new Date();
  const empty = (n: number, fmt: (i: number) => string): VisitSeries => ({
    labels: Array.from({ length: n }, (_, i) => fmt(n - 1 - i)),
    values: new Array(n).fill(0),
  });

  const series: Record<Range, { labels: string[]; values: number[] }> = {
    hourly: { labels: [], values: [] },
    daily: { labels: [], values: [] },
    weekly: { labels: [], values: [] },
    monthly: { labels: [], values: [] },
    annual: { labels: [], values: [] },
    "all-time": { labels: [], values: [] },
  };

  {
    const base = empty(24, (offset) => {
      const d = new Date(now);
      d.setHours(d.getHours() - offset, 0, 0, 0);
      return `${String(d.getHours()).padStart(2, "0")}:00`;
    });
    series.hourly.labels = [...base.labels];
    series.hourly.values = [...base.values];
    for (const s of sessions) {
      const t = new Date(s.timestamp);
      const diffH = Math.floor((now.getTime() - t.getTime()) / (60 * 60 * 1000));
      if (diffH >= 0 && diffH < 24) {
        series.hourly.values[23 - diffH] += 1;
      }
    }
  }

  {
    const base = empty(14, (offset) => {
      const d = new Date(now);
      d.setDate(d.getDate() - offset);
      return `${d.getMonth() + 1}/${d.getDate()}`;
    });
    series.daily.labels = [...base.labels];
    series.daily.values = [...base.values];
    for (const s of sessions) {
      const t = new Date(s.timestamp);
      const diffD = Math.floor((now.getTime() - t.getTime()) / (24 * 60 * 60 * 1000));
      if (diffD >= 0 && diffD < 14) {
        series.daily.values[13 - diffD] += 1;
      }
    }
  }

  {
    const base = empty(12, (offset) => `W-${offset}`);
    series.weekly.labels = [...base.labels];
    series.weekly.values = [...base.values];
    for (const s of sessions) {
      const t = new Date(s.timestamp);
      const diffW = Math.floor((now.getTime() - t.getTime()) / (7 * 24 * 60 * 60 * 1000));
      if (diffW >= 0 && diffW < 12) {
        series.weekly.values[11 - diffW] += 1;
      }
    }
  }

  {
    const monthLabels: string[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      monthLabels.push(d.toLocaleString(undefined, { month: "short" }));
    }
    series.monthly.labels = monthLabels;
    series.monthly.values = new Array(12).fill(0);
    for (const s of sessions) {
      const t = new Date(s.timestamp);
      const diffM =
        (now.getFullYear() - t.getFullYear()) * 12 + (now.getMonth() - t.getMonth());
      if (diffM >= 0 && diffM < 12) {
        series.monthly.values[11 - diffM] += 1;
      }
    }
  }

  {
    const yearLabels: string[] = [];
    for (let i = 4; i >= 0; i--) {
      yearLabels.push(String(now.getFullYear() - i));
    }
    series.annual.labels = yearLabels;
    series.annual.values = new Array(5).fill(0);
    for (const s of sessions) {
      const t = new Date(s.timestamp);
      const diffY = now.getFullYear() - t.getFullYear();
      if (diffY >= 0 && diffY < 5) {
        series.annual.values[4 - diffY] += 1;
      }
    }
  }

  {
    if (sessions.length === 0) {
      series["all-time"].labels = [String(now.getFullYear())];
      series["all-time"].values = [0];
    } else {
      const years = sessions.map((s) => new Date(s.timestamp).getFullYear());
      const min = Math.min(...years, now.getFullYear());
      const max = Math.max(...years, now.getFullYear());
      const labels: string[] = [];
      const values: number[] = [];
      for (let y = min; y <= max; y++) {
        labels.push(String(y));
        values.push(sessions.filter((s) => new Date(s.timestamp).getFullYear() === y).length);
      }
      series["all-time"].labels = labels;
      series["all-time"].values = values;
    }
  }

  return series as Record<Range, VisitSeries>;
}

type ChartMode = "bar" | "line";
const ARCHIVE_MONTHS = 12;

export default function AdminPage() {
  const [sessions, setSessions] = useState<VisitorSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState("");
  const [range, setRange] = useState<Range>("monthly");
  const [chartMode, setChartMode] = useState<ChartMode>("bar");
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [isArchiving, setIsArchiving] = useState(false);
  const [archiveMessage, setArchiveMessage] = useState("");
  const [isClearing, setIsClearing] = useState(false);
  const [clearMessage, setClearMessage] = useState("");

  const archiveCutoff = useMemo(() => {
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - ARCHIVE_MONTHS);
    return cutoff;
  }, []);

  const archiveEligibleCount = useMemo(
    () => sessions.filter((item) => new Date(item.timestamp) < archiveCutoff).length,
    [archiveCutoff, sessions]
  );

  useEffect(() => {
    async function loadSessions() {
      setIsLoadingSessions(true);
      setArchiveMessage("");

      try {
        const response = await fetch("/api/admin/sessions", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to load sessions");
        const data = (await response.json()) as { sessions: VisitorSession[] };
        setSessions(data.sessions);
        setActiveSessionId((prev) => prev || data.sessions[0]?.id || "");
      } catch {
        setArchiveMessage("Could not load sessions from the database.");
      } finally {
        setIsLoadingSessions(false);
      }
    }
    void loadSessions();
  }, []);

  const activeSession = useMemo(() => {
    const selectedId = sessions.some((item) => item.id === activeSessionId)
      ? activeSessionId
      : sessions[0]?.id;
    return sessions.find((item) => item.id === selectedId) ?? null;
  }, [activeSessionId, sessions]);

  async function reloadSessions() {
    const response = await fetch("/api/admin/sessions", { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to refresh sessions");
    const data = (await response.json()) as { sessions: VisitorSession[] };
    setSessions(data.sessions);
  }

  async function handleArchiveOlderThan12Months() {
    setIsArchiving(true);
    setArchiveMessage("");

    try {
      const response = await fetch("/api/admin/archive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ months: ARCHIVE_MONTHS }),
      });

      if (!response.ok) throw new Error("Archive failed");

      const blob = await response.blob();
      const filenameMatch = response.headers
        .get("Content-Disposition")
        ?.match(/filename=\"?([^\"]+)\"?/i);
      const filename = filenameMatch?.[1] ?? `archived-sessions-${ARCHIVE_MONTHS}m.xls`;
      const objectUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(objectUrl);

      const archivedCount = Number(response.headers.get("X-Archived-Count") ?? "0");
      setArchiveMessage(
        archivedCount > 0
          ? `Archived ${archivedCount} session${archivedCount === 1 ? "" : "s"} and downloaded XLS.`
          : "No sessions older than 12 months to archive."
      );

      await reloadSessions();
    } catch {
      setArchiveMessage("Archive failed. No data was removed.");
    } finally {
      setIsArchiving(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } finally {
      window.location.href = "/";
    }
  }

  async function handleClearAllStats() {
    const confirmed = window.confirm(
      "This will permanently wipe ALL collected statistics (every visitor session, journey and source record) from the database. This action cannot be undone. Continue?"
    );
    if (!confirmed) return;

    setIsClearing(true);
    setClearMessage("");

    try {
      const response = await fetch("/api/admin/sessions", { method: "DELETE" });
      if (!response.ok) throw new Error("Clear failed");
      const data = (await response.json()) as { clearedCount: number };
      setSessions([]);
      setActiveSessionId("");
      setClearMessage(
        `Cleared ${data.clearedCount} session${data.clearedCount === 1 ? "" : "s"}. All statistics have been wiped.`
      );
    } catch {
      setClearMessage("Failed to clear statistics. No data was changed.");
    } finally {
      setIsClearing(false);
    }
  }

  const geoDistribution = useMemo(() => computeGeoDistribution(sessions), [sessions]);
  const sourceStats = useMemo(() => computeSourceStats(sessions), [sessions]);
  const visitSeries = useMemo(() => computeVisitSeries(sessions), [sessions]);

  const pieBackground = useMemo(() => {
    if (geoDistribution.length === 0) return "#0a1412";
    const result = geoDistribution.reduce(
      (acc, segment) => {
        const start = acc.current;
        const end = start + segment.value;
        return {
          current: end,
          stops: [...acc.stops, `${segment.color} ${start}% ${end}%`],
        };
      },
      { current: 0, stops: [] as string[] }
    );
    return `conic-gradient(${result.stops.join(",")})`;
  }, [geoDistribution]);

  const chartData = visitSeries[range];
  const maxValue = Math.max(...chartData.values, 1);

  const tableSessions: TableSession[] = useMemo(
    () =>
      sessions.map((s) => ({
        id: s.id,
        city: s.city,
        country: s.country,
        region: s.region,
        source: s.source,
        browser: s.browser,
        device: s.device,
        duration: s.duration,
        timestamp: s.timestamp,
        pages: s.pages,
        ip: s.ip,
      })),
    [sessions]
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#050a09] text-[#e8f4f0]">
      <header className="sticky top-0 z-40 border-b border-[rgba(16,185,129,0.18)] bg-[rgba(10,20,18,0.85)] backdrop-blur">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 md:px-8">
          <Link href="/" className="font-serif text-3xl font-light tracking-tight text-[#10b981] md:text-4xl">
            PCI Admin
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#global-stats" className={navText}>Global stats</a>
            <a href="#site-stats" className={navText}>Site stats</a>
            <a href="#source" className={navText}>Source</a>
            <button type="button" className={navText} onClick={handleLogout}>Logout</button>
            <Link href="/" className={navText}>Home</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1240px] flex-1 space-y-16 px-6 py-10 md:px-8 md:py-14">
        <section className="rounded-3xl border border-[rgba(16,185,129,0.18)] bg-[#0a1412] p-8 shadow-[0_30px_70px_-45px_rgba(16,185,129,0.5)] md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#6b9b8a]">PCI â€” Internal</p>
              <h1 className="mt-4 font-serif text-5xl font-light leading-[1.05] tracking-[-0.01em] md:text-6xl">
                Visitor Intelligence Console
              </h1>
              <p className="mt-6 max-w-3xl text-[15px] leading-[1.85] text-[#9dc4b8]">
                Unified analytics for where visitors come from, how they move through the site, and how traffic trends evolve from hourly snapshots to all-time totals.
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-2 md:items-end">
              <button
                type="button"
                onClick={handleClearAllStats}
                disabled={isClearing || (sessions.length === 0 && !isLoadingSessions)}
                className="rounded-full border border-[rgba(248,113,113,0.4)] bg-[rgba(248,113,113,0.08)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#f87171] transition hover:border-[#f87171] hover:bg-[rgba(248,113,113,0.15)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isClearing ? "Clearing..." : "Clear all stats"}
              </button>
              <p className="max-w-xs text-right text-[11px] leading-snug text-[#6b9b8a]">
                Reminder: clicking this will permanently wipe every collected visitor session, journey and source record. This cannot be undone.
              </p>
              {clearMessage && (
                <p className="max-w-xs text-right text-[11px] uppercase tracking-[0.18em] text-[#9dc4b8]">
                  {clearMessage}
                </p>
              )}
            </div>
          </div>
        </section>

        <section id="global-stats" className="rounded-3xl border border-[rgba(16,185,129,0.18)] bg-[#0a1412] p-6 md:p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#6b9b8a]">1) Global stats</p>
              <h2 className="mt-2 font-serif text-4xl font-light">Live session globe</h2>
            </div>
            <p className="text-sm text-[#9dc4b8]">Click any activity dot to inspect that visitor session.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <RotatingGlobe
                sessions={sessions}
                activeSessionId={activeSession?.id ?? ""}
                onSessionClick={setActiveSessionId}
              />
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-[rgba(16,185,129,0.18)] bg-[#050a09] p-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#6b9b8a]">Active session</p>
                {activeSession ? (
                  <>
                    <h3 className="mt-3 text-2xl font-semibold text-[#e8f4f0]">
                      {activeSession.city}, {activeSession.country}
                    </h3>
                    <p className="mt-2 text-sm text-[#9dc4b8]">
                      {activeSession.source} Â· {activeSession.browser} Â· {activeSession.device}
                    </p>
                    <p className="mt-1 text-sm text-[#9dc4b8]">Session length: {activeSession.duration}</p>

                    <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-[#9dc4b8]">
                      {activeSession.journey.map((step) => (
                        <span key={step.path + step.at} className="rounded-full border border-[rgba(16,185,129,0.22)] bg-[rgba(16,185,129,0.08)] px-3 py-1">
                          {step.path}
                        </span>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="mt-3 text-sm text-[#6b9b8a]">
                    No sessions in this view. Toggle to the other view or restore archived sessions.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[rgba(16,185,129,0.18)] bg-[#050a09] p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#6b9b8a]">Journey timeline</p>
            {activeSession && activeSession.journey.length > 0 ? (
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {activeSession.journey.map((step) => (
                  <article key={`${activeSession.id}-${step.path}-${step.at}`} className="overflow-hidden rounded-xl border border-[rgba(16,185,129,0.15)] bg-[#0a1412]">
                    <div className="relative h-32 w-full bg-[#050a09]">
                      {step.thumbnail ? (
                        <Image
                          src={step.thumbnail}
                          alt={step.label}
                          fill
                          sizes="(min-width: 768px) 30vw, 100vw"
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-serif text-3xl font-light text-[#10b981]">
                          {step.label?.charAt(0) || "?"}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 p-4">
                      <p className="text-xs uppercase tracking-[0.26em] text-[#6b9b8a]">{step.at}</p>
                      <h4 className="text-base font-semibold text-[#e8f4f0]">{step.label}</h4>
                      <p className="text-sm text-[#9dc4b8]">Path: {step.path}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-[#6b9b8a]">
                Select a session to inspect the journey timeline.
              </p>
            )}
          </div>

          <div className="mt-6">
            <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-[rgba(16,185,129,0.18)] bg-[#050a09] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[#9dc4b8]">
              <span>In database: {sessions.length}</span>
              <button
                type="button"
                onClick={handleArchiveOlderThan12Months}
                disabled={archiveEligibleCount === 0 || isArchiving}
                className="ml-auto rounded-full border border-[rgba(16,185,129,0.25)] px-3 py-1 transition hover:border-[#10b981] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isArchiving
                  ? "Archiving..."
                  : `Archive older than ${ARCHIVE_MONTHS} months (${archiveEligibleCount})`}
              </button>
            </div>
            {(isLoadingSessions || archiveMessage) && (
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#6b9b8a]">
                {isLoadingSessions ? "Loading sessions from database..." : archiveMessage}
              </p>
            )}
            <SessionsTable
              sessions={tableSessions}
              activeSessionId={activeSession?.id ?? ""}
              onSessionClick={setActiveSessionId}
            />
          </div>
        </section>

        <section id="site-stats" className="rounded-3xl border border-[rgba(16,185,129,0.18)] bg-[#0a1412] p-6 md:p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#6b9b8a]">2) Site stats</p>
              <h2 className="mt-2 font-serif text-4xl font-light">Traffic and geography charts</h2>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-[rgba(16,185,129,0.18)] bg-[#050a09] p-5">
                <h3 className="text-base font-semibold text-[#e8f4f0]">Geographic distribution</h3>
                <div className="mx-auto mt-5 h-52 w-52 rounded-full border border-[rgba(16,185,129,0.18)]" style={{ background: pieBackground }} />
                {geoDistribution.length === 0 ? (
                  <p className="mt-5 text-sm text-[#6b9b8a]">No geographic data yet.</p>
                ) : (
                  <ul className="mt-5 space-y-2 text-sm">
                    {geoDistribution.map((segment) => (
                      <li key={segment.label} className="flex items-center justify-between gap-4">
                        <span className="inline-flex items-center gap-2 text-[#9dc4b8]">
                          <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: segment.color }} />
                          {segment.label}
                        </span>
                        <span className="flex items-baseline gap-2">
                          <span className="font-semibold text-[#e8f4f0]">{segment.visitors.toLocaleString()}</span>
                          <span className="text-[#6b9b8a]">{segment.value}%</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-[rgba(16,185,129,0.18)] bg-[#050a09] p-5">
                <div className="flex flex-wrap items-center gap-4">
                  <h3 className="mr-auto text-base font-semibold text-[#e8f4f0]">Visits over time</h3>
                  <div className="inline-flex rounded-full border border-[rgba(16,185,129,0.22)] bg-[#0a1412] p-1 text-xs uppercase tracking-[0.2em]">
                    <button
                      type="button"
                      onClick={() => setChartMode("bar")}
                      className={`rounded-full px-3 py-1 transition ${
                        chartMode === "bar" ? "bg-[#10b981] text-[#031a12]" : "text-[#9dc4b8]"
                      }`}
                    >
                      Bar
                    </button>
                    <button
                      type="button"
                      onClick={() => setChartMode("line")}
                      className={`rounded-full px-3 py-1 transition ${
                        chartMode === "line" ? "bg-[#10b981] text-[#031a12]" : "text-[#9dc4b8]"
                      }`}
                    >
                      Line
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {ranges.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setRange(option)}
                      className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.2em] transition ${
                        range === option
                          ? "border-[#10b981] bg-[#10b981] text-[#031a12]"
                          : "border-[rgba(16,185,129,0.22)] bg-[#0a1412] text-[#9dc4b8] hover:border-[#10b981]/60"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-[rgba(16,185,129,0.12)] bg-[#0a1412] p-3">
                  <svg viewBox="0 0 660 260" className="w-full" role="img" aria-label={`${range} visits chart`}>
                    <line x1="40" y1="220" x2="640" y2="220" stroke="#1a4a3d" strokeWidth="1" />
                    <line x1="40" y1="30" x2="40" y2="220" stroke="#1a4a3d" strokeWidth="1" />

                    {chartMode === "bar"
                      ? chartData.values.map((value, index) => {
                          const slot = 580 / chartData.values.length;
                          const padding = Math.min(8, Math.max(2, slot * 0.2));
                          const barWidth = Math.max(slot - padding, 2);
                          const x = 50 + index * slot + padding / 2;
                          const height = (value / maxValue) * 170;
                          const y = 220 - height;
                          return (
                            <rect
                              key={`${range}-${index}`}
                              x={x}
                              y={y}
                              width={barWidth}
                              height={height}
                              fill="#10b981"
                              rx={Math.min(4, barWidth / 2)}
                            />
                          );
                        })
                      : (() => {
                          const points = chartData.values
                            .map((value, index) => {
                              const step = 580 / Math.max(chartData.values.length - 1, 1);
                              const x = 50 + index * step;
                              const y = 220 - (value / maxValue) * 170;
                              return `${x},${y}`;
                            })
                            .join(" ");

                          return (
                            <>
                              <polyline
                                points={points}
                                fill="none"
                                stroke="#10b981"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              {chartData.values.map((value, index) => {
                                const step = 580 / Math.max(chartData.values.length - 1, 1);
                                const x = 50 + index * step;
                                const y = 220 - (value / maxValue) * 170;
                                return <circle key={`${range}-pt-${index}`} cx={x} cy={y} r={4} fill="#10b981" />;
                              })}
                            </>
                          );
                        })()}

                    {(() => {
                      const labelCount = chartData.labels.length;
                      const stride = labelCount > 16 ? 4 : labelCount > 10 ? 2 : 1;
                      return chartData.labels.map((label, index) => {
                        if (labelCount > 1 && index % stride !== 0 && index !== labelCount - 1) {
                          return null;
                        }
                        const slot = chartMode === "bar" ? 580 / labelCount : 580 / Math.max(labelCount - 1, 1);
                        const x =
                          labelCount === 1
                            ? 50
                            : chartMode === "bar"
                            ? 50 + index * slot + slot / 2
                            : 50 + index * slot;
                        return (
                          <text
                            key={`${range}-label-${index}-${label}`}
                            x={x}
                            y={244}
                            textAnchor="middle"
                            fontSize="11"
                            fill="#6b9b8a"
                          >
                            {label}
                          </text>
                        );
                      });
                    })()}
                  </svg>
                </div>

                <p className="mt-4 text-sm text-[#9dc4b8]">
                  Showing {range} visitor totals with {chartMode} visualization.
                  {range === "all-time" ? " All-time always includes archived and active history from inception." : ""}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="source" className="rounded-3xl border border-[rgba(16,185,129,0.18)] bg-[#0a1412] p-6 md:p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#6b9b8a]">3) Source</p>
          <h2 className="mt-2 font-serif text-4xl font-light">Acquisition channels</h2>

          <div className="mt-6 grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3 rounded-2xl border border-[rgba(16,185,129,0.18)] bg-[#050a09] p-5">
              <div className="grid grid-cols-4 border-b border-[rgba(16,185,129,0.18)] pb-3 text-xs font-medium uppercase tracking-[0.22em] text-[#6b9b8a]">
                <span>Source</span>
                <span className="text-right">Visitors</span>
                <span className="text-right">Share</span>
                <span className="text-right">Trend</span>
              </div>
              <div className="mt-2 space-y-2">
                {sourceStats.length === 0 ? (
                  <p className="px-2 py-2 text-sm text-[#6b9b8a]">No source data yet.</p>
                ) : (
                  sourceStats.map((row) => (
                    <div key={row.source} className="grid grid-cols-4 items-center rounded-lg px-2 py-2 text-sm hover:bg-[rgba(16,185,129,0.05)]">
                      <span className="font-medium text-[#e8f4f0]">{row.source}</span>
                      <span className="text-right text-[#9dc4b8]">{row.visitors.toLocaleString()}</span>
                      <span className="text-right text-[#9dc4b8]">{row.share}%</span>
                      <span className={`text-right font-medium ${row.trend.startsWith("-") ? "text-[#f87171]" : "text-[#10b981]"}`}>
                        {row.trend}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="lg:col-span-2 rounded-2xl border border-[rgba(16,185,129,0.18)] bg-[#050a09] p-5">
              <h3 className="text-base font-semibold text-[#e8f4f0]">Source intensity</h3>
              <div className="mt-4 space-y-4">
                {sourceStats.length === 0 ? (
                  <p className="text-sm text-[#6b9b8a]">No source data yet.</p>
                ) : (
                  sourceStats.map((row) => (
                    <div key={`${row.source}-bar`}>
                      <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[#9dc4b8]">
                        <span>{row.source}</span>
                        <span>{row.share}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-[rgba(16,185,129,0.12)]">
                        <div className="h-2 rounded-full bg-[#10b981]" style={{ width: `${row.share}%` }} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
