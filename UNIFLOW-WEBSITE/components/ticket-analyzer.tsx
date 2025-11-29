"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

export default function TicketAnalyzer() {
  const [ticket, setTicket] = useState("I can't log into my email and need to reset my password")
  const [category, setCategory] = useState<string | null>(null)

  const categories = {
    it: { name: "IT Support", color: "bg-primary", icon: "🖥️" },
    academic: { name: "Student Services", color: "bg-muted", icon: "📚" },
    admin: { name: "Administrative", color: "bg-accent", icon: "📋" },
  }

  const handleAnalyze = () => {
    const tickets = [
      { keyword: "password", cat: "it" },
      { keyword: "email", cat: "it" },
      { keyword: "login", cat: "it" },
      { keyword: "course", cat: "academic" },
      { keyword: "grade", cat: "academic" },
      { keyword: "graduation", cat: "academic" },
      { keyword: "enrollment", cat: "academic" },
      { keyword: "request", cat: "admin" },
      { keyword: "escalate", cat: "admin" },
    ]

    const detected = tickets.find((t) => ticket.toLowerCase().includes(t.keyword))
    setCategory(detected?.cat || "admin")
  }

  return (
    <div className="space-y-8">
      <div className="bg-background rounded-2xl p-8 border-2 border-border">
        <label className="block text-sm font-semibold text-foreground mb-3">Enter a Support Ticket</label>
        <textarea
          value={ticket}
          onChange={(e) => setTicket(e.target.value)}
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          rows={4}
          placeholder="Describe the support request..."
        ></textarea>

        <button
          onClick={handleAnalyze}
          className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
        >
          Analyze Ticket <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {category && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-card rounded-2xl p-8 border-2 border-accent">
            <p className="text-sm text-muted-foreground mb-4">Detected Category:</p>
            <div className="flex items-center gap-4">
              <div
                className={`${categories[category as keyof typeof categories].color} text-white w-16 h-16 rounded-lg flex items-center justify-center text-2xl`}
              >
                {categories[category as keyof typeof categories].icon}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Route to:</p>
                <p className="text-2xl font-bold text-foreground">
                  {categories[category as keyof typeof categories].name} Agent
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
