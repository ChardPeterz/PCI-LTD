import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

const useCases = [
  {
    title: "Journalists and investigative teams",
    why: "Source protection depends on compartmentalised communication, resilient identity recovery and a fast response if a device is exposed.",
  },
  {
    title: "Rights activists and civil-society networks",
    why: "Campaign coordination often happens under legal pressure, harassment and targeted surveillance risk.",
  },
  {
    title: "High-risk and high-visibility individuals",
    why: "Personal privacy and family safety can require strict communication boundaries and deliberate recovery controls.",
  },
  {
    title: "Political offices and policy teams",
    why: "Sensitive strategy and stakeholder discussions need clearer control than convenience-first consumer messaging offers.",
  },
  {
    title: "High-net-worth principals and family offices",
    why: "Advisory, legal and operational communication carries financial, reputational and personal-security consequences.",
  },
  {
    title: "Security and protective operations",
    why: "Dynamic operations need predictable revocation, endpoint integrity behaviour and low-friction secure recovery.",
  },
]

const privacyGaps = [
  {
    title: "Organisation-controlled identity issuance",
    apps: ["WhatsApp", "Telegram", "iMessage", "Messenger"],
    missing: [
      "No single-use identity seats issued under your own access policy",
      "No clean separation between platform access and spendable user identities",
      "No simple way to provision disposable, policy-led identities for elevated-risk users",
    ],
    speakEz: "Speak Ez separates app access from Ejector Seats so identity issuance can be deliberate, limited and controlled.",
  },
  {
    title: "Hard expiry and full lifecycle control",
    apps: ["WhatsApp", "Telegram", "iMessage", "Messenger", "Signal"],
    missing: [
      "No licence-style expiry that ends access on a fixed schedule",
      "No platform-level identity destruction when access ends",
      "No policy-led end state that returns the app to a clean paywall state",
    ],
    speakEz: "Speak Ez is built around defined access duration, expiry notifications and a hard stop when the licence ends.",
  },
  {
    title: "Recovery outside the usual identity rails",
    apps: ["WhatsApp", "Telegram", "iMessage", "Messenger"],
    missing: [
      "Recovery usually depends on phone numbers, cloud accounts or central account systems",
      "Little or no alternative recovery route if those rails are compromised",
      "No privacy-first recovery model designed for hostile or coercive scenarios",
    ],
    speakEz: "Speak Ez uses a recovery phrase and access image model rather than forcing you back through mainstream identity dependencies.",
  },
  {
    title: "Compromise response and local atomisation",
    apps: ["WhatsApp", "Telegram", "iMessage", "Messenger", "Signal"],
    missing: [
      "No safeword-triggered wipe model as a standard product feature",
      "No platform promise that local data atomises on integrity failure",
      "No cryptographic session invalidation model designed around hostile-device assumptions",
    ],
    speakEz: "Speak Ez is designed to invalidate the session and atomise local data when compromise conditions are met.",
  },
  {
    title: "Deployment sovereignty",
    apps: ["WhatsApp", "iMessage", "Messenger", "Telegram"],
    missing: [
      "No customer-controlled dedicated deployment option for ordinary users",
      "No on-premise path for organisations that need hardware-level control",
      "No direct alignment between platform policy and your own infrastructure rules",
    ],
    speakEz: "Speak Ez can be delivered in shared, dedicated cloud or fully on-premise form depending on your operational need.",
  },
  {
    title: "Business model aligned with privacy",
    apps: ["Meta platforms", "ad-funded ecosystems", "free mass-market services"],
    missing: [
      "Free service often means a different incentive is funding the platform",
      "Users rarely buy a privacy outcome directly",
      "Convenience and scale tend to outrank sovereign control and specialist risk handling",
    ],
    speakEz: "Speak Ez is sold as a product. The customer pays for the service and is not converted into the service's inventory.",
  },
]

