export type JourneyStep = {
  path: string;
  label: string;
  at: string;
  thumbnail: string;
};

export type VisitorSession = {
  id: string;
  country: string;
  city: string;
  region: string;
  source: string;
  browser: string;
  device: string;
  duration: string;
  timestamp: string;
  pages: number;
  coordinates: [number, number];
  journey: JourneyStep[];
  /** Visitor IP address (or "local" for private/unresolved). */
  ip?: string;
  /** Stable per-browser session id used to upsert running visit stats. */
  clientId?: string;
  /** Cumulative dwell time in seconds; drives accurate duration updates. */
  durationSeconds?: number;
};
