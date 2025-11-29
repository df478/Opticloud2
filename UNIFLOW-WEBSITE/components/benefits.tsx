"use client"

export default function Benefits() {
  const benefits = [
    {
      category: "For Students",
      items: ["Instant answers 24/7", "Less stress & uncertainty", "Clear next steps"],
    },
    {
      category: "For Staff",
      items: ["Fewer repetitive tickets", "Reduced burnout", "Time for complex issues"],
    },
    {
      category: "For University",
      items: ["Lower operational costs", "Scalable during enrollment", "Better satisfaction"],
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Benefits Across Campus</h2>
        <p className="text-center text-primary-foreground/80 mb-12 max-w-2xl mx-auto">
          Transforming academic support for everyone
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-card text-card-foreground rounded-xl p-8 border border-muted/20">
              <h3 className="text-xl font-bold text-primary mb-6">{benefit.category}</h3>
              <ul className="space-y-4">
                {benefit.items.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
