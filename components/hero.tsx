
export function Hero() {
  return (
    <div className="relative z-[1]">
       {/* Full-width announcement banners */}
      <a
        href="/speakez"
        className="block w-full px-6 py-3 text-center hover:opacity-90 transition-opacity"
        style={{
          background: "linear-gradient(120deg, rgba(16,185,129,0.18) 0%, rgba(14,165,233,0.15) 100%)",
          borderBottom: "1px solid rgba(16,185,129,0.3)",
        }}
      >
        <span className="text-[10px] font-medium tracking-widest uppercase text-[#6ee7b7] mr-2">
          Product announcement
        </span>
        <span className="text-sm text-[#e8f4f0] font-medium">
          SpeakEz Out Now ! — Get it now on Google PlayStore & Apple App Store →
        </span>
      </a>
      <a
        href="http://savethechase.duckdns.org"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full px-6 py-3 text-center hover:opacity-90 transition-opacity"
        style={{
          background: "linear-gradient(120deg, rgba(14,165,233,0.18) 0%, rgba(124,58,237,0.13) 100%)",
          borderBottom: "1px solid rgba(14,165,233,0.3)",
        }}
      >
        <span className="text-[10px] font-medium tracking-widest uppercase text-[#7dd3fc] mr-2">
          Community announcement
        </span>
        <span className="text-sm text-[#e8f4f0] font-medium">
          Save The Chase — find out more at savethechase.duckdns.org →
        </span>
      </a>
      <div className="py-16 md:py-24 px-6 md:px-12 max-w-[1100px] mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center">
        {/* Left Content */}
        <div>
          <div
            className="text-xs font-medium tracking-widest uppercase text-[#10b981] mb-5 flex items-center gap-2 opacity-0"
            style={{ animation: "fadeUp 0.7s 0.1s ease forwards" }}
          >
            <span className="w-5 h-px bg-[#10b981]" />
            Based in the UK
          </div>
          <h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-[#e8f4f0] mb-6 opacity-0 text-balance"
            style={{ animation: "fadeUp 0.7s 0.2s ease forwards" }}
          >
            IT support, app&nbsp;development &amp; services you can{" "}
            <em className="text-[#10b981]">rely&nbsp;on</em>
          </h1>
          <p
            className="text-base text-[#9dc4b8] leading-relaxed mb-9 max-w-md opacity-0"
            style={{ animation: "fadeUp 0.7s 0.35s ease forwards" }}
          >
            PCI has been providing expert computer support, bespoke application
            development and IT consultancy to businesses and private clients
            since 1991. From secure encrypted communications to native mobile
            apps and payment systems — genuine expertise, long-term relationships.
          </p>
          
          <div
            className="flex gap-3 flex-wrap opacity-0"
            style={{ animation: "fadeUp 0.7s 0.5s ease forwards" }}
          >
            <a
              href="mailto:enquiries@pci-ltd.co.uk"
              className="inline-flex items-center gap-2 bg-[#10b981] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#0ea5e9] hover:-translate-y-0.5 hover:shadow-lg transition-all"
              style={{ boxShadow: "0 6px 20px rgba(16,185,129,0.35)" }}
            >
              Get in touch
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium text-[#e8f4f0] border border-[rgba(16,185,129,0.3)] hover:border-[#10b981] hover:bg-[rgba(16,185,129,0.15)] hover:-translate-y-0.5 transition-all"
              style={{
                background: "rgba(16,185,129,0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              Our services
              <span className="text-lg">&#8594;</span>
            </a>
          </div>
        </div>

        {/* Right Card */}
        <div
          className="opacity-0"
          style={{ animation: "fadeIn 0.8s 0.3s ease forwards" }}
        >
          <div
            className="bg-[#0a1412] rounded-2xl p-9 text-white relative overflow-hidden transition-all duration-500 hover:shadow-2xl"
            style={{
              boxShadow: "0 24px 64px rgba(16,185,129,0.25), 0 0 0 1px rgba(16,185,129,0.2)",
            }}
          >
            {/* Glow Effect */}
            <div
              className="absolute inset-0 rounded-2xl opacity-70"
              style={{
                background: `conic-gradient(
                  from 0deg at 65% 35%,
                  rgba(16,185,129,0.35) 0deg,
                  rgba(14,165,233,0.28) 90deg,
                  rgba(16,185,129,0.14) 180deg,
                  rgba(14,165,233,0.22) 270deg,
                  rgba(16,185,129,0.35) 360deg
                )`,
                animation: "cardSpin 18s linear infinite",
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <div className="font-serif text-7xl md:text-8xl font-light text-white/[0.09] leading-none tracking-tighter mb-0.5">
                35+
              </div>
              <div className="text-sm text-white/70 mb-7">
                years serving the South-West
              </div>

              <div className="grid grid-cols-2 gap-5 mb-7">
                <div>
                  <div className="font-serif text-2xl font-light text-white tracking-tight">
                    ISO
                  </div>
                  <div className="text-xs text-white/60 mt-0.5">
                    9002 accredited
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-light text-white tracking-tight">
                    FSB
                  </div>
                  <div className="text-xs text-white/60 mt-0.5">Member</div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-light text-white tracking-tight">
                    Local
                  </div>
                  <div className="text-xs text-white/60 mt-0.5">
                    Cirencester based
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-light text-white tracking-tight">
                    MCSE
                  </div>
                  <div className="text-xs text-white/60 mt-0.5">
                    Qualified engineers
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.3)] rounded-full px-3.5 py-1.5 text-xs text-[rgba(232,244,240,0.85)]">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"
                  style={{ animation: "pulse 2.2s ease-in-out infinite" }}
                />
                Accepting new clients
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
