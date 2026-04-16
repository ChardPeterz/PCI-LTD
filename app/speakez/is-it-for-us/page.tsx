import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

const checks = [
  "A breach, leak, or metadata exposure could create legal, safety, or strategic risk.",
  "Your organization needs clear ownership of communications and stronger lifecycle control.",
  "You operate in environments where devices may be seized, lost, or tampered with.",
  "You need revocation and recovery behavior that is operationally predictable.",
  "Your team cannot rely on consumer social platforms for sensitive communications.",
]

export default function IsItForUsPage() {
  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <main className="relative z-[1] py-16 md:py-24 px-6 md:px-12 max-w-[1000px] mx-auto">
        <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] mb-3">Speak Ez fit guide</p>
        <h1 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#e8f4f0] mb-4">
          Is Speak Ez for me or us?
        </h1>
        <p className="text-base text-[#9dc4b8] leading-relaxed max-w-3xl mb-10">
          Speak Ez is for teams and individuals who treat messaging as critical infrastructure, not a disposable utility.
          If communication failure creates meaningful consequence, a privacy-led platform is usually a better fit than
          a free mass-market app.
        </p>

        <section
          className="rounded-2xl p-7 mb-8"
          style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(16,185,129,0.2)" }}
        >
          <h2 className="text-xl text-[#e8f4f0] font-light mb-4">Decision checklist</h2>
          <ul className="space-y-3">
            {checks.map((check) => (
              <li key={check} className="text-sm text-[#9dc4b8] leading-relaxed flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] mt-2 flex-shrink-0" />
                <span>{check}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="rounded-2xl p-7 mb-10"
          style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(16,185,129,0.2)" }}
        >
          <h2 className="text-xl text-[#e8f4f0] font-light mb-4">Why this is paid</h2>
          <p className="text-sm text-[#9dc4b8] leading-relaxed mb-3">
            Secure messaging is expensive to build and keep secure over time. Engineering, infrastructure, audits,
            incident response, and continuous hardening all carry non-trivial cost.
          </p>
          <p className="text-sm text-[#b6f5d9] leading-relaxed">
            Free platforms are usually funded by attention and data economics. Speak Ez is funded by service value and
            customer trust.
          </p>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link href="/speakez/use-cases" className="inline-flex items-center border border-[rgba(16,185,129,0.4)] text-[#9dc4b8] hover:text-[#e8f4f0] px-5 py-3 rounded-full text-sm">
            Detailed use cases
          </Link>
          <Link href="/speakez/white-paper" className="inline-flex items-center bg-[rgba(16,185,129,0.14)] border border-[rgba(16,185,129,0.35)] text-[#b6f5d9] px-5 py-3 rounded-full text-sm">
            White paper
          </Link>
          <Link href="/contact" className="inline-flex items-center bg-[#10b981] text-[#031a12] px-5 py-3 rounded-full text-sm font-medium">
            Talk to PCI
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
