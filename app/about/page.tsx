"use client"

import { useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { AboutSection } from "@/components/about-section"
import { WhyPCISection } from "@/components/why-pci-section"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export default function AboutPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -36px 0px" }
    )
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <AboutSection />
      <hr className="border-t border-[rgba(124,58,237,0.18)] relative z-[1]" />
      <WhyPCISection />
      <Footer />
    </>
  )
}
