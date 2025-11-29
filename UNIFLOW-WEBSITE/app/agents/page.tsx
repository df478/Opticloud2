"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Brain, Headset, Shield } from "lucide-react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Agents() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure page starts at top
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(".agents-hero h1", {
        y: 50,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out"
      })

      gsap.fromTo(".agents-hero p", {
        y: 30,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out"
      })

      // Agent cards animation
      gsap.fromTo(".agent-cards > *", {
        y: 60,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 0.6,
        stagger: 0.2,
        ease: "power2.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])
  const agents = [
    {
      name: "IT Support Agent",
      icon: Headset,
      color: "from-primary to-destructive",
      description: "Handles technical support and infrastructure issues",
      tasks: [
        "Password reset and account management",
        "Software installation and access provisioning",
        "VPN and network troubleshooting",
        "Device setup and configuration",
        "License and IT policy questions",
      ],
    },
    {
      name: "Student Services Agent",
      icon: Brain,
      color: "from-muted to-accent",
      description: "Provides academic and administrative guidance",
      tasks: [
        "Course enrollment and schedule planning",
        "Graduation requirements and checklists",
        "Campus resources and facilities information",
        "Financial aid and scholarship guidance",
        "Transcript and records requests",
      ],
    },
    {
      name: "Administrative Agent",
      icon: Shield,
      color: "from-accent to-secondary",
      description: "Manages workflows and complex requests",
      tasks: [
        "Request escalation and routing",
        "Multi-step workflow automation",
        "Policy and compliance verification",
        "Cross-departmental coordination",
        "Exception handling and special cases",
      ],
    },
  ]

  return (
    <main ref={containerRef} className="w-full overflow-hidden">
      <Header />

      <section className="agents-hero pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Meet Our Agents</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            Specialized AI agents working in harmony to solve any university support challenge
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="agent-cards grid md:grid-cols-3 gap-8">
            {agents.map((agent, idx) => {
              const Icon = agent.icon
              return (
                <div
                  key={idx}
                  className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
                >
                  <div className={`h-32 bg-gradient-to-r ${agent.color}`}></div>

                  <div className="p-8 -mt-8 relative">
                    <div className="bg-card rounded-full w-16 h-16 flex items-center justify-center mb-4 border-4 border-background">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>

                    <h3 className="text-2xl font-bold mb-2 text-foreground">{agent.name}</h3>
                    <p className="text-muted-foreground mb-6">{agent.description}</p>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground mb-3">Handles:</p>
                      {agent.tasks.map((task, tidx) => (
                        <div key={tidx} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="text-accent">•</span>
                          {task}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
