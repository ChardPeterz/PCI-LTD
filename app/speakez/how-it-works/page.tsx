import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export default function HowItWorksPage() {
  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <main className="relative z-[1] py-16 md:py-24 px-6 md:px-12 max-w-[1100px] mx-auto">

        {/* Header */}
        <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] mb-3">Speak Ez — how it works</p>
        <h1 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#e8f4f0] mb-4 text-balance">
          Access tiers, duration, recovery & the integrity guarantee
        </h1>
        <p className="text-base text-[#9dc4b8] leading-relaxed max-w-3xl mb-12">
          Speak Ez operates on a tiered access model with fixed-duration licences chosen up front,
          so you always know exactly what you have and when it ends.
          Security is not an add-on — it is the architecture.
        </p>

        <div
          className="rounded-2xl p-6 mb-12"
          style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(16,185,129,0.18)" }}
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[11px] font-medium tracking-widest uppercase text-[#6ee7b7] mb-2">Linked video overview</p>
              <p className="text-sm text-[#9dc4b8] leading-relaxed max-w-2xl">
                This opens directly to your chosen Speak Ez walkthrough. No TikTok embed is used on this page, so unrelated videos cannot appear here.
              </p>
            </div>
            <a
              href="https://www.tiktok.com/@speakez2026/video/7625642428573289750?is_from_webapp=1&sender_device=pc&web_id=7625243017884976662"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#0ea572] text-[#031a12] px-5 py-3 rounded-full text-sm font-medium transition-colors"
            >
              Watch how it works
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Grid of technical detail cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">

          {/* Access tiers */}
          <div
            className="rounded-2xl p-7"
            style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(16,185,129,0.18)" }}
          >
            <p className="text-[11px] font-semibold tracking-widest uppercase text-[#10b981] mb-4">Access tiers</p>
            <p className="text-sm text-[#9dc4b8] leading-relaxed mb-5">
              Access to Speak Ez works in two layers. First, you purchase{" "}
              <span className="text-[#10b981] font-medium">app access</span> — this gets you onto the platform.
              Then you add{" "}
              <span className="text-[#10b981] font-medium">Ejector Seats</span> — individual identities that are spent when activated.
              Once used, a seat is consumed and that encrypted identity exists.
              No subscriptions, no repeated charges per user — you buy seats, you spend them.
            </p>
            <div className="space-y-4">
              <div
                className="rounded-xl p-4"
                style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)" }}
              >
                <p className="text-xs font-semibold tracking-wider uppercase text-[#6ee7b7] mb-1">App Access</p>
                <p className="text-sm text-[#9dc4b8] leading-relaxed">
                  Your gateway to the platform. Choose Gold, Silver or Bronze tier — each carries a fixed validity duration suited to your needs.
                </p>
              </div>
              <div
                className="rounded-xl p-4"
                style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)" }}
              >
                <p className="text-xs font-semibold tracking-wider uppercase text-[#6ee7b7] mb-1">Ejector Seats</p>
                <p className="text-sm text-[#9dc4b8] leading-relaxed">
                  Single-use encrypted identity tokens purchased separately.
                  Each seat, once activated, creates one independent encrypted identity.
                  Spend a seat — get an identity. Simple.
                </p>
              </div>
            </div>
          </div>

          {/* Duration & expiry */}
          <div
            className="rounded-2xl p-7"
            style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(16,185,129,0.18)" }}
          >
            <p className="text-[11px] font-semibold tracking-widest uppercase text-[#10b981] mb-4">Duration & expiry</p>
            <p className="text-sm text-[#9dc4b8] leading-relaxed mb-4">
              Each access token carries a fixed validity period set at the point of purchase —
              Gold for the longest term, Silver for mid-range, Bronze for shorter access.
              As expiry approaches, Speak Ez will notify you with enough time to renew.
            </p>
            <p className="text-sm text-[#9dc4b8] leading-relaxed">
              Should a licence be allowed to lapse, there is no graceful wind-down.
              The virtual identity is destroyed. All associated data atomises completely —
              messages, files, contacts — gone without trace.
              The application returns silently to the paywall.
              This is not an error; it is the guarantee.
            </p>
          </div>

          {/* Rescue & recovery */}
          <div
            className="rounded-2xl p-7"
            style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(16,185,129,0.18)" }}
          >
            <p className="text-[11px] font-semibold tracking-widest uppercase text-[#10b981] mb-4">Rescue & device recovery</p>
            <p className="text-sm text-[#9dc4b8] leading-relaxed mb-4">
              Lost a device? Changed phone? No problem. Your identity within Speak Ez is anchored
              to your 12-word recovery phrase — not a username, email address, or cloud account.
              Present your phrase at the paywall on any device and your access restores instantly,
              with no additional charge.
            </p>
            <p className="text-sm text-[#9dc4b8] leading-relaxed">
              Alternatively, your original access image can be uploaded from a secure backup to
              restore your session — offering a second, independent recovery path.
            </p>
          </div>

          {/* Integrity lockdown */}
          <div
            className="rounded-2xl p-7"
            style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(255,80,80,0.15)" }}
          >
            <p className="text-[11px] font-semibold tracking-widest uppercase text-[#f87171] mb-4">Device integrity & data atomisation</p>
            <p className="text-sm text-[#9dc4b8] leading-relaxed mb-4">
              Speak Ez continuously monitors the integrity of the device and session environment.
              Should a compromise be detected — or should a safeword wipe be triggered — the
              platform responds immediately and irreversibly.
            </p>
            <div
              className="rounded-xl px-5 py-4 mb-4"
              style={{ background: "rgba(255,80,80,0.07)", border: "1px solid rgba(255,80,80,0.18)" }}
            >
              <p className="text-sm text-[#fca5a5] leading-relaxed">
                All local data is atomised. The session is cryptographically invalidated.
                The application returns to the paywall — silently, completely, and without leaving a recoverable trace.
                This is by design, not by accident.
              </p>
            </div>
            <p className="text-sm text-[#9dc4b8] leading-relaxed">
              This behaviour is a core value of the platform — the guarantee that no matter what happens to the device,
              your communications remain yours alone.
              Recovery via your 12-word phrase on a clean device restores full access.
            </p>
          </div>

        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/speakez"
            className="inline-flex items-center border border-[rgba(16,185,129,0.4)] hover:border-[#10b981] text-[#9dc4b8] hover:text-[#e8f4f0] px-5 py-3 rounded-full text-sm transition-colors"
          >
            Back to Speak Ez
          </Link>
          <Link
            href="/speakez/use-cases"
            className="inline-flex items-center border border-[rgba(16,185,129,0.4)] hover:border-[#10b981] text-[#9dc4b8] hover:text-[#e8f4f0] px-5 py-3 rounded-full text-sm transition-colors"
          >
            Use cases & comparison
          </Link>
          <Link
            href="/speakez/white-paper"
            className="inline-flex items-center bg-[rgba(16,185,129,0.14)] border border-[rgba(16,185,129,0.35)] text-[#b6f5d9] hover:bg-[rgba(16,185,129,0.22)] px-5 py-3 rounded-full text-sm transition-colors"
          >
            White paper
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center bg-[#10b981] hover:bg-[#0ea572] text-[#031a12] px-5 py-3 rounded-full text-sm font-medium transition-colors"
          >
            Talk to us
          </Link>
        </div>

      </main>
      <Footer />
    </>
  )
}
