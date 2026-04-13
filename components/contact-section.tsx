import { Globe, MapPin, MessageSquare, Mail } from "lucide-react"

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "enquiries@pci-ltd.co.uk",
    href: "mailto:enquiries@pci-ltd.co.uk",
  },
  {
    icon: MessageSquare,
    label: "Secure messaging",
    value: "SpeakEz.duckdns.org",
    href: "https://speakez.duckdns.org",
  },
  {
    icon: Globe,
    label: "Website",
    value: "www.pci-ltd.co.uk",
    href: "https://www.pci-ltd.co.uk",
  },
  {
    icon: MapPin,
    label: "Coverage",
    value: "Global",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="relative z-[1] py-16 md:py-24 px-6 md:px-12 max-w-[1100px] mx-auto">
      <div
        className="reveal bg-[#0a1412] rounded-2xl p-9 md:p-14 grid md:grid-cols-2 gap-10 md:gap-14 text-white relative overflow-hidden"
        style={{ boxShadow: "0 24px 80px rgba(16,185,129,0.2), 0 0 0 1px rgba(16,185,129,0.18)" }}
      >
        {/* Pulsing rings */}
        <div
          className="absolute w-[420px] h-[420px] -top-36 -right-36 rounded-full border border-white/5"
          style={{ animation: "ringPulse 7s ease-in-out infinite" }}
        />
        <div
          className="absolute w-[280px] h-[280px] -top-20 -right-20 rounded-full"
          style={{
            border: "1px solid rgba(16,185,129,0.22)",
            animation: "ringPulse 7s ease-in-out infinite",
            animationDelay: "-1.5s",
          }}
        />
        <div
          className="absolute w-40 h-40 -top-5 -right-5 rounded-full"
          style={{
            border: "1px solid rgba(14,165,233,0.28)",
            animation: "ringPulse 7s ease-in-out infinite",
            animationDelay: "-3s",
          }}
        />

        {/* Left Column */}
        <div className="relative z-10">
          <div className="text-[11px] font-medium tracking-widest uppercase text-white/60 mb-4">
            Get in touch
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-white mb-4 text-balance">
            Let&apos;s talk about your IT needs
          </h2>
          <p className="text-[15px] text-white/75 leading-relaxed mb-8">
            Whether it&apos;s an urgent problem, a longer-term project, or a
            custom application you&apos;ve been thinking about — we&apos;re
            happy to have a no-obligation conversation.
          </p>
          <a
            href="mailto:enquiries@pci-ltd.co.uk"
            className="font-serif text-2xl md:text-3xl font-light text-white tracking-tight inline-block mb-2 hover:text-[#34d399] hover:translate-x-1 transition-all break-all"
          >
            enquiries@pci-ltd.co.uk
          </a>
          <div className="text-xs text-white/60 tracking-wider uppercase mt-1">
            Or message us via SpeakEz — we pick up periodically
          </div>
        </div>

        {/* Right Column - Contact Details */}
        <div className="relative z-10 flex flex-col gap-3">
          {contactDetails.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="flex items-start gap-3.5 p-4 rounded-lg bg-white/5 border border-white/[0.07] transition-all duration-200 hover:bg-white/[0.09] hover:border-white/[0.13] hover:translate-x-1"
              >
                <Icon size={15} className="flex-shrink-0 mt-0.5 text-white/60" />
                <div>
                  <div className="text-[11px] text-white/60 uppercase tracking-wider mb-1">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-white/80 hover:text-[#34d399] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-sm text-white/80">{item.value}</div>
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
