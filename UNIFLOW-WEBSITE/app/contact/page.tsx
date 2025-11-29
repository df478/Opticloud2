"use client"

import type React from "react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Mail, Phone, MapPin } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    email: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Ensure page starts at top
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(".contact-hero h1", {
        y: 50,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out"
      })

      gsap.fromTo(".contact-hero p", {
        y: 30,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out"
      })

      // Contact cards animation
      gsap.fromTo(".contact-cards > *", {
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

      // Contact form animation
      gsap.fromTo(".contact-form", {
        y: 60,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        delay: 1.0,
        ease: "power2.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: "", institution: "", email: "", message: "" })
  }

  return (
    <main ref={containerRef} className="w-full overflow-hidden">
      <Header />

      <section className="contact-hero pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Get in Touch</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            Have questions about UniFlow AI? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto contact-cards grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Mail,
              title: "Email",
              value: "contact@uniflow.ai",
              href: "mailto:contact@uniflow.ai",
            },
            {
              icon: Phone,
              title: "Phone",
              value: "+1 (555) 123-4567",
              href: "tel:+15551234567",
            },
            {
              icon: MapPin,
              title: "Location",
              value: "San Francisco, CA",
              href: "#",
            },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <a
                key={idx}
                href={item.href}
                className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow text-center"
              >
                <div className="inline-block p-3 bg-accent/10 rounded-lg mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.value}</p>
              </a>
            )
          })}
        </div>

        <div className="contact-form bg-card rounded-2xl p-8 border border-border max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Send us a Message</h2>

          {submitted && (
            <div className="mb-6 p-4 bg-accent/10 border border-accent rounded-lg">
              <p className="text-accent font-semibold">Thank you! Your message has been sent.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Institution</label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                required
                className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your university or college"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                placeholder="Tell us about your needs..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
