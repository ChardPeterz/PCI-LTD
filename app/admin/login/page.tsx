"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function normalizeNextPath(raw: string | null): string {
  if (!raw) return "/admin";
  if (!raw.startsWith("/")) return "/admin";
  if (raw.startsWith("//")) return "/admin";
  return raw;
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextPath = useMemo(() => normalizeNextPath(searchParams.get("next")), [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        let message = "Incorrect password.";
        try {
          const data = (await response.json()) as { error?: string };
          if (typeof data.error === "string" && data.error.trim()) {
            message = data.error;
          }
        } catch {
          // Fall back to default message when response is not JSON.
        }

        if (response.status === 429) {
          setError("Too many attempts. Try again later.");
        } else {
          setError(message);
        }
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Could not verify password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050a09] px-6 py-10 text-[#e8f4f0]">
      <section className="w-full max-w-md rounded-3xl border border-[rgba(16,185,129,0.18)] bg-[#0a1412] p-8 shadow-[0_30px_70px_-45px_rgba(16,185,129,0.5)]">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#6b9b8a]">PCI — Admin access</p>
        <h1 className="mt-4 font-serif text-5xl font-light leading-[1.05] tracking-[-0.01em] md:text-6xl">
          Enter password
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-[#9dc4b8]">
          This area is protected. Enter the admin password to continue.
        </p>

        <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
          <label
            className="block text-xs font-medium uppercase tracking-[0.18em] text-[#9dc4b8]"
            htmlFor="admin-password"
          >
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full rounded-xl border border-[rgba(16,185,129,0.25)] bg-[#050a09] px-3 py-2 text-sm text-[#e8f4f0] placeholder:text-[#6b9b8a] focus:border-[#10b981] focus:outline-none"
            placeholder="Enter admin password"
          />

          {error && <p className="text-sm text-[#f87171]">{error}</p>}

          <div className="flex items-center justify-between gap-3 pt-1">
            <Link href="/" className="text-xs uppercase tracking-[0.16em] text-[#6b9b8a] hover:text-[#10b981]">
              Back to site
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-[#10b981] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#031a12] font-medium transition hover:bg-[#0ea572] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Checking..." : "Unlock admin"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
