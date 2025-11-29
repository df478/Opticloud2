"use client"

export default function HowItWorks() {
  const steps = [
    "User request (voice or web)",
    "Agent understands & fills details",
    "Knowledge search + automation",
    "Executes safe action",
    "Escalates when needed",
    "Explains every step",
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-primary">How It Works</h2>
        <p className="text-muted mb-12 max-w-2xl">Multi-agent orchestration for seamless academic support</p>

        <div className="grid md:grid-cols-6 gap-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="bg-card border-2 border-primary rounded-lg p-6 text-center">
                <div className="inline-block w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold mb-4">
                  {idx + 1}
                </div>
                <p className="text-sm font-medium text-primary">{step}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <div className="w-4 h-0.5 bg-accent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
