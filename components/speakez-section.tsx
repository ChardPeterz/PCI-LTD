import Script from "next/script"
import { MessageSquare, Smartphone, Globe, ShieldCheck, Zap, Users, Clock, RefreshCw, AlertTriangle, KeyRound } from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "Messaging, voice &amp; media",
    desc: "Instant text messaging, voice messages, photo sharing, file transfers and video messages — all in one encrypted space, on every device.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy first",
    desc: "End-to-end encrypted by design. Your conversations, files and data remain yours — never stored, never shared, never exposed.",
  },
  {
    icon: Smartphone,
    title: "Every device, every platform",
    desc: "Native Android and iOS apps via sideload, full web-only access for browser-based use, and hardened device builds engineered for high-security environments — coming soon.",
  },
  {
    icon: Globe,
    title: "No borders",
    desc: "Built for distributed teams. Whether your people are across the office or across the world, Speak Ez keeps everyone connected.",
  },
  {
    icon: Zap,
    title: "Built for speed",
    desc: "Lightweight and responsive. Speak Ez is engineered to feel instant — even on lower-bandwidth connections or older devices.",
  },
  {
    icon: Users,
    title: "Team & organisation ready",
    desc: "Channels, groups, direct messaging and administrative controls — structured the way real organisations actually work.",
  },
]

