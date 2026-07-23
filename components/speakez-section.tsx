import Link from "next/link"
import {
  ArrowUpRight,
  BookOpen,
  FileText,
  Globe,
  Lightbulb,
  MessageSquare,
  Newspaper,
  Play,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
} from "lucide-react"
import { hasNewPrivacyWatchItem } from "@/lib/privacy-watch"

const features = [
  {
    icon: MessageSquare,
    title: "Messaging, voice & media",
    desc: "Instant text messaging, voice messages, photo sharing, file transfers and video messages in one encrypted space.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by default",
    desc: "End-to-end encrypted by design. Your conversations, files and data remain yours, not another platform's raw material.",
  },
  {
    icon: Smartphone,
    title: "Every device, every platform",
    desc: "Native Android and iOS apps, browser access, and hardened device builds without a complicated onboarding process.",
  },
  {
    icon: Globe,
    title: "No borders",
    desc: "Built for distributed teams that need secure communication across offices, countries and time zones.",
  },
  {
    icon: Zap,
    title: "Ready in minutes",
    desc: "No technical configuration required. Receive access, open the platform, and start communicating securely straight away.",
  },
  {
    icon: Users,
    title: "Team and organisation ready",
    desc: "Channels, groups, direct messaging and administrative controls structured around how real organisations operate.",
  },
]

const setupSteps = [
  {
    step: "01",
    title: "Purchase access",
    desc: "Choose your access tier and buy what you need. No hidden setup fee, no endless onboarding project.",
  },
  {
    step: "02",
    title: "Open Speak Ez",
    desc: "Use the browser or app. No IT department, no systems integrator, no complex technical checklist.",
  },
  {
    step: "03",
    title: "Communicate securely",
    desc: "You are live immediately with encrypted messaging, voice and media from the first session.",
  },
]

const promoVideos = [
  {
    label: "How Speak Ez works",
    href: "https://www.tiktok.com/@speakez2026/video/7625642428573289750?is_from_webapp=1&sender_device=pc&web_id=7625243017884976662",
    summary: "A direct walkthrough of the platform and how access works.",
    tag: "How it works",
    accent: "rgba(16,185,129,0.32)",
    glow: "rgba(16,185,129,0.2)",
  },
  {
    label: "Why mainstream apps fall short",
    href: "https://www.tiktok.com/@speakez2026/video/7625303492957048086?is_from_webapp=1&sender_device=pc&web_id=7625243017884976662",
    summary: "A short explainer on why mainstream platforms do not meet higher privacy requirements.",
    tag: "Privacy gap",
    accent: "rgba(245,158,11,0.32)",
    glow: "rgba(245,158,11,0.2)",
  },
  {
    label: "Speak Ez promo 2",
    href: "https://www.tiktok.com/@speakez2026/video/7623533434551471382",
    summary: "Additional product context and secure communication positioning.",
    tag: "Overview",
    accent: "rgba(14,165,233,0.32)",
    glow: "rgba(14,165,233,0.2)",
  },
  {
    label: "Speak Ez promo 4",
    href: "https://www.tiktok.com/@speakez2026/video/7624298140258094358",
    summary: "Further background on the platform and the problem it is designed to solve.",
    tag: "Launch",
    accent: "rgba(124,58,237,0.32)",
    glow: "rgba(124,58,237,0.2)",
  },
]

const deepDiveLinks = [
  {
    icon: BookOpen,
    label: "How it works",
    sub: "Access tiers, expiry, recovery and the integrity guarantee",
    href: "/speakez/how-it-works",
    color: "rgba(16,185,129,0.18)",
    border: "rgba(16,185,129,0.3)",
  },
  {
    icon: Lightbulb,
    label: "Use cases and privacy gaps",
    sub: "What mainstream apps do not provide and why that matters",
    href: "/speakez/use-cases",
    color: "rgba(14,165,233,0.14)",
    border: "rgba(14,165,233,0.28)",
  },
  {
    icon: FileText,
    label: "White paper",
    sub: "Privacy economics, threat models and the case for paid secure messaging",
    href: "/speakez/white-paper",
    color: "rgba(124,58,237,0.14)",
    border: "rgba(124,58,237,0.28)",
  },
  {
    icon: Newspaper,
    label: "Privacy Watch",
    sub: "Current privacy breaches, legal cases and live tracking of platform misuse",
    href: "/privacy-watch",
    color: "rgba(245,158,11,0.14)",
    border: "rgba(245,158,11,0.28)",
  },
]

