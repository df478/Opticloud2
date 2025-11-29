"use client"

export default function ValueProposition() {
  const values = [
    {
      title: "Dual-Agent Experience",
      description: "Phone + web interface for conversational and visual guidance",
    },
    {
      title: "Automates Top Workflows",
      description: "Graduation, admissions, grades, certifications, course search",
    },
    {
      title: "Transparent & Safe",
      description: "Clear decision explanations with intelligent escalation",
    },
    {
      title: "Azure-Powered",
      description: "Built with Azure AI multi-agent orchestration framework",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-primary">Why UniFlow Assist?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">{value.title}</h3>
                <p className="text-muted">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
