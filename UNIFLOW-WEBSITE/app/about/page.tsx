"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { CheckCircle2 } from "lucide-react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure page starts at top
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(".about-hero h1", {
        y: 50,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out"
      })

      gsap.fromTo(".about-hero p", {
        y: 30,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out"
      })

      // Problem section animation
      gsap.fromTo(".about-problem h2", {
        y: 40,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 0.6,
        ease: "power2.out"
      })

      gsap.fromTo(".about-problem p", {
        y: 20,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        delay: 0.7,
        ease: "power2.out"
      })

      gsap.fromTo(".about-problem li", {
        x: -30,
        autoAlpha: 0
      }, {
        x: 0,
        autoAlpha: 1,
        duration: 0.6,
        delay: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      })

      // Solution section animation
      gsap.fromTo(".about-solution h2", {
        y: 40,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 1.2,
        ease: "power2.out"
      })

      gsap.fromTo(".about-solution p", {
        y: 20,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        delay: 1.3,
        ease: "power2.out"
      })

      gsap.fromTo(".about-solution li", {
        x: -30,
        autoAlpha: 0
      }, {
        x: 0,
        autoAlpha: 1,
        duration: 0.6,
        delay: 1.4,
        stagger: 0.1,
        ease: "power2.out"
      })

      // Why different section animation
      gsap.fromTo(".about-different h2", {
        y: 40,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 1.8,
        ease: "power2.out"
      })

      gsap.fromTo(".about-different .grid > *", {
        y: 60,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 1.9,
        stagger: 0.2,
        ease: "power2.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])
  return (
    <main ref={containerRef} className="w-full overflow-hidden">
      <Header />

      <section className="about-hero pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">About UniFlow AI</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            Transforming how universities support their students with intelligent automation
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="about-problem">
            <h2 className="text-3xl font-bold mb-6 text-foreground">The Problem</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Universities are drowning in repetitive support requests. Students wait hours or days for:
            </p>
            <ul className="space-y-3">
              {[
                "Password resets and account access issues",
                "Course enrollment and registration questions",
                "Graduation requirement clarifications",
                "Campus resource and facility inquiries",
                "Administrative documentation requests",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-solution">
            <h2 className="text-3xl font-bold mb-6 text-foreground">The Solution</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              UniFlow AI deploys intelligent agents that:
            </p>
            <ul className="space-y-3">
              {[
                "Understand context and route to the right specialist",
                "Work 24/7 without human intervention",
                "Learn from interactions to improve continuously",
                "Provide voice and visual support options",
                "Integrate with existing university systems",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-different">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Why UniFlow AI is Different</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Multi-Agent Architecture",
                  desc: "Specialized agents for IT, academics, and administration work together seamlessly",
                },
                {
                  title: "University-First Design",
                  desc: "Built specifically for university workflows and student needs",
                },
                {
                  title: "Voice & Visual",
                  desc: "Students can choose their preferred interface - chat, voice, or visual",
                },
                {
                  title: "Privacy & Security",
                  desc: "Enterprise-grade security with full compliance to educational standards",
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-bold text-lg mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
