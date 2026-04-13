const specialisms = [
  "Web App Development",
  "Android App Development",
  "iOS App Development",
  "Cross-Platform Mobile Apps",
  "UI / UX Design",
  "API Integration",
  "Cloud Deployment",
  "E-Commerce Solutions",
  "Custom CMS Development",
  "Progressive Web Apps",
  "Performance Optimisation",
  "DevOps & CI/CD Pipelines",
]

export function LocationsTicker() {
  return (
    <div
      className="relative z-[1] border-t border-b border-[rgba(16,185,129,0.18)] px-6 md:px-12 py-4 flex items-center gap-6 overflow-hidden"
      style={{
        background: "rgba(10,20,18,0.85)",
        backdropFilter: "blur(10px)",
      }}
    >
      <span className="text-[11px] font-medium tracking-widest uppercase text-[#6b9b8a] whitespace-nowrap flex-shrink-0">
        Specialisms
      </span>
      <div
        className="flex-1 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div
          className="flex gap-9 w-max"
          style={{ animation: "ticker 28s linear infinite" }}
        >
          {/* Double the items for seamless loop */}
          {[...specialisms, ...specialisms].map((specialism, index) => (
            <span
              key={index}
              className="text-sm text-[#9dc4b8] flex items-center gap-1.5 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] opacity-55" />
              {specialism}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
