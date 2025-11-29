"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ChatbotDemoComponent from "@/components/chatbot-demo-full"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function ChatbotDemoPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure page starts at top
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(".demo-title", {
        y: 50,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out"
      })

      // Description animation
      gsap.fromTo(".demo-description", {
        y: 30,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out"
      })

      // Demo component animation
      gsap.fromTo(".demo-component", {
        y: 60,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        delay: 0.4,
        ease: "power2.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])
  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="demo-title text-4xl md:text-5xl font-bold text-foreground mb-4">Experience MultiFlow AI</h1>
            <p className="demo-description text-lg text-muted-foreground max-w-2xl mx-auto">
              Chat with our intelligent multi-agent assistant. Choose your agent and ask anything about IT support,
              admissions, or documentation.
            </p>
          </div>

          <div className="demo-component">
            <ChatbotDemoComponent />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