export function SpeakEzSection() {
  return (
    <section id="speakez" className="relative z-[1] py-16 md:py-24 px-6 md:px-12 max-w-[1100px] mx-auto">
      <div
        className="reveal mb-10 rounded-2xl px-6 py-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
        style={{
          background: "linear-gradient(120deg, rgba(16,185,129,0.22) 0%, rgba(14,165,233,0.18) 100%)",
          border: "1px solid rgba(16,185,129,0.45)",
          boxShadow: "0 8px 36px rgba(16,185,129,0.2)",
        }}
      >
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase text-[#6ee7b7] mb-1">Announcement</p>
          <p className="text-base md:text-lg text-[#e8f4f0] font-light leading-snug max-w-2xl">
            <strong className="font-semibold">SpeakEz is now live.</strong> Get the app on Apple App Store and Google Play Store. Secure communication without technical friction,
            and a clear answer to one question: how much is YOUR privacy worth?
          </p>
        </div>
        <div className="flex flex-nowrap gap-3 items-center">
          <a
            href="https://play.google.com/store/apps/details?id=com.spkezz.app&pli=1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get SpeakEz on Google Play"
            className="inline-flex items-center gap-3 bg-[#10b981] hover:bg-[#059669] text-[#031a12] font-semibold text-sm px-5 py-3.5 rounded-full transition-colors whitespace-nowrap shrink-0"
          >
            <span className="w-6 h-6 rounded-md bg-[rgba(255,255,255,0.9)] flex items-center justify-center shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" aria-hidden="true">
              <img
                src="https://cdn.simpleicons.org/googleplay"
                alt="Google Play"
                className="w-4.5 h-4.5"
                loading="lazy"
                decoding="async"
              />
            </span>
            <span>Get it on Google Play</span>
          </a>
          <a
            href="https://apps.apple.com/gb/app/spkez/id6763252365"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download SpeakEz on the App Store"
            className="inline-flex items-center gap-3 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold text-sm px-5 py-3.5 rounded-full transition-colors whitespace-nowrap shrink-0"
          >
            <span className="w-6 h-6 rounded-md bg-[rgba(255,255,255,0.18)] flex items-center justify-center" aria-hidden="true">
              <img
                src="https://cdn.simpleicons.org/appstore/ffffff"
                alt="Apple App Store"
                className="w-4.5 h-4.5"
                loading="lazy"
                decoding="async"
              />
            </span>
            <span>Download on the App Store</span>
          </a>
        
          
        </div>
      </div>

      <div className="reveal mb-10">
        <div>
          <div className="inline-flex items-center gap-2 mb-4 bg-[rgba(16,185,129,0.12)] border border-[rgba(16,185,129,0.28)] rounded-full px-3.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-[#10b981]">
              A Joint Development with{" "}
              <a href="https://github.com/ChardPeterz/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#6ee7b7]">
                St Lucian Solutions
              </a>
              {" "}•{" "}
              <a href="https://www.linkedin.com/in/chard-p-7191a3245/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#6ee7b7]">
                LinkedIn
              </a>
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#e8f4f0] mb-3.5 text-balance">
            Speak Ez - secure communication, <span className="italic text-[#10b981]">simple enough for anyone</span>
          </h2>
          <p className="text-base text-[#9dc4b8] leading-relaxed max-w-2xl mb-5">
            Speak Ez is a privacy-first communication platform developed by PCI. No IT team required. No complex deployment ritual.
            Open it, use it, and communicate securely from the first minute.
          </p>
          <div className="rounded-2xl p-6" style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(16,185,129,0.18)" }}>
            <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] mb-2">The core argument</p>
            <p className="font-serif text-2xl md:text-3xl font-light text-[#e8f4f0] leading-tight mb-3">
              How much is <span className="text-[#10b981] italic">YOUR privacy</span> worth?
            </p>
            <p className="text-base text-[#b6f5d9] leading-relaxed">
              Big tech thinks it is so important that it should be free. Speak Ez takes the opposite position: the customer should be the customer,
              not the product, not the data source, and not the behavioral inventory.
            </p>
          </div>
        </div>
      </div>

      <div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden mb-14"
        style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.2)", boxShadow: "0 4px 32px rgba(16,185,129,0.1)" }}
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
              <h3 className="text-sm font-medium text-[#e8f4f0] mb-2">{feature.title}</h3>
              <p className="text-sm text-[#7aa898] leading-relaxed">{feature.desc}</p>
            </div>
          )
        })}
      </div>

      <div className="reveal mb-14">
        <div className="grid md:grid-cols-[180px_1fr] gap-8 md:gap-12 mb-8">
          <div className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] pt-2">Getting started</div>
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-light tracking-tight text-[#e8f4f0] mb-2">Up and running in minutes, not weeks</h3>
            <p className="text-base text-[#9dc4b8] leading-relaxed max-w-2xl">
              Speak Ez is deliberately frictionless. No installation wizard, no consultancy phase, no technical handholding.
              If you can open a website, you can use it.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {setupSteps.map((step) => (
            <div key={step.step} className="reveal rounded-2xl p-6 relative overflow-hidden" style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <span className="absolute top-4 right-5 font-serif text-5xl font-light text-[rgba(16,185,129,0.12)] leading-none select-none">{step.step}</span>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#10b981] mb-2">Step {step.step}</p>
              <h4 className="text-base font-medium text-[#e8f4f0] mb-2">{step.title}</h4>
              <p className="text-sm text-[#9dc4b8] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="reveal mb-14">
        <div className="grid md:grid-cols-[180px_1fr] gap-8 md:gap-12 mb-7">
          <div className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] pt-2">Video walkthroughs</div>
          <div />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {promoVideos.map((video, index) => (
            <a
              key={video.href}
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl p-6 transition-all hover:-translate-y-1"
              style={{ background: "linear-gradient(145deg, rgba(16,185,129,0.16) 0%, rgba(14,165,233,0.14) 100%)", border: "1px solid rgba(16,185,129,0.25)" }}
            >
              <div
                className="aspect-[16/10] rounded-xl mb-4 p-4 flex flex-col justify-between relative overflow-hidden"
                style={{
                  background: `radial-gradient(circle at top left, ${video.glow} 0%, rgba(10,20,18,0.22) 35%, rgba(7,12,11,0.96) 100%)`,
                  border: `1px solid ${video.accent}`,
                  boxShadow: `inset 0 0 0 1px ${video.glow}`,
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] tracking-widest uppercase text-[#6ee7b7]">{video.tag}</span>
                  <span className="text-[10px] tracking-widest uppercase text-[#7aa898]">Video {index + 1}</span>
                </div>
                <div className="flex items-center justify-center">
                  <span
                    className="w-18 h-18 rounded-full flex items-center justify-center border transition-transform group-hover:scale-110"
                    style={{ background: "rgba(5,10,9,0.55)", borderColor: video.accent, boxShadow: `0 0 24px ${video.glow}` }}
                  >
                    <Play className="w-8 h-8 text-[#e8f4f0] ml-1" fill="currentColor" />
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <span className="text-xs text-[#9dc4b8] max-w-[14rem]">Selected Speak Ez TikTok video</span>
                  <ArrowUpRight className="w-4 h-4 text-[#b6f5d9] group-hover:text-white transition-colors flex-shrink-0" />
                </div>
              </div>
              <h4 className="text-lg text-[#e8f4f0] font-light mb-2">{video.label}</h4>
              <p className="text-sm text-[#9dc4b8] leading-relaxed">{video.summary}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="reveal mb-14">
        <div className="grid md:grid-cols-[180px_1fr] gap-8 md:gap-12 mb-7">
          <div className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] pt-2">Learn more</div>
          <h3 className="font-serif text-2xl font-light text-[#e8f4f0]">Go deeper</h3>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {deepDiveLinks.map((item) => {
            const Icon = item.icon

            return (
              <Link key={item.href} href={item.href} className="group rounded-2xl p-6 transition-all hover:-translate-y-1" style={{ background: item.color, border: `1px solid ${item.border}` }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${item.border}` }}>
                  <Icon className="w-4 h-4 text-[#b6f5d9]" strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-base font-medium text-[#e8f4f0] group-hover:text-[#6ee7b7] transition-colors">{item.label}</h4>
                  {item.href === "/privacy-watch" && hasNewPrivacyWatchItem ? <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" /> : null}
                </div>
                <p className="text-sm text-[#7aa898] leading-relaxed">{item.sub}</p>
              </Link>
            )
          })}
        </div>
      </div>

      <div
        className="reveal rounded-2xl p-8 md:p-10 mb-8"
        style={{
          background: "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(16,185,129,0.12) 100%)",
          border: "1px solid rgba(245,158,11,0.28)",
          boxShadow: "0 8px 32px rgba(245,158,11,0.12)",
        }}
      >
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-start">
          <div>
            <p className="text-[11px] font-medium tracking-widest uppercase text-[#f8e7bf] mb-2">Anonymous contact</p>
            <h3 className="font-serif text-2xl md:text-3xl font-light tracking-tight text-[#e8f4f0] mb-3 text-balance">
              Use Speak Ez to message us anonymously about your use case or bespoke requirement
            </h3>
            <p className="text-base text-[#9dc4b8] leading-relaxed max-w-3xl mb-4">
              We are community focused and we take privacy requirements and enhancement requests seriously. If you need to discuss a specific risk profile,
              operational concern, or bespoke requirement, use Speak Ez to contact us privately.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <div className="rounded-xl p-4" style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(245,158,11,0.22)" }}>
                <p className="text-xs uppercase tracking-widest text-[#f8e7bf] mb-2">One-way anonymous contact</p>
                <p className="text-sm text-[#9dc4b8] leading-relaxed">
                  Use the Speak Ez site to send us your requirements, concerns, or enhancement requests privately.
                </p>
              </div>
              <div className="rounded-xl p-4" style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(245,158,11,0.22)" }}>
                <p className="text-xs uppercase tracking-widest text-[#f8e7bf] mb-2">If you want a reply</p>
                <p className="text-sm text-[#9dc4b8] leading-relaxed">
                  Provide a standard anonymous Speak Ez invitation to enquiries@pci-ltd.co.uk, or another anonymous contact route, or a chosen go-between.
                </p>
              </div>
            </div>
            <p className="text-base text-[#b6f5d9] leading-relaxed font-light">
              Privacy is a right. Speak up - tell us how YOU want it.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:min-w-[250px]">
            <a
              href="https://speakez.duckdns.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#031a12] font-semibold text-sm px-6 py-3.5 rounded-full transition-colors"
            >
              Message us on Speak Ez
            </a>
            <a
              href="mailto:enquiries@pci-ltd.co.uk"
              className="inline-flex items-center justify-center gap-2 border border-[rgba(245,158,11,0.35)] text-[#f8e7bf] hover:text-white px-6 py-3.5 rounded-full text-sm transition-colors"
            >
              enquiries@pci-ltd.co.uk
            </a>
          </div>
        </div>
      </div>

      <div className="reveal rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(14,165,233,0.08) 100%)", border: "1px solid rgba(16,185,129,0.25)", boxShadow: "0 4px 32px rgba(16,185,129,0.08)" }}>
        <div>
          <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] mb-2">Interested in Speak Ez?</p>
          <p className="text-base text-[#e8f4f0] font-light max-w-lg">
            No technical setup. No IT team required. Try the platform now or get in touch and we will walk you through it directly.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <a href="/contact" className="inline-flex items-center gap-2 border border-[rgba(16,185,129,0.4)] hover:border-[#10b981] text-[#9dc4b8] hover:text-[#e8f4f0] font-medium text-sm px-6 py-3 rounded-full transition-colors duration-200">
            Get in touch
          </a>
        </div>
      </div>

      <div className="reveal rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6" style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.12) 0%, rgba(124,58,237,0.10) 100%)", border: "1px solid rgba(14,165,233,0.3)", boxShadow: "0 4px 32px rgba(14,165,233,0.08)" }}>
        <div>
          <div className="inline-flex items-center gap-2 mb-3 bg-[rgba(14,165,233,0.12)] border border-[rgba(14,165,233,0.3)] rounded-full px-3.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] animate-pulse" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-[#0ea5e9]">OYO - Own Your Own</span>
          </div>
          <h3 className="font-serif text-2xl font-light tracking-tight text-[#e8f4f0] mb-2">Want your own dedicated platform?</h3>
          <p className="text-base text-[#9dc4b8] font-light max-w-xl">
            Deploy Speak Ez on your own dedicated cloud infrastructure or entirely on-premise. Full control. Your hardware.
            Your rules. No shared environment and no external dependency on a consumer platform.
          </p>
        </div>
        <a href="/contact" className="flex-shrink-0 inline-flex items-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-medium text-sm px-7 py-3.5 rounded-full transition-colors duration-200 whitespace-nowrap" style={{ boxShadow: "0 4px 20px rgba(14,165,233,0.35)" }}>
          Contact us now
        </a>
      </div>
    </section>
  )
}
