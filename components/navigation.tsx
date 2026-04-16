"use client"

import { forwardRef, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { hasNewPrivacyWatchItem } from "@/lib/privacy-watch"

export const Navigation = forwardRef<HTMLElement>(function Navigation(_, ref) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav
      ref={ref}
      className="sticky top-0 z-[100] px-6 md:px-12 flex items-center justify-between h-16 border-b border-[rgba(16,185,129,0.18)] transition-all duration-300"
      style={{
        background: "rgba(5,10,9,0.86)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
    >
      <Link
        href="/"
        className="font-serif text-xl font-semibold text-[#e8f4f0] flex items-center gap-2.5 tracking-tight"
      >
        PCI{" "}
        <span className="bg-[#10b981] text-white font-sans text-[10px] font-medium tracking-wider px-1.5 py-0.5 rounded uppercase">
          Est. 1991
        </span>
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        <li>
          <Link
            href="/services"
            className="text-sm text-[#9dc4b8] hover:text-[#e8f4f0] transition-colors relative group"
          >
            Services
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#10b981] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </Link>
        </li>
        <li>
          <Link
            href="/speakez"
            className="text-sm text-[#9dc4b8] hover:text-[#e8f4f0] transition-colors relative group"
          >
            Products
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#10b981] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </Link>
        </li>
        <li>
          <Link
            href="/privacy-watch"
            className="text-sm text-[#f8e7bf] hover:text-white transition-colors relative group inline-flex items-center gap-2"
            style={hasNewPrivacyWatchItem ? { textShadow: "0 0 12px rgba(245,158,11,0.45)" } : undefined}
          >
            <span className={hasNewPrivacyWatchItem ? "w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" : "w-2 h-2 rounded-full bg-[#f59e0b]"} />
            Privacy Watch
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#f59e0b] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </Link>
        </li>
        <li>
          <Link
            href="/online-safety"
            className="text-sm text-[#9dc4b8] hover:text-[#e8f4f0] transition-colors relative group"
          >
            Online Safety
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#10b981] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="text-sm text-[#9dc4b8] hover:text-[#e8f4f0] transition-colors relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#10b981] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="bg-[#10b981] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-[#0ea5e9] hover:-translate-y-0.5 transition-all"
          >
            Get in touch
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-[#e8f4f0]"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#0a1412] border-b border-[rgba(16,185,129,0.18)] p-6 md:hidden">
          <ul className="flex flex-col gap-4 list-none">
            <li>
              <Link
                href="/services"
                className="text-[#9dc4b8] hover:text-[#e8f4f0] transition-colors block py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/speakez"
                className="text-[#9dc4b8] hover:text-[#e8f4f0] transition-colors block py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-watch"
                className="text-[#f8e7bf] hover:text-white transition-colors block py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Privacy Watch{hasNewPrivacyWatchItem ? " (new)" : ""}
              </Link>
            </li>
            <li>
              <Link
                href="/online-safety"
                className="text-[#9dc4b8] hover:text-[#e8f4f0] transition-colors block py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Online Safety
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-[#9dc4b8] hover:text-[#e8f4f0] transition-colors block py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="bg-[#10b981] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-[#0ea5e9] transition-colors inline-block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get in touch
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
})
