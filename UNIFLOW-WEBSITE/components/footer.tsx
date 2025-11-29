"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-2">UniFlow Assist</h3>
            <p className="text-primary-foreground/80 max-w-sm">
              Transforming academic support with intelligent, conversational AI.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="hover:text-accent transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#technology" className="hover:text-accent transition">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-primary-foreground/60">© 2025 UniFlow Assist. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-accent transition">
              Privacy
            </Link>
            <Link href="#" className="hover:text-accent transition">
              Terms
            </Link>
            <Link href="mailto:contact@uniflow.ai" className="hover:text-accent transition">
              contact@uniflow.ai
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
