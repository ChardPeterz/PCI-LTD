const reasons = [
  {
    num: "35+",
    label: "Years in business",
    desc: "Founded in 1991 — we've seen every technology shift and we're still here.",
  },
  {
    num: "100+",
    label: "Years accumulated IT experience",
    desc: "Our team brings over a century of combined IT expertise across every major technology era.",
  },
  {
    num: "Global",
    label: "Worldwide reach",
    desc: "A UK-registered company serving clients globally — reachable via email or SpeakEz.",
  },
  {
    num: "Clear",
    label: "No jargon",
    desc: "We explain things plainly and give you honest advice — even when it saves you money.",
  },
  {
    num: "Fast",
    label: "Responsive service",
    desc: "We understand that downtime costs businesses money. We act quickly.",
  },
  {
    num: "Secure",
    label: "Privacy by design",
    desc: "We build encryption, zero-knowledge storage and secure-by-default architecture into every system from day one.",
  },
]

export function WhyPCISection() {
  return (
    <section id="why" className="relative z-[1] py-16 md:py-24 px-6 md:px-12 max-w-[1100px] mx-auto">
      <div className="reveal grid md:grid-cols-[180px_1fr] gap-8 md:gap-12 mb-14">
        <div className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] pt-2">
          Why choose us
        </div>
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#e8f4f0] mb-3.5 text-balance">
            The PCI difference
          </h2>
          <p className="text-base text-[#9dc4b8] leading-relaxed">
            We&apos;re not a call centre or a national franchise. We&apos;re a
            local team who answer the phone, show up, and fix the problem.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
        {reasons.map((reason, index) => (
          <div
            key={reason.label}
            className={`reveal reveal-delay-${index + 1} pt-5 relative group`}
          >
            {/* Animated line */}
            <span
              className="absolute top-0 left-0 h-0.5 w-0 group-[.visible]:w-full transition-all duration-700 ease-out bg-gradient-to-r from-[#10b981] to-[#0ea5e9]"
              style={{ transitionDelay: `${index * 80}ms` }}
            />

            <div className="font-serif text-4xl md:text-5xl font-light text-[#e8f4f0] tracking-tighter leading-none mb-2">
              {reason.num}
            </div>
            <div className="text-[15px] font-medium text-[#e8f4f0] mb-1.5">
              {reason.label}
            </div>
            <div className="text-sm text-[#8bb8a8] leading-relaxed">
              {reason.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
