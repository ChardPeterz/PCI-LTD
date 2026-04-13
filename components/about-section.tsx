import { Users, Building, GraduationCap } from "lucide-react"

const accreditations = [
  {
    icon: Users,
    title: "Federation of Small Businesses",
    description:
      "Proud member supporting the local and national small business community.",
  },
  {
    icon: Building,
    title: "Registered in England & Wales",
    description:
      "PCI Ltd is a company registered in England and Wales.",
  },
  {
    icon: GraduationCap,
    title: "MCSE & CNE Qualified Engineers",
    description:
      "Microsoft Certified and Novell Certified engineers on the team.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative z-[1] py-16 md:py-24 px-6 md:px-12 max-w-[1100px] mx-auto">
      <div className="reveal grid md:grid-cols-[180px_1fr] gap-8 md:gap-12 mb-14">
        <div className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] pt-2">
          Our story
        </div>
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#e8f4f0] mb-3.5 text-balance">
            Trusted by businesses across the UK since 1991
          </h2>
          <p className="text-base text-[#9dc4b8] leading-relaxed">
            PCI was founded with a clear focus: deliver expert IT services with
            the reliability that businesses deserve.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        {/* Body Text */}
        <div className="reveal space-y-5">
          <p className="text-[15px] text-[#9dc4b8] leading-relaxed">
            Information is the lifeblood of any organisation. At PCI we&apos;ve
            spent over three decades helping small and medium-sized businesses
            across the UK get the most from their technology — from the earliest
            days of Windows networking through to today&apos;s cloud-connected
            and custom-software workplaces.
          </p>
          <p className="text-[15px] text-[#9dc4b8] leading-relaxed">
            Our team includes engineers with MCSE and CNE qualifications,
            experienced in the full range of Microsoft and network environments.
            We also develop bespoke applications — from secure encrypted
            communication platforms and native mobile apps to integrated payment
            systems and decentralised storage architectures, built to your exact
            specification.
          </p>
          <p className="text-[15px] text-[#9dc4b8] leading-relaxed">
            As members of the Federation of Small Businesses, we&apos;re
            committed to the UK business community and the clients we serve.
          </p>
        </div>

        {/* Accreditations */}
        <div className="flex flex-col gap-3">
          {accreditations.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className={`reveal reveal-delay-${index + 1} flex items-start gap-3.5 p-5 rounded-xl border border-[rgba(16,185,129,0.18)] transition-all duration-200 hover:translate-x-1 hover:bg-[rgba(16,185,129,0.1)] hover:shadow-md`}
                style={{ 
                  background: "rgba(10,20,18,0.8)",
                  boxShadow: "0 4px 20px rgba(16,185,129,0.15)"
                }}
              >
                <Icon
                  size={20}
                  className="flex-shrink-0 mt-0.5 text-[#10b981]"
                />
                <div>
                  <div className="text-sm font-medium text-[#e8f4f0] mb-1">
                    {item.title}
                  </div>
                  <div className="text-sm text-[#8bb8a8] leading-relaxed">
                    {item.description}
                  </div>
                  {item.cert && (
                    <div className="text-[11px] font-mono text-[#10b981] mt-1 tracking-wide">
                      {item.cert}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
