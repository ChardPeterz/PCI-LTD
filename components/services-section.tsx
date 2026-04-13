import {
  Monitor,
  Network,
  Shield,
  Settings,
  Globe,
  HardDrive,
  Smartphone,
  Lock,
  Laptop,
} from "lucide-react"

const services = [
  {
    icon: Laptop,
    title: "Application development",
    description:
      "Bespoke web, desktop and server applications built around your workflows. Internal tools, customer portals, real-time communications platforms and automation — designed to last, built to your exact specification.",
    featured: true,
    tag: "Now available",
  },
  {
    icon: Monitor,
    title: "PC & computer support",
    description:
      "Hands-on repair, upgrades, troubleshooting and maintenance for Windows, laptops, desktops and servers — at your premises or remotely.",
  },
  {
    icon: Network,
    title: "Network installation",
    description:
      "Design, installation and configuration of business networks — peer-to-peer, server-based, cabling infrastructure and wireless.",
  },
  {
    icon: Shield,
    title: "System security",
    description:
      "Protecting your business with robust security configurations, backup strategies, anti-virus, and ongoing monitoring.",
  },
  {
    icon: Settings,
    title: "IT consultancy",
    description:
      "Impartial advice on IT strategy, equipment specification, system health checks and audits — no jargon, just clear guidance.",
  },
  {
    icon: Globe,
    title: "Internet & connectivity",
    description:
      "Setup and support for internet connectivity, email, remote working, and communications across your business.",
  },
  {
    icon: HardDrive,
    title: "System upgrades",
    description:
      "Hardware and software upgrades keeping your systems fast, capable and supported — extending the life of existing investment.",
  },
  {
    icon: Smartphone,
    title: "Mobile & PWA development",
    description:
      "Native Android and iOS applications, plus Progressive Web Apps with offline support, push notifications and home-screen installation. One codebase, every platform — deployed and maintained end-to-end.",
    tag: "New",
  },
  {
    icon: Lock,
    title: "Secure & encrypted systems",
    description:
      "End-to-end encrypted communications, zero-knowledge storage, decentralised data architecture and steganographic embedding. Purpose-built for organisations where privacy and data integrity are non-negotiable.",
    tag: "New",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="relative z-[1] py-16 md:py-24 px-6 md:px-12 max-w-[1100px] mx-auto">
      <div className="reveal grid md:grid-cols-[180px_1fr] gap-8 md:gap-12 mb-14">
        <div className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] pt-2">
          What we offer
        </div>
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#e8f4f0] mb-3.5 text-balance">
            Practical IT support &amp; smart software for real businesses
          </h2>
          <p className="text-base text-[#9dc4b8] leading-relaxed">
            From a single PC that needs attention to a full network installation
            or a custom-built application — PCI has the experience to get it
            done right, first time.
          </p>
        </div>
      </div>

      <div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
        style={{
          background: "rgba(16,185,129,0.15)",
          border: "1px solid rgba(16,185,129,0.2)",
          boxShadow: "0 4px 32px rgba(16,185,129,0.1)",
        }}
      >
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <div
              key={service.title}
              className={`reveal reveal-delay-${(index % 7) + 1} p-7 transition-all duration-300 relative overflow-hidden group ${
                service.featured
                  ? "bg-[rgba(16,185,129,0.15)] hover:bg-[rgba(16,185,129,0.22)]"
                  : "bg-[rgba(10,20,18,0.92)] hover:bg-[rgba(16,185,129,0.08)]"
              }`}
              style={{
                backdropFilter: "blur(6px)",
              }}
            >
              {/* Bottom border animation */}
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 bg-gradient-to-r from-[#10b981] to-[#0ea5e9]"
              />

              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3 ${
                  service.featured ? "bg-[rgba(16,185,129,0.25)]" : "bg-[rgba(16,185,129,0.15)]"
                }`}
              >
                <Icon
                  size={19}
                  className="text-[#e8f4f0]"
                />
              </div>

              <h3
                className={`font-serif text-lg font-normal mb-2 tracking-tight ${
                  service.featured ? "text-white" : "text-[#e8f4f0]"
                }`}
              >
                {service.title}
              </h3>

              <p
                className={`text-sm leading-relaxed ${
                  service.featured ? "text-[rgba(232,244,240,0.85)]" : "text-[#9dc4b8]"
                }`}
              >
                {service.description}
              </p>

              {service.tag && (
                <span className="inline-block mt-3 text-[10px] font-medium tracking-wider uppercase bg-[rgba(16,185,129,0.3)] text-[#6ee7b7] px-2 py-0.5 rounded border border-[rgba(16,185,129,0.4)]">
                  {service.tag}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
