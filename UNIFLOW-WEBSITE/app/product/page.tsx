"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import TicketAnalyzer from "@/components/ticket-analyzer"
import ChatbotDemo from "@/components/chatbot-demo"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Product() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure page starts at top
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(".product-hero h1", {
        y: 50,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out"
      })

      gsap.fromTo(".product-hero p", {
        y: 30,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out"
      })

      // Module 1 animation
      gsap.fromTo(".module-1 .module-badge", {
        y: 30,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        delay: 0.5,
        ease: "power2.out"
      })

      gsap.fromTo(".module-1 h2", {
        y: 40,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 0.6,
        ease: "power2.out"
      })

      gsap.fromTo(".module-1 p", {
        y: 20,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        delay: 0.7,
        ease: "power2.out"
      })

      gsap.fromTo(".module-1 .grid > *", {
        y: 60,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      })

      // Module 2 animation
      gsap.fromTo(".module-2 .module-badge", {
        y: 30,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        delay: 1.2,
        ease: "power2.out"
      })

      gsap.fromTo(".module-2 h2", {
        y: 40,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 1.3,
        ease: "power2.out"
      })

      gsap.fromTo(".module-2 p", {
        y: 20,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        delay: 1.4,
        ease: "power2.out"
      })

      gsap.fromTo(".module-2 .ticket-analyzer", {
        y: 60,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        delay: 1.5,
        ease: "power2.out"
      })

      // Module 3 animation
      gsap.fromTo(".module-3 .module-badge", {
        y: 30,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        delay: 1.8,
        ease: "power2.out"
      })

      gsap.fromTo(".module-3 h2", {
        y: 40,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 1.9,
        ease: "power2.out"
      })

      gsap.fromTo(".module-3 p", {
        y: 20,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        delay: 2.0,
        ease: "power2.out"
      })

      gsap.fromTo(".module-3 .chatbot-demo", {
        y: 60,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        delay: 2.1,
        ease: "power2.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])
  return (
    <main ref={containerRef} className="w-full overflow-hidden">
      <Header />

      <section className="product-hero pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Our MVP Platform</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            Three powerful modules working together to transform university support services
          </p>
        </div>
      </section>

      {/* Module 1: Agent Pipelines */}
      <section className="module-1 py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="module-badge inline-block bg-accent/20 px-4 py-2 rounded-full mb-4">
              <span className="text-accent font-semibold">Module 1</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-foreground">Agent Pipelines</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Automated workflows that intelligently route requests through specialized AI agents
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                  IT
                </div>
                <h3 className="text-2xl font-bold text-foreground">IT Helpdesk</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-accent">→</span> Password resets
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">→</span> Software access provisioning
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">→</span> Basic troubleshooting
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">→</span> Account management
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-primary font-bold">
                  EDU
                </div>
                <h3 className="text-2xl font-bold text-foreground">Student Services</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-accent">→</span> Class information & enrollment
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">→</span> Campus resources & FAQs
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">→</span> Graduation requirements
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">→</span> Academic planning assistance
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Module 2: Ticket Analyzer */}
      <section className="module-2 py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="module-badge inline-block bg-accent/20 px-4 py-2 rounded-full mb-4">
              <span className="text-accent font-semibold">Module 2</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-foreground">Ticket Analyzer</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Intelligent categorization system that routes support tickets to the right agent
            </p>
          </div>
          <div className="ticket-analyzer">
            <TicketAnalyzer />
          </div>
        </div>
      </section>

      {/* Module 3: Chatbot Demo */}
      <section id="chatbot-demo" className="module-3 py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="module-badge inline-block bg-accent/20 px-4 py-2 rounded-full mb-4">
              <span className="text-accent font-semibold">Module 3</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-foreground">Multi-Agent Chatbot</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Experience our AI agents in action with voice and text interfaces
            </p>
          </div>
          <div className="chatbot-demo">
            <ChatbotDemo />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