export function SpeakEzSection() {
  return (
    <section id="speakez" className="relative z-[1] py-16 md:py-24 px-6 md:px-12 max-w-[1100px] mx-auto">
      {/* Header */}
      <div className="reveal grid md:grid-cols-[180px_1fr] gap-8 md:gap-12 mb-14">
        <div className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] pt-2">
          Products
        </div>
        <div>
          <div className="inline-flex items-center gap-2 mb-4 bg-[rgba(16,185,129,0.12)] border border-[rgba(16,185,129,0.28)] rounded-full px-3.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-[#10b981]">
              Developed by PCI
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#e8f4f0] mb-3.5 text-balance">
            Speak Ez — secure communication,{" "}
            <span className="italic text-[#10b981]">built differently</span>
          </h2>
          <p className="text-base text-[#9dc4b8] leading-relaxed max-w-2xl">
            Speak Ez is a privacy-first communication platform developed in-house
            by PCI. Designed for businesses and individuals who demand security
            without sacrificing ease of use — available on web, Android and iOS.
          </p>
        </div>
      </div>

      {/* Feature grid */}
      <div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden mb-12"
        style={{
          background: "rgba(16,185,129,0.15)",
          border: "1px solid rgba(16,185,129,0.2)",
          boxShadow: "0 4px 32px rgba(16,185,129,0.1)",
        }}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.title}
              className={`reveal reveal-delay-${(index % 6) + 1} p-7 bg-[rgba(10,20,18,0.92)] hover:bg-[rgba(16,185,129,0.08)] transition-all duration-300 relative overflow-hidden group`}
              style={{ backdropFilter: "blur(6px)" }}
            >
              <span className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 bg-gradient-to-r from-[#10b981] to-[#0ea5e9]" />
              <div className="w-9 h-9 rounded-lg bg-[rgba(16,185,129,0.12)] border border-[rgba(16,185,129,0.22)] flex items-center justify-center mb-5">
                <Icon className="w-4 h-4 text-[#10b981]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-medium text-[#e8f4f0] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#7aa898] leading-relaxed">
                {feature.desc}
              </p>
            </div>
          )
        })}
      </div>

      {/* TikTok promo embeds */}
      <div className="reveal flex flex-col md:flex-row justify-center gap-6 mb-12">
        <blockquote
          className="tiktok-embed"
          cite="https://www.tiktok.com/@speakez2026/video/7625642428573289750"
          data-video-id="7625642428573289750"
          style={{ maxWidth: "605px", minWidth: "325px", width: "100%" }}
        >
          <section>
            <a
              target="_blank"
              rel="noopener noreferrer"
              title="@speakez2026"
              href="https://www.tiktok.com/@speakez2026?refer=embed"
            >
              @speakez2026
            </a>
          </section>
        </blockquote>
        <blockquote
          className="tiktok-embed"
          cite="https://www.tiktok.com/@speakez2026/video/7623533434551471382"
          data-video-id="7623533434551471382"
          style={{ maxWidth: "605px", minWidth: "325px", width: "100%" }}
        >
          <section>
            <a
              target="_blank"
              rel="noopener noreferrer"
              title="@speakez2026"
              href="https://www.tiktok.com/@speakez2026?refer=embed"
            >
              @speakez2026
            </a>
          </section>
        </blockquote>
        <blockquote
          className="tiktok-embed"
          cite="https://www.tiktok.com/@speakez2026/video/7625303492957048086"
          data-video-id="7625303492957048086"
          style={{ maxWidth: "605px", minWidth: "325px", width: "100%" }}
        >
          <section>
            <a
              target="_blank"
              rel="noopener noreferrer"
              title="@speakez2026"
              href="https://www.tiktok.com/@speakez2026?refer=embed"
            >
              @speakez2026
            </a>
          </section>
        </blockquote>
        <blockquote
          className="tiktok-embed"
          cite="https://www.tiktok.com/@speakez2026/video/7624298140258094358"
          data-video-id="7624298140258094358"
          style={{ maxWidth: "605px", minWidth: "325px", width: "100%" }}
        >
          <section>
            <a
              target="_blank"
              rel="noopener noreferrer"
              title="@speakez2026"
              href="https://www.tiktok.com/@speakez2026?refer=embed"
            >
              @speakez2026
            </a>
          </section>
        </blockquote>
        <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
      </div>

      {/* Pricing & Security model */}
      <div className="reveal mb-12">
        <div className="grid md:grid-cols-[180px_1fr] gap-8 md:gap-12 mb-10">
          <div className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] pt-2">
            How it works
          </div>
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-light tracking-tight text-[#e8f4f0] mb-3">
              Access tiers, duration &amp; the integrity guarantee
            </h3>
            <p className="text-base text-[#9dc4b8] leading-relaxed max-w-2xl">
              Speak Ez operates on a tiered access model with fixed-duration licences —
              chosen up front so you always know exactly what you have and when it ends.
              Security isn&apos;t an add-on here; it&apos;s the architecture.
            </p>
          </div>
        </div>

        {/* Tier + lifecycle cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* Pricing tiers */}
          <div
            className="rounded-2xl p-7"
            style={{
              background: "rgba(10,20,18,0.92)",
              border: "1px solid rgba(16,185,129,0.18)",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[rgba(16,185,129,0.12)] border border-[rgba(16,185,129,0.22)] flex items-center justify-center flex-shrink-0">
                <KeyRound className="w-4 h-4 text-[#10b981]" strokeWidth={1.5} />
              </div>
              <h4 className="text-sm font-medium text-[#e8f4f0]">Access tiers</h4>
            </div>
            <p className="text-sm text-[#7aa898] leading-relaxed mb-5">
              Access to Speak Ez works in two layers. First, you purchase <span className="text-[#10b981] font-medium">app access</span> — this gets
              you onto the platform. Then you add <span className="text-[#10b981] font-medium">Ejector Seats</span> — individual
              identities that are spent when activated. Once used, a seat is consumed and that
              encrypted identity exists. No subscriptions, no repeated charges per user — you buy
              seats, you spend them.
            </p>
            <div className="space-y-3">
              {[
                { tier: "App Access", desc: "Your gateway to the platform. Choose Gold, Silver or Bronze tier — each carries a fixed validity duration suited to your needs." },
                { tier: "Ejector Seats", desc: "Single-use encrypted identity tokens purchased separately. Each seat, once activated, creates one independent encrypted identity. Spend a seat — get an identity. Simple." },
              ].map(({ tier, desc }) => (
                <div key={tier} className="flex gap-3">
                  <span className="flex-shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-[#10b981] opacity-70 mt-2" />
                  <div>
                    <span className="text-xs font-medium text-[#10b981] uppercase tracking-wider">{tier} — </span>
                    <span className="text-sm text-[#7aa898]">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Duration & expiry */}
          <div
            className="rounded-2xl p-7"
            style={{
              background: "rgba(10,20,18,0.92)",
              border: "1px solid rgba(16,185,129,0.18)",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[rgba(16,185,129,0.12)] border border-[rgba(16,185,129,0.22)] flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-[#10b981]" strokeWidth={1.5} />
              </div>
              <h4 className="text-sm font-medium text-[#e8f4f0]">Duration &amp; expiry</h4>
            </div>
            <p className="text-sm text-[#7aa898] leading-relaxed mb-4">
              Each access token carries a fixed validity period set at the point of purchase —
              Gold for the longest term, Silver for mid-range, Bronze for shorter access.
              As expiry approaches, Speak Ez will notify you with enough time to renew.
            </p>
            <p className="text-sm text-[#7aa898] leading-relaxed">
              Should a licence be allowed to lapse, there is no graceful wind-down.
              The virtual identity is destroyed. All associated data atomises completely —
              messages, files, contacts — gone without trace. The application returns silently
              to the paywall. This is not an error; it is the guarantee.
            </p>
          </div>

          {/* Rescue & recovery */}
          <div
            className="rounded-2xl p-7"
            style={{
              background: "rgba(10,20,18,0.92)",
              border: "1px solid rgba(16,185,129,0.18)",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[rgba(16,185,129,0.12)] border border-[rgba(16,185,129,0.22)] flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-4 h-4 text-[#10b981]" strokeWidth={1.5} />
              </div>
              <h4 className="text-sm font-medium text-[#e8f4f0]">Rescue &amp; device recovery</h4>
            </div>
            <p className="text-sm text-[#7aa898] leading-relaxed mb-4">
              Lost a device? Changed phone? No problem. Your identity within Speak Ez is anchored
              to your 12-word recovery phrase — not a username, email address, or cloud account.
              Present your phrase at the paywall on any device and your access restores instantly,
              with no additional charge.
            </p>
            <p className="text-sm text-[#7aa898] leading-relaxed">
              Alternatively, your original access image can be uploaded from a secure backup to
              restore your session — offering a second, independent recovery path.
            </p>
          </div>

          {/* Integrity lockdown */}
          <div
            className="rounded-2xl p-7"
            style={{
              background: "rgba(10,20,18,0.92)",
              border: "1px solid rgba(255,80,80,0.15)",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[rgba(255,80,80,0.1)] border border-[rgba(255,80,80,0.2)] flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-[#f87171]" strokeWidth={1.5} />
              </div>
              <h4 className="text-sm font-medium text-[#e8f4f0]">Device integrity &amp; data atomisation</h4>
            </div>
            <p className="text-sm text-[#7aa898] leading-relaxed mb-4">
              Speak Ez continuously monitors the integrity of the device and session environment.
              Should a compromise be detected — or should a safeword wipe be triggered — the
              platform responds immediately and irreversibly.
            </p>
            <div
              className="rounded-xl px-5 py-4 mb-4"
              style={{ background: "rgba(255,80,80,0.07)", border: "1px solid rgba(255,80,80,0.18)" }}
            >
              <p className="text-sm text-[#fca5a5] leading-relaxed font-light">
                All local data is atomised. The session is cryptographically invalidated.
                The application returns to the paywall — silently, completely, and without
                leaving a recoverable trace. This is by design, not by accident.
              </p>
            </div>
            <p className="text-sm text-[#7aa898] leading-relaxed">
              This behaviour is a core value of the platform — the guarantee that no matter
              what happens to the device, your communications remain yours alone.
              Recovery via your 12-word phrase on a clean device restores full access.
            </p>
          </div>

        </div>
      </div>
      <div
        className="reveal rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(14,165,233,0.08) 100%)",
          border: "1px solid rgba(16,185,129,0.25)",
          boxShadow: "0 4px 32px rgba(16,185,129,0.08)",
        }}
      >
        <div>
          <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] mb-2">
            Interested in Speak Ez?
          </p>
          <p className="text-base text-[#e8f4f0] font-light max-w-lg">
            Whether you&apos;re looking for a secure communication tool for your
            team or want to try it for yourself — get started directly or get in
            touch and we&apos;ll walk you through it.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <a
            href="https://speakez.duckdns.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#0ea572] text-[#031a12] font-medium text-sm px-6 py-3 rounded-full transition-colors duration-200"
          >
            Try Speak Ez
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 border border-[rgba(16,185,129,0.4)] hover:border-[#10b981] text-[#9dc4b8] hover:text-[#e8f4f0] font-medium text-sm px-6 py-3 rounded-full transition-colors duration-200"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* OYO callout */}
      <div
        className="reveal mt-8 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{
          background: "linear-gradient(135deg, rgba(14,165,233,0.12) 0%, rgba(124,58,237,0.10) 100%)",
          border: "1px solid rgba(14,165,233,0.3)",
          boxShadow: "0 4px 32px rgba(14,165,233,0.08)",
        }}
      >
        <div>
          <div className="inline-flex items-center gap-2 mb-3 bg-[rgba(14,165,233,0.12)] border border-[rgba(14,165,233,0.3)] rounded-full px-3.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] animate-pulse" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-[#0ea5e9]">
              OYO — Own Your Own
            </span>
          </div>
          <h3 className="font-serif text-2xl font-light tracking-tight text-[#e8f4f0] mb-2">
            Want your own dedicated platform?
          </h3>
          <p className="text-base text-[#9dc4b8] font-light max-w-xl">
            Deploy Speak Ez on your own dedicated cloud infrastructure or entirely on-premise.
            Full control. Your hardware. Your rules. No shared environment, no external dependencies.
            Built and maintained by PCI — contact us now to discuss your requirements.
          </p>
        </div>
        <a
          href="/contact"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-medium text-sm px-7 py-3.5 rounded-full transition-colors duration-200 whitespace-nowrap"
          style={{ boxShadow: "0 4px 20px rgba(14,165,233,0.35)" }}
        >
          Contact us now
        </a>
      </div>
    </section>
  )
}
