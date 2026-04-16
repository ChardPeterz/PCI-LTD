import Link from "next/link"

export function Footer() {
  return (
    <footer
      className="relative z-[1] px-6 md:px-12 py-6 border-t border-[rgba(16,185,129,0.18)] flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap"
      style={{ background: "rgba(5,10,9,0.95)" }}
    >
      <div className="flex items-center gap-4">
        <span className="font-serif text-base text-[#e8f4f0]">Professional Computer Integrators Limited</span>
        <span className="text-sm text-[#6b9b8a]">
          &copy; 2026 Professional Computer Integrators Limited. All rights reserved. Registered in England &amp; Wales.
        </span>
      </div>
      <div className="flex gap-5">
        <Link
          href="/services"
          className="text-sm text-[#6b9b8a] hover:text-[#e8f4f0] transition-colors"
        >
          Services
        </Link>
        <Link
          href="/speakez"
          className="text-sm text-[#6b9b8a] hover:text-[#e8f4f0] transition-colors"
        >
          Products
        </Link>
        <Link
          href="/about"
          className="text-sm text-[#6b9b8a] hover:text-[#e8f4f0] transition-colors"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-sm text-[#6b9b8a] hover:text-[#e8f4f0] transition-colors"
        >
          Contact
        </Link>
        <Link
          href="/privacy"
          className="text-sm text-[#6b9b8a] hover:text-[#e8f4f0] transition-colors"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          className="text-sm text-[#6b9b8a] hover:text-[#e8f4f0] transition-colors"
        >
          Terms of Use
        </Link>
      </div>
    </footer>
  )
}
