import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

const sections = [
  {
    heading: "1. Why a white paper",
    body: "Most messaging decisions are framed around features, not threat models. This paper reframes selection around risk, operational control, and trust boundaries.",
  },
  {
    heading: "2. The economics of free messaging",
    body: "If the service is free, another monetization layer funds it. In many ecosystems that layer is behavioral intelligence, metadata value, ad economics, or platform lock-in.",
  },
  {
    heading: "3. Why paid privacy is rational",
    body: "Secure systems are expensive to engineer and maintain. Paid access creates alignment: revenue comes from service quality and confidentiality outcomes, not data extraction.",
  },
  {
    heading: "4. Operational requirements in high-risk environments",
    body: "High-risk communication needs deterministic recovery, strict revocation, endpoint integrity response, and clear policy-driven lifecycle behavior.",
  },
  {
    heading: "5. Deployment flexibility",
    body: "Speak Ez supports cloud, dedicated, and on-premise deployment pathways so governance and jurisdiction can match organizational requirements.",
  },
  {
    heading: "6. Public platforms versus controlled platforms",
    body: "Public platforms optimize for global convenience at scale. Controlled platforms optimize for bounded trust domains, explicit ownership, and operational discipline.",
  },
]

export default function WhitePaperPage() {
  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <main className="relative z-[1] py-16 md:py-24 px-6 md:px-12 max-w-[1000px] mx-auto">
        <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] mb-3">Speak Ez white paper</p>
        <h1 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#e8f4f0] mb-4">
          Privacy, control, and communication resilience
        </h1>
        <p className="text-base text-[#9dc4b8] leading-relaxed max-w-3xl mb-10">
          This high-level white paper introduces the commercial and technical logic behind privacy-first messaging.
          It is intended for leadership, risk teams, compliance stakeholders, and operational owners.
        </p>

        <div className="space-y-5 mb-10">
          {sections.map((s) => (
            <section
              key={s.heading}
              className="rounded-2xl p-6"
              style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(16,185,129,0.18)" }}
            >
              <h2 className="text-lg text-[#e8f4f0] font-light mb-2">{s.heading}</h2>
              <p className="text-sm text-[#9dc4b8] leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        <section
          className="rounded-2xl p-6 mb-10"
          style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)" }}
        >
          <h2 className="text-lg text-[#e8f4f0] font-light mb-2">Key takeaway</h2>
          <p className="text-sm text-[#b6f5d9] leading-relaxed">
            Free communications products are rarely free in economic terms. The cost is often paid through data gravity,
            long-term exposure, and reduced operational sovereignty.
          </p>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link href="/speakez/is-it-for-us" className="inline-flex items-center border border-[rgba(16,185,129,0.4)] text-[#9dc4b8] hover:text-[#e8f4f0] px-5 py-3 rounded-full text-sm">
            Is Speak Ez for us?
          </Link>
          <Link href="/speakez/use-cases" className="inline-flex items-center border border-[rgba(16,185,129,0.4)] text-[#9dc4b8] hover:text-[#e8f4f0] px-5 py-3 rounded-full text-sm">
            Use cases
          </Link>
          <Link href="/contact" className="inline-flex items-center bg-[#10b981] text-[#031a12] px-5 py-3 rounded-full text-sm font-medium">
            Request full briefing
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
