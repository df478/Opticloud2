"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import HighlightCards from "@/components/highlight-cards"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

export default function Home() {
  useEffect(() => {
    // Performance optimization: Use native smooth scroll with optimized GSAP
    // Removed Locomotive Scroll to eliminate scroll lag and improve responsiveness

    // Prevent scroll restoration to ensure pages start at top
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // Ensure ScrollTrigger is properly synchronized
    const handleResize = () => {
      setTimeout(() => {
        if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
          (window as any).ScrollTrigger.refresh()
        }
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    // Initial refresh after component mounts
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.refresh()
      }
    }, 200)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <main className="w-full">
      <Header />
      <Hero />
      <HighlightCards />
      <CTA />
      <Footer />
    </main>
  )
}
