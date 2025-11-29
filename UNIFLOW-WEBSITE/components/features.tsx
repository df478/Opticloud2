"use client"

import { GraduationCap, Users, BookOpen, BarChart3, FileText, Radio } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: GraduationCap,
      title: "Graduation Assistant",
      description: "Helps students understand steps, documents, and deadlines.",
    },
    {
      icon: Users,
      title: "Admissions & Enrollment Helper",
      description: "Answers onboarding questions and guides international students.",
    },
    {
      icon: BookOpen,
      title: "Course Catalog Navigator",
      description: "Searches programs, schedules, and availability.",
    },
    {
      icon: BarChart3,
      title: "Grades & Academic History",
      description: "Retrieves grades, GPA, and academic status instantly.",
    },
    {
      icon: FileText,
      title: "Certification Downloads",
      description: "Auto-generates enrollment certificates and status letters.",
    },
    {
      icon: Radio,
      title: "Dual-Agent System",
      description: "Phone agent for voice + visual agent for documents.",
    },
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-primary">Key Features</h2>
        <p className="text-muted mb-12 max-w-2xl">Comprehensive academic support across all student needs</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="bg-card rounded-xl p-6 border border-muted/20 hover:shadow-lg hover:border-muted/40 transition"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg text-primary mb-2">{feature.title}</h3>
                <p className="text-muted text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
