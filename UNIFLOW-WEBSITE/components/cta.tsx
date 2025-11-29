"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Optimized scroll-triggered animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%", // Trigger much later to prevent auto-scroll
          end: "bottom 5%",
          toggleActions: "play none none reverse",
          preventOverlaps: true
        }
      })

      // Simplified background elements
      tl.fromTo(".cta-bg-element-1", {
        scale: 0,
        autoAlpha: 0
      }, {
        scale: 1,
        autoAlpha: 0.2,
        duration: 1,
        ease: "power2.out"
      })
      .fromTo(".cta-bg-element-2", {
        scale: 0,
        autoAlpha: 0
      }, {
        scale: 1,
        autoAlpha: 0.15,
        duration: 1,
        ease: "power2.out"
      }, "-=0.7")

      // Optimized title animation - reduced character stagger
      .fromTo(".cta-title .char", {
        y: 50,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        stagger: 0.02, // Reduced stagger
        ease: "power2.out"
      }, "-=0.5")

      // Simplified description
      .fromTo(".cta-description", {
        autoAlpha: 0,
        y: 25
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")

      // Optimized buttons - no magnetic effect for better performance
      .fromTo(".cta-buttons > *", {
        y: 40,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.3")

      // Simple hover effects - no continuous animations
      const buttons = document.querySelectorAll('.cta-magnetic-btn')
      buttons.forEach((btn) => {
        const handleMouseEnter = () => {
          gsap.to(btn, {
            scale: 1.02,
            duration: 0.2,
            ease: "power2.out"
          })
        }
        const handleMouseLeave = () => {
          gsap.to(btn, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          })
        }
        btn.addEventListener('mouseenter', handleMouseEnter, { passive: true })
        btn.addEventListener('mouseleave', handleMouseLeave, { passive: true })
      })

      // Removed continuous floating animations for better performance
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Split title into characters for animation
  const titleText = "Bring the Future of Academic Support to Your Campus"
  const titleChars = titleText.split('').map((char, index) => (
    <span key={index} className="char inline-block" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

  return (
    <section
      ref={containerRef}
      id="cta"
      className="gpu-accelerated py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent via-destructive to-primary text-white relative overflow-hidden min-h-[80vh] md:min-h-screen flex items-center"
    >
      {/* Premium animated background elements */}
      <div className="cta-bg-element-1 absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="cta-bg-element-2 absolute bottom-20 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent blur-3xl"></div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center w-full">
        <h2 className="cta-title text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance leading-tight">
          {titleChars}
        </h2>

        <p className="cta-description text-xl md:text-2xl text-white/90 mb-16 max-w-3xl mx-auto leading-relaxed">
          Join forward-thinking universities transforming student support with AI-powered assistance that delivers results in seconds, not hours.
        </p>

        <div className="cta-buttons flex flex-col sm:flex-row gap-8 justify-center">
          <button className="cta-magnetic-btn group bg-white hover:bg-white/95 text-accent px-12 py-6 rounded-full font-bold text-xl transition-all duration-300 shadow-2xl shadow-black/25 hover:shadow-3xl hover:shadow-black/40 transform hover:scale-105 relative overflow-hidden">
            <span className="relative z-10">Request Access</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-destructive/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button className="cta-magnetic-btn group border-3 border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-12 py-6 rounded-full font-bold text-xl transition-all duration-300 backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:scale-105">
            Download Pitch Deck
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-sm">Universities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">99.9%</div>
            <div className="text-sm">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-sm">Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">10x</div>
            <div className="text-sm">Faster</div>
          </div>
        </div>
      </div>
    </section>
  )
}
