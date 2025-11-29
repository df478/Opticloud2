"use client"

import { Zap, Brain, Users } from "lucide-react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function HighlightCards() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Optimized scroll-triggered animations - single timeline for better performance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%", // Trigger much later to prevent auto-scroll
          end: "bottom 5%",
          toggleActions: "play none none reverse",
          preventOverlaps: true
        }
      })

      // Simplified card animations
      tl.fromTo(".highlight-card", {
        y: 60,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.2, // Reduced stagger
        ease: "power2.out"
      })

      // Simplified text animations
      .fromTo(".card-title", {
        y: 20,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.4")

      .fromTo(".card-description", {
        y: 15,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.3")

      // Optimized hover effects - no rotation for better performance
      const cards = document.querySelectorAll('.highlight-card')
      cards.forEach((card) => {
        const icon = card.querySelector('.card-icon')
        let isHovering = false

        const handleMouseEnter = () => {
          if (isHovering) return
          isHovering = true

          gsap.to(icon, {
            scale: 1.1, // Reduced scale
            duration: 0.3,
            ease: "power2.out"
          })
          gsap.to(card, {
            y: -5, // Reduced lift
            duration: 0.3,
            ease: "power2.out"
          })
        }

        const handleMouseLeave = () => {
          isHovering = false
          gsap.to(icon, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          })
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          })
        }

        card.addEventListener('mouseenter', handleMouseEnter, { passive: true })
        card.addEventListener('mouseleave', handleMouseLeave, { passive: true })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const highlights = [
    {
      icon: Brain,
      title: "Multi-Agent System",
      description:
        "Intelligent routing across IT, student services, and administrative agents for optimal problem resolution.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Reduce student service wait times from hours to seconds with AI-powered automation and routing.",
    },
    {
      icon: Users,
      title: "Student-Centric",
      description: "Voice and visual interfaces designed specifically for university students and staff workflows.",
    },
  ]

  return (
    <section id="features" ref={containerRef} className="gpu-accelerated py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Why Choose UniFlow AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of academic support with our revolutionary multi-agent platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {highlights.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="highlight-card group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="card-icon mb-6 inline-block p-4 bg-gradient-to-r from-accent/20 to-destructive/20 rounded-2xl group-hover:from-accent/30 group-hover:to-destructive/30 transition-all duration-300">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="card-title text-2xl font-bold mb-4 text-foreground group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="card-description text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">{item.description}</p>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-destructive/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
