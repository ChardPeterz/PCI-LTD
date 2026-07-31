"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { JourneyStep } from "@/lib/admin/types";

const STORAGE_KEY = "pci_sid";
const CONSENT_KEY = "pci_cookie_consent_v1";
const JOURNEY_KEY = "pci_journey_v1";
const SESSION_START_KEY = "pci_session_start";

function makeId(): string {
  const rand = Math.random().toString(36).slice(2, 10).toUpperCase();
  const tag =
    typeof navigator !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
      ? "MO"
      : "WB";
  return `S-${tag}-${rand}`;
}

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = window.sessionStorage.getItem(STORAGE_KEY);
    if (!id || !/^S-[A-Z0-9]{2,4}-[A-Za-z0-9]{4,16}$/.test(id)) {
      id = makeId();
      window.sessionStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    return makeId();
  }
}

function readConsent(): "accepted" | "rejected" | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    if (raw === "accepted" || raw === "rejected") return raw;
    const parsed = JSON.parse(raw) as { choice?: string };
    if (parsed?.choice === "accepted" || parsed?.choice === "rejected") {
      return parsed.choice;
    }
    return null;
  } catch {
    return null;
  }
}

function labelForPath(p: string): string {
  if (p === "/" || p === "") return "Home";
  if (p.startsWith("/admin")) return "Admin";
  const seg = p.split("/").filter(Boolean)[0] ?? "Page";
  return seg
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function readJourney(): JourneyStep[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(JOURNEY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeJourney(journey: JourneyStep[]) {
  try {
    window.sessionStorage.setItem(JOURNEY_KEY, JSON.stringify(journey.slice(-20)));
  } catch {
    // ignore quota errors
  }
}

function getSessionStartMs(): number {
  if (typeof window === "undefined") return Date.now();
  try {
    const raw = window.sessionStorage.getItem(SESSION_START_KEY);
    if (raw) {
      const n = Number(raw);
      if (Number.isFinite(n)) return n;
    }
    const now = Date.now();
    window.sessionStorage.setItem(SESSION_START_KEY, String(now));
    return now;
  } catch {
    return Date.now();
  }
}

export function SessionTracker() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    function onChange(e: Event) {
      const detail = (e as CustomEvent<{ choice?: "accepted" | "rejected" }>).detail;
      if (detail?.choice === "accepted" || detail?.choice === "rejected") {
        setConsent(detail.choice);
      } else {
        setConsent(readConsent());
      }
    }
    window.addEventListener("pci-consent-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("pci-consent-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  useEffect(() => {
    if (!pathname) return;
    if (consent === "rejected") return;
    if (pathname.startsWith("/admin") || pathname.startsWith("/api/")) return;

    const sessionId = getOrCreateSessionId();
    if (!sessionId) return;

    // Append this page-view to the in-session journey if it's a new path.
    const startMs = getSessionStartMs();
    const journey = readJourney();
    const last = journey[journey.length - 1];
    const at = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    if (!last || last.path !== pathname) {
      journey.push({
        path: pathname,
        label: labelForPath(pathname),
        at,
        thumbnail: "",
      });
      writeJourney(journey);
    }

    function buildPayload(): string {
      const fresh = readJourney();
      const duration = Math.max(0, Math.round((Date.now() - startMs) / 1000));
      return JSON.stringify({
        sessionId,
        journey: fresh,
        duration,
        pages: fresh.length,
      });
    }

    function send(useBeacon: boolean) {
      const body = buildPayload();
      try {
        if (
          useBeacon &&
          typeof navigator !== "undefined" &&
          typeof navigator.sendBeacon === "function"
        ) {
          const blob = new Blob([body], { type: "application/json" });
          if (navigator.sendBeacon("/api/track", blob)) return;
        }
      } catch {
        /* fall through */
      }
      void fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => undefined);
    }

    // Initial page-view beacon
    send(true);

    // Heartbeat every 10s while the tab is visible so dwell time is recorded
    // even when the visitor stays on a single page.
    const HEARTBEAT_MS = 10_000;
    let heartbeatId: ReturnType<typeof setInterval> | null = null;

    function startHeartbeat() {
      if (heartbeatId !== null) return;
      heartbeatId = setInterval(() => {
        if (typeof document !== "undefined" && document.visibilityState === "visible") {
          send(false);
        }
      }, HEARTBEAT_MS);
    }
    function stopHeartbeat() {
      if (heartbeatId !== null) {
        clearInterval(heartbeatId);
        heartbeatId = null;
      }
    }

    function onVisibility() {
      if (document.visibilityState === "hidden") {
        send(true);
        stopHeartbeat();
      } else if (document.visibilityState === "visible") {
        startHeartbeat();
      }
    }
    function onPageHide() {
      send(true);
      stopHeartbeat();
    }

    if (typeof document !== "undefined" && document.visibilityState === "visible") {
      startHeartbeat();
    }
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      stopHeartbeat();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [pathname, consent]);

  return null;
}

