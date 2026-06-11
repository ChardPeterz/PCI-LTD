export const ADMIN_AUTH_COOKIE = "pci_admin_auth";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

let cachedCookieValue: Promise<string> | null = null;

export function isAdminAuthConfigured(): boolean {
  return Boolean(ADMIN_PASSWORD);
}

export function isValidAdminPassword(input: string): boolean {
  if (!ADMIN_PASSWORD) return false;
  return input === ADMIN_PASSWORD;
}

// Async + Web-Crypto so this works in both Edge middleware and Node API routes.
export function getAdminAuthCookieValue(): Promise<string> {
  if (!ADMIN_PASSWORD) return Promise.resolve("");
  if (!cachedCookieValue) {
    cachedCookieValue = (async () => {
      const data = new TextEncoder().encode(`pci-ltd:${ADMIN_PASSWORD}`);
      const buf = await crypto.subtle.digest("SHA-256", data);
      return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    })();
  }
  return cachedCookieValue;
}

