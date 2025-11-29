"use client"

import { useState } from "react"
import Link from "next/link"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-primary text-primary-foreground z-50 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl hover:text-accent transition">
          UniFlow AI
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <Link href="/product" className="hover:text-accent transition">
            Product
          </Link>
          <Link href="/chatbot-demo" className="hover:text-accent transition">
            Chatbot Demo
          </Link>
          <Link href="/agents" className="hover:text-accent transition">
            Agents
          </Link>
          <Link href="/about" className="hover:text-accent transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-accent transition">
            Contact
          </Link>
          <Link
            href="http://localhost:80"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 rounded-full transition"
          >
            Try Demo
          </Link>
          <Link
            href="http://localhost:8765"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 rounded-full transition"
          >
            Check RAG!
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-primary/95 border-t border-muted px-4 py-4 space-y-4">
          <Link href="/product" className="block hover:text-accent transition">
            Product
          </Link>
          <Link href="/chatbot-demo" className="block hover:text-accent transition">
            Chatbot Demo
          </Link>
          <Link href="/agents" className="block hover:text-accent transition">
            Agents
          </Link>
          <Link href="/about" className="block hover:text-accent transition">
            About
          </Link>
          <Link href="/contact" className="block hover:text-accent transition">
            Contact
          </Link>
          <Link
            href="/chatbot-demo"
            className="block w-full bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 rounded-full transition text-center"
          >
            Try Demo
          </Link>
        </div>
      )}
    </header>
  )
}
