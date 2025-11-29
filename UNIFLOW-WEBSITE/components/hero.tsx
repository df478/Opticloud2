"use client"

import { ArrowRight } from "lucide-react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Optimized mouse parallax - only on desktop and throttled
      let isThrottled = false
      const handleMouseMove = (e: MouseEvent) => {
        if (isThrottled || window.innerWidth <= 768) return

        isThrottled = true
        mouseRef.current.x = e.clientX / window.innerWidth
        mouseRef.current.y = e.clientY / window.innerHeight

        // Use setTimeout for throttling instead of requestAnimationFrame for better performance
        setTimeout(() => {
          gsap.set(".floating-element-1", {
            x: mouseRef.current.x * 15, // Reduced intensity
            y: mouseRef.current.y * 15
          })
          gsap.set(".floating-element-2", {
            x: mouseRef.current.x * -10, // Reduced intensity
            y: mouseRef.current.y * -10
          })
          gsap.set(".floating-element-3", {
            x: mouseRef.current.x * 20, // Reduced intensity
            y: mouseRef.current.y * -8
          })
          isThrottled = false
        }, 16) // ~60fps throttling
      }

      // Only add mouse listener on desktop
      if (window.innerWidth > 768) {
        window.addEventListener("mousemove", handleMouseMove, { passive: true })
      }

      // Optimized initial load animations - reduced complexity
      const tl = gsap.timeline()

      // Floating elements with reduced motion
      tl.fromTo(".floating-element-1", {
        scale: 0,
        autoAlpha: 0
      }, {
        scale: 1,
        autoAlpha: 0.6,
        duration: 0.8, // Reduced duration
        ease: "power2.out"
      })
      .fromTo(".floating-element-2", {
        scale: 0,
        autoAlpha: 0
      }, {
        scale: 1,
        autoAlpha: 0.4,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5")
      .fromTo(".floating-element-3", {
        scale: 0,
        autoAlpha: 0
      }, {
        scale: 1,
        autoAlpha: 0.3,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")

      // Simplified badge animation
      .fromTo(".hero-badge", {
        y: -30,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3")

      // Optimized title animation - reduced stagger for better performance
      .fromTo(".hero-title .char", {
        y: 60,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        stagger: 0.015, // Reduced stagger
        ease: "power2.out"
      }, "-=0.2")

      // Simplified description
      .fromTo(".hero-description", {
        autoAlpha: 0,
        y: 20
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3")

      // Optimized buttons
      .fromTo(".hero-buttons > *", {
        y: 40,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4")

      // Simplified cards animation
      .fromTo(".hero-cards > *", {
        y: 50,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.15, // Reduced stagger
        ease: "power2.out"
      }, "-=0.5")

      // Simplified magnetic button effects - no continuous animations
      const buttons = document.querySelectorAll('.magnetic-btn')
      buttons.forEach((btn) => {
        const handleMouseEnter = () => {
          gsap.to(btn, {
            scale: 1.02, // Reduced scale
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

      return () => {
        if (window.innerWidth > 768) {
          window.removeEventListener("mousemove", handleMouseMove)
        }
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Split title into characters for animation
  const titleText = "Instant Academic Support with Dual AI Agents"
  const titleChars = titleText.split('').map((char, index) => (
    <span key={index} className="char inline-block" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

  return (
    <section ref={containerRef} className="gpu-accelerated min-h-screen px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Premium floating elements */}
      <div className="floating-element-1 absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-accent/20 to-destructive/20 rounded-full blur-xl"></div>
      <div className="floating-element-2 absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-primary/15 to-accent/15 rounded-full blur-lg"></div>
      <div className="floating-element-3 absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-muted/10 to-primary/10 rounded-full blur-2xl"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full py-16 md:py-24">
        <div className="text-center">
          <div className="hero-badge mb-12 inline-block bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-full text-sm font-medium">
            <span className="text-accent mr-2">✨</span> Introducing UniFlow Assist for Universities
          </div>

          <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance leading-tight">
            {titleChars}
          </h1>

          <p className="hero-description text-xl md:text-2xl text-muted-foreground mb-16 leading-relaxed text-balance max-w-4xl mx-auto">
            A voice + visual multi-agent assistant that automates graduation guidance, admissions help, grades,
            certifications, and course search—reducing wait times from days to seconds.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center mb-12 md:mb-16">
            <a href="/chatbot-demo" className="magnetic-btn group bg-gradient-to-r from-accent to-destructive hover:from-accent/90 hover:to-destructive/90 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-accent/25 hover:shadow-3xl hover:shadow-accent/40 transform hover:-translate-y-1">
              Try the Demo <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#features" className="magnetic-btn group border-2 border-white/20 hover:border-white/40 text-white hover:bg-white/5 px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              How It Works
            </a>
          </div>

          {/* Premium dual-agent preview with glassy effects */}
          <div className="hero-cards grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8 md:mt-12">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-accent rounded-full shadow-lg shadow-accent/50 group-hover:scale-125 transition-transform"></div>
                <span className="font-semibold text-lg">Phone Agent</span>
              </div>
              <div className="space-y-4 text-sm">
                <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">Voice conversation for graduation steps</div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">Real-time guidance and document retrieval</div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">24/7 availability, instant responses</div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-accent rounded-full shadow-lg shadow-accent/50 group-hover:scale-125 transition-transform"></div>
                <span className="font-semibold text-lg">Visual Agent</span>
              </div>
              <div className="space-y-4 text-sm">
                <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">Web interface for document viewing</div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">Certificates, grades, course catalogs</div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">Transparent decision-making display</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}