export default function UseCasesPage() {
  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <main className="relative z-[1] py-16 md:py-24 px-6 md:px-12 max-w-[1100px] mx-auto">
        <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] mb-3">Speak Ez use cases and privacy gaps</p>
        <h1 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#e8f4f0] mb-4 text-balance">
          How much is YOUR privacy worth?
        </h1>
        <p className="text-base text-[#9dc4b8] leading-relaxed max-w-3xl mb-5">
          Big tech thinks it is so important that it should be free. Speak Ez takes the opposite view: privacy has a cost,
          and paying directly is cleaner than being absorbed into someone else's business model.
        </p>
        <div className="rounded-2xl p-6 mb-10" style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(16,185,129,0.18)" }}>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[11px] font-medium tracking-widest uppercase text-[#6ee7b7] mb-2">Linked video explainer</p>
              <p className="text-sm text-[#9dc4b8] leading-relaxed max-w-2xl">
                This short video covers why mainstream messaging platforms fall short for users who need stronger privacy guarantees.
              </p>
            </div>
            <a href="https://www.tiktok.com/@speakez2026/video/7625303492957048086?is_from_webapp=1&sender_device=pc&web_id=7625243017884976662" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#0ea572] text-[#031a12] px-5 py-3 rounded-full text-sm font-medium transition-colors">
              Watch the privacy gap video
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {useCases.map((item) => (
            <article key={item.title} className="rounded-2xl p-6" style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(16,185,129,0.18)" }}>
              <h2 className="text-lg text-[#e8f4f0] font-light mb-3">{item.title}</h2>
              <p className="text-sm text-[#9dc4b8] leading-relaxed">{item.why}</p>
            </article>
          ))}
        </div>

        <div className="mb-14">
          <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] mb-3">Privacy gap matrix</p>
          <h2 className="font-serif text-2xl md:text-3xl font-light tracking-tight text-[#e8f4f0] mb-3">What mainstream apps do not provide</h2>
          <p className="text-base text-[#9dc4b8] leading-relaxed max-w-3xl mb-8">
            The point is not that every consumer app is useless. The point is that even the best-known platforms generally do not offer the full set of controls below,
            which is where higher-risk users get exposed.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {privacyGaps.map((gap) => (
              <section key={gap.title} className="rounded-2xl p-6" style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(16,185,129,0.18)" }}>
                <h3 className="text-lg text-[#e8f4f0] font-light mb-3">{gap.title}</h3>
                <p className="text-xs uppercase tracking-widest text-[#6ee7b7] mb-3">Examples: {gap.apps.join(", ")}</p>
                <ul className="space-y-2 mb-4 text-sm text-[#9dc4b8] list-none">
                  {gap.missing.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[#10b981] mt-1">-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-[#b6f5d9] leading-relaxed">What Speak Ez adds: {gap.speakEz}</p>
              </section>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-2xl p-6" style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(16,185,129,0.18)" }}>
            <h3 className="text-base text-[#e8f4f0] font-medium mb-3">Is it for me or us?</h3>
            <ul className="space-y-3 text-sm text-[#9dc4b8] list-none">
              <li className="flex gap-2"><span className="text-[#10b981] mt-1">-</span><span>Choose Speak Ez when a breach or metadata leak could cause real harm, not just inconvenience.</span></li>
              <li className="flex gap-2"><span className="text-[#10b981] mt-1">-</span><span>Choose Speak Ez when your team needs deliberate lifecycle control rather than casual consumer messaging defaults.</span></li>
              <li className="flex gap-2"><span className="text-[#10b981] mt-1">-</span><span>Choose Speak Ez when privacy resilience matters more than being inside the biggest platform ecosystem.</span></li>
            </ul>
          </div>
          <div className="rounded-2xl p-6" style={{ background: "rgba(10,20,18,0.92)", border: "1px solid rgba(16,185,129,0.18)" }}>
            <h3 className="text-base text-[#e8f4f0] font-medium mb-3">Why is it not free?</h3>
            <p className="text-sm text-[#9dc4b8] leading-relaxed mb-3">
              Secure communication systems cost real money to engineer, test, host and continuously harden. Free mass-market platforms optimise for scale and convenience first.
            </p>
            <p className="text-sm text-[#b6f5d9] leading-relaxed">Speak Ez is funded by product value. The customer is the customer.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/speakez" className="inline-flex items-center border border-[rgba(16,185,129,0.4)] hover:border-[#10b981] text-[#9dc4b8] hover:text-[#e8f4f0] px-5 py-3 rounded-full text-sm transition-colors">Back to Speak Ez</Link>
          <Link href="/speakez/how-it-works" className="inline-flex items-center border border-[rgba(16,185,129,0.4)] hover:border-[#10b981] text-[#9dc4b8] hover:text-[#e8f4f0] px-5 py-3 rounded-full text-sm transition-colors">How it works</Link>
          <Link href="/privacy-watch" className="inline-flex items-center border border-[rgba(245,158,11,0.35)] text-[#f8e7bf] hover:text-white px-5 py-3 rounded-full text-sm transition-colors">Privacy Watch</Link>
          <Link href="/contact" className="inline-flex items-center bg-[#10b981] hover:bg-[#0ea572] text-[#031a12] px-5 py-3 rounded-full text-sm font-medium transition-colors">Discuss your use case</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
