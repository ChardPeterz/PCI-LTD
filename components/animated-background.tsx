export function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Dots Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(16,185,129,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          animation: "dotsDrift 70s linear infinite",
        }}
      />

      {/* Floating Orbs */}
      <div
        className="absolute rounded-full"
        style={{
          width: 560,
          height: 560,
          background:
            "radial-gradient(circle, rgba(16,185,129,0.22) 0%, transparent 70%)",
          top: -120,
          left: -100,
          filter: "blur(90px)",
          opacity: 0,
          animation: "orbFloat 22s linear infinite",
          animationDelay: "0.4s",
          animationFillMode: "forwards",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 440,
          height: 440,
          background:
            "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)",
          top: "15%",
          right: -100,
          filter: "blur(90px)",
          opacity: 0,
          animation: "orbFloat 29s linear infinite",
          animationDelay: "0.8s",
          animationFillMode: "forwards",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 380,
          height: 380,
          background:
            "radial-gradient(circle, rgba(16,185,129,0.13) 0%, transparent 70%)",
          bottom: "18%",
          left: "25%",
          filter: "blur(90px)",
          opacity: 0,
          animation: "orbFloat 35s linear infinite",
          animationDelay: "1.4s",
          animationFillMode: "forwards",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(14,165,233,0.14) 0%, transparent 70%)",
          top: "55%",
          right: "15%",
          filter: "blur(90px)",
          opacity: 0,
          animation: "orbFloat 27s linear infinite",
          animationDelay: "2s",
          animationFillMode: "forwards",
        }}
      />

      {/* Terrain SVG */}
      <div className="absolute bottom-0 left-0 right-0 h-80">
        <svg
          width="100%"
          height="320"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="origin-bottom"
            style={{ animation: "terrainBreath 9s ease-in-out infinite" }}
            d="M0,255 C140,218 260,238 400,210 C520,186 600,208 730,192 C860,176 960,200 1080,182 C1200,164 1330,186 1440,172 L1440,320 L0,320Z"
            fill="rgba(16,185,129,0.055)"
          />
          <path
            className="origin-bottom"
            style={{
              animation: "terrainBreath 13s ease-in-out infinite",
              animationDelay: "-3s",
            }}
            d="M0,278 C100,258 220,270 360,254 C480,240 580,262 700,248 C840,232 960,252 1080,238 C1200,224 1340,244 1440,234 L1440,320 L0,320Z"
            fill="rgba(16,185,129,0.04)"
            stroke="rgba(16,185,129,0.09)"
            strokeWidth="1"
          />
          <path
            className="origin-bottom"
            style={{
              animation: "terrainBreath 17s ease-in-out infinite",
              animationDelay: "-6s",
            }}
            d="M0,300 C120,288 240,296 380,284 C520,272 640,286 780,276 C920,266 1060,280 1200,270 C1320,262 1400,270 1440,266 L1440,320 L0,320Z"
            fill="rgba(14,165,233,0.035)"
            stroke="rgba(14,165,233,0.07)"
            strokeWidth="0.5"
          />
          <path
            d="M0,242 C200,222 440,234 640,218 C840,202 1060,218 1260,206 C1360,200 1410,208 1440,204"
            fill="none"
            stroke="rgba(16,185,129,0.1)"
            strokeWidth="1"
            strokeDasharray="4,10"
          />
        </svg>
      </div>

      {/* Sweep Effect */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(108deg, transparent 0%, transparent 38%, rgba(16,185,129,0.045) 50%, transparent 62%, transparent 100%)",
          animation: "sweep 14s ease-in-out infinite",
        }}
      />
    </div>
  )
}
