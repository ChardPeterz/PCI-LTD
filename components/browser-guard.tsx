"use client"

import { useEffect } from "react"

export function BrowserGuard() {
  useEffect(() => {
    // Disable right-click
    const noContext = (e: MouseEvent) => e.preventDefault()
    document.addEventListener("contextmenu", noContext)

    // Block DevTools keyboard shortcuts
    const noKeys = (e: KeyboardEvent) => {
      const key = e.key
      const ctrl = e.ctrlKey || e.metaKey
      const shift = e.shiftKey

      // F12
      if (key === "F12") { e.preventDefault(); return }
      // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools panels)
      if (ctrl && shift && ["i", "I", "j", "J", "c", "C"].includes(key)) { e.preventDefault(); return }
      // Ctrl+U (view source)
      if (ctrl && (key === "u" || key === "U")) { e.preventDefault(); return }
      // Ctrl+S (save page)
      if (ctrl && (key === "s" || key === "S")) { e.preventDefault(); return }
    }
    document.addEventListener("keydown", noKeys)

    // DevTools open detection via window outer/inner size discrepancy
    // and debugger timing trick
    let devtoolsOpen = false
    const detect = () => {
      const threshold = 160
      const widthDiff = window.outerWidth - window.innerWidth
      const heightDiff = window.outerHeight - window.innerHeight
      const isOpen = widthDiff > threshold || heightDiff > threshold
      if (isOpen && !devtoolsOpen) {
        devtoolsOpen = true
        document.body.style.filter = "blur(8px)"
        document.body.style.pointerEvents = "none"
      } else if (!isOpen && devtoolsOpen) {
        devtoolsOpen = false
        document.body.style.filter = ""
        document.body.style.pointerEvents = ""
      }
    }
    const interval = setInterval(detect, 1000)

    // Disable text selection on non-input elements
    document.body.style.userSelect = "none"

    return () => {
      document.removeEventListener("contextmenu", noContext)
      document.removeEventListener("keydown", noKeys)
      clearInterval(interval)
      document.body.style.userSelect = ""
      document.body.style.filter = ""
      document.body.style.pointerEvents = ""
    }
  }, [])

  return null
}
