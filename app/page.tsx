"use client"

import { useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { LocationsTicker } from "@/components/locations-ticker"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  const navRef = useRef<HTMLElement>(null)

  return (
    <>
      <AnimatedBackground />
      <Navigation ref={navRef} />
      <Hero />
      <LocationsTicker />
      <Footer />
    </>
  )
}
