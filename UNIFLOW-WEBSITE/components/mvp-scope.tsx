"use client"

export default function MVPScope() {
  const scope = [
    "Graduation guide automation",
    "Admissions & onboarding Q&A",
    "Certification retrieval",
    "Grade lookup",
    "Course catalog search",
    "Dual agent simulation (voice + web)",
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-xl p-8 border border-muted/20">
          <h2 className="text-3xl font-bold text-primary mb-2">MVP Scope</h2>
          <p className="text-muted mb-8">What's included in this initial release</p>

          <div className="grid md:grid-cols-2 gap-4">
            {scope.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-accent-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-primary">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
