import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export const metadata = {
  title: "Online Safety Act & Privacy — PCI Ltd",
  description:
    "How the Online Safety Act affects your right to private communication, and how Speak Ez protects you.",
}

const sections = [
  {
    label: "The regulation",
    heading: "Ofcom, the OSA & the scanning mandate",
    body: "The Online Safety Act gives Ofcom the power to require platforms to scan user content for illegal material. On its face this sounds reasonable. In practice, any system that can be compelled to inspect private communications is structurally a surveillance system. The right to privacy stops meaning unreadable-to-anyone and starts meaning we-promise-to-look-only-when-asked.",
  },
  {
    label: "Our position",
    heading: "Compliant but not complicit",
    body: "Scanning is not carried out by default. It would only be implemented if a lawful demand were made by the relevant authorities. If such a demand is ever made, all Speak Ez users will be notified through the platform — because the law permits non-notification, but we do not.",
  },
  {
    label: "Our response",
    heading: "Pre-emptive, client-side protection",
    body: "To remain compliant whilst protecting your human right to privacy, we are integrating pre-emptive processes that prevent you from initiating a flaggable or reportable message in the first place. These processes run exclusively client-side — on your device, before anything is transmitted. Nothing leaves your device that formal flagging would otherwise catch. That is the architecture, not a policy promise.",
  },
  {
    label: "The hard truth",
    heading: "We all pay for the rotten apples",
    body: "The intent of the law is sound on paper: identify child abuse, terrorism, and organised crime. No reasonable person objects to removing those actors from society. The problem is the mechanism. Blanket scanning means every private conversation is structurally accessible — not just the guilty ones. We all suffer a complete erosion of privacy because of a small number of freaks and fanatics. We do not and will not support an open messaging system that is free for anyone to surveil.",
  },
  {
    label: "The timeline",
    heading: "Where the OSA stands now",
    body: "Currently there is no active implementation of flagging or reporting requirements for platforms like Speak Ez. The OSA remains in consultation — a process that, with the speed those wheels turn, is likely to continue for years. There is no immediate threat to your communications today. We are building ahead of it regardless.",
  },
]

export default function OnlineSafetyPage() {
  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <main className="relative z-[1] max-w-[860px] mx-auto px-6 md:px-12 pt-36 pb-24">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] mb-4">
            Online Safety Act
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#e8f4f0] mb-4 text-balance">
            Privacy is a right, not a slogan
          </h1>
          <p className="text-base text-[#9dc4b8] leading-relaxed max-w-2xl">
            Regulators can now compel platforms to scan your private messages. Here is what that means, what
            the law actually does, where it currently stands, and exactly how Speak Ez responds.
          </p>
        </div>

        {/* Section cards */}
        <div className="space-y-5 mb-12">
          {sections.map((s) => (
            <section
              key={s.label}
              className="rounded-2xl p-7"
              style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(16,185,129,0.18)" }}
            >
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#10b981] mb-2">
                {s.label}
              </p>
              <h2 className="font-serif text-xl font-light text-[#e8f4f0] mb-3">{s.heading}</h2>
              <p className="text-sm text-[#9dc4b8] leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        {/* Callout */}
        <section
          className="rounded-2xl p-7 mb-12"
          style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.28)" }}
        >
          <p className="text-[10px] font-semibold tracking-widest uppercase text-[#6ee7b7] mb-2">
            Want full elimination of the risk?
          </p>
          <p className="text-sm text-[#b6f5d9] leading-relaxed mb-5">
            If you wish to remove these concerns entirely, we have solutions that operate outside the OSA scope.
            These are available on enquiry and are suitable for organisations and individuals with the highest
            operational privacy requirements.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-[#10b981] text-[#031a12] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#0ea572] transition-colors"
          >
            Enquire now
          </Link>
        </section>

        {/* Nav links */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/privacy-watch"
            className="inline-flex items-center border border-[rgba(245,158,11,0.4)] text-[#f8e7bf] hover:text-white px-5 py-3 rounded-full text-sm transition-colors"
          >
            Privacy Watch
          </Link>
          <Link
            href="/speakez"
            className="inline-flex items-center border border-[rgba(16,185,129,0.4)] text-[#9dc4b8] hover:text-[#e8f4f0] px-5 py-3 rounded-full text-sm transition-colors"
          >
            Speak Ez platform
          </Link>
          <Link
            href="/privacy"
            className="inline-flex items-center border border-[rgba(16,185,129,0.4)] text-[#9dc4b8] hover:text-[#e8f4f0] px-5 py-3 rounded-full text-sm transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
