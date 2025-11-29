"use client"

export default function Technology() {
  const techs = [
    { name: "Azure OpenAI", emoji: "🤖" },
    { name: "Azure Speech", emoji: "🎤" },
    { name: "Azure Functions", emoji: "⚙️" },
    { name: "Multi-Agent Orchestration", emoji: "🔗" },
    { name: "University Systems Integration", emoji: "🏫" },
  ]

  return (
    <section id="technology" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-primary">Powered By</h2>
        <p className="text-muted mb-12">Enterprise-grade Azure infrastructure for academic support</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {techs.map((tech, idx) => (
            <div
              key={idx}
              className="bg-card rounded-lg p-6 border border-muted/20 flex items-center gap-4 hover:shadow-lg transition"
            >
              <span className="text-4xl">{tech.emoji}</span>
              <span className="font-semibold text-primary">{tech.name}</span>
            </div>
          ))}
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-xl p-8">
          <p className="text-primary leading-relaxed">
            <span className="font-semibold">UniFlow Assist uses Azure multi-agent frameworks</span> to deliver accurate,
            transparent, and scalable academic support. Our orchestration layer manages complex workflows, ensures data
            integrity, and safely escalates to human staff when needed.
          </p>
        </div>
      </div>
    </section>
  )
}
