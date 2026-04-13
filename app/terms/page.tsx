import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms of Use — PCI Ltd",
  description: "Terms of use and intellectual property notice for PCI Ltd.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#050a09" }}>
      <Navigation />
      <main className="flex-1 px-6 md:px-12 py-24 max-w-[760px] mx-auto w-full">
        <p className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] mb-3">Legal</p>
        <h1 className="font-serif text-4xl font-light text-[#e8f4f0] mb-10">Terms of Use</h1>

        <div className="space-y-8 text-[15px] leading-relaxed text-[#9dc4b8]">

          <section>
            <h2 className="font-serif text-xl font-light text-[#e8f4f0] mb-3">Intellectual property</h2>
            <p>
              All content on this website — including but not limited to text, design, graphics,
              logos, product and service descriptions, and software — is the intellectual property
              of PCI Ltd and is protected under the Copyright, Designs and Patents Act 1988 and
              applicable international copyright law.
            </p>
            <p className="mt-3">
              Unauthorised reproduction, distribution, transmission, modification, or use of any
              content on this site, in whole or in part, without the prior written consent of PCI
              Ltd is strictly prohibited and may result in civil and/or criminal liability.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-[#e8f4f0] mb-3">Speak Ez product</h2>
            <p>
              Speak Ez is a proprietary product of PCI Ltd. The name, branding, concept, architecture,
              and all associated materials are the exclusive intellectual property of PCI Ltd.
              No licence, right, or interest in Speak Ez is granted to any third party by virtue of
              accessing this website.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-[#e8f4f0] mb-3">Permitted use</h2>
            <p>
              You may access and view this website for personal, non-commercial informational purposes
              only. You may not:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-[#9dc4b8]">
              <li>Copy, reproduce, or republish any content from this site</li>
              <li>Scrape, harvest, or systematically extract data from this site</li>
              <li>Use this site&apos;s content for training artificial intelligence or machine learning models</li>
              <li>Frame or embed this site within another website or application</li>
              <li>Reverse engineer or attempt to extract source code or proprietary methods</li>
              <li>Use this site&apos;s content for any commercial purpose without written authorisation</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-[#e8f4f0] mb-3">No AI training</h2>
            <p>
              The content of this website is expressly excluded from use in the training, fine-tuning,
              evaluation, or development of any artificial intelligence system, large language model,
              or automated data processing pipeline. This prohibition applies regardless of whether
              access is obtained by automated means or by a human operator.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-[#e8f4f0] mb-3">Trademarks</h2>
            <p>
              &ldquo;PCI Ltd&rdquo;, &ldquo;Speak Ez&rdquo;, and associated logos and marks are
              trademarks of PCI Ltd. Use of these marks without prior written permission is
              prohibited.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-[#e8f4f0] mb-3">Disclaimer</h2>
            <p>
              This website is provided on an &ldquo;as is&rdquo; basis. PCI Ltd makes no warranties,
              express or implied, regarding the accuracy, completeness, or fitness for purpose of
              any content herein. PCI Ltd shall not be liable for any loss or damage arising from
              use of, or reliance on, this website.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-[#e8f4f0] mb-3">Governing law</h2>
            <p>
              These terms are governed by the laws of England and Wales. Any disputes arising in
              connection with this website shall be subject to the exclusive jurisdiction of the
              courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-[#e8f4f0] mb-3">Contact</h2>
            <p>
              For licensing enquiries or to report suspected infringement, please contact us at{" "}
              <a
                href="mailto:enquiries@pci-ltd.co.uk"
                className="text-[#10b981] hover:underline"
              >
                enquiries@pci-ltd.co.uk
              </a>
              .
            </p>
          </section>

          <p className="text-xs text-[#6b9b8a] pt-4 border-t border-[rgba(16,185,129,0.12)]">
            &copy; 2026 PCI Ltd. All rights reserved. Registered in England &amp; Wales.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
