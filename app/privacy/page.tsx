import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy — PCI Ltd",
  description: "PCI Ltd privacy policy. We do not use cookies, collect personal data, or track visitors.",
}

export default function PrivacyPage() {
  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <main className="relative z-[1] max-w-[760px] mx-auto px-6 md:px-12 pt-36 pb-24">
        <div className="mb-10">
          <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] mb-4">
            Legal
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#e8f4f0] mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#6b9b8a]">Last updated: April 2026</p>
        </div>

        <div className="space-y-10 text-[#9dc4b8] text-base leading-relaxed">

          <section>
            <h2 className="font-serif text-xl font-light text-[#e8f4f0] mb-3">Our commitment</h2>
            <p>
              PCI Ltd does not use cookies, does not track visitors, and does not store any personal
              data collected from visits to this website. No analytics, no advertising pixels, no
              fingerprinting, and no third-party tracking scripts are deployed on this site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-[#e8f4f0] mb-3">Cookies</h2>
            <p>
              This website does not set or read any cookies — first-party or third-party. You will
              not find any tracking cookies, session cookies, or advertising cookies on this site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-[#e8f4f0] mb-3">Data collection</h2>
            <p>
              We do not collect, store, or process any personal data as a result of you visiting
              this website. No IP addresses, browser fingerprints, device identifiers, or behavioural
              data are recorded or retained.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-[#e8f4f0] mb-3">Contact enquiries</h2>
            <p>
              If you choose to contact us via the contact form or by email, the information you
              provide (such as your name, email address, and message) is used solely to respond to
              your enquiry. It is not shared with third parties, used for marketing, or stored beyond
              the duration of the correspondence.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-[#e8f4f0] mb-3">Third-party services</h2>
            <p>
              This website does not load any third-party analytics, advertising, or social media
              scripts. No data about your visit is shared with any external organisation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-[#e8f4f0] mb-3">Your rights</h2>
            <p>
              Under UK GDPR and the Data Protection Act 2018, you have the right to access, correct,
              or request deletion of any personal data we hold. Because we do not collect or store
              visitor data, there is nothing to access or delete in relation to your visit. For
              correspondence-related enquiries, please contact us directly.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-[#e8f4f0] mb-3">Contact</h2>
            <p>
              PCI Ltd. Registered in England and Wales.
              <br />
              For any privacy-related questions, please use the{" "}
              <Link href="/#contact" className="text-[#10b981] underline underline-offset-2 hover:text-[#34d399] transition-colors">
                contact form
              </Link>{" "}
              on the main site.
            </p>
          </section>

        </div>

        <div className="mt-14 flex items-center gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#6b9b8a] hover:text-[#e8f4f0] transition-colors"
          >
            ← Back to site
          </Link>
          <Link
            href="/terms"
            className="inline-flex items-center gap-2 text-sm text-[#6b9b8a] hover:text-[#e8f4f0] transition-colors"
          >
            Terms of Use →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
