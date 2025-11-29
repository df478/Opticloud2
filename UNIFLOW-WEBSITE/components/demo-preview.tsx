"use client"

export default function DemoPreview() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Experience UniFlow Assist</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Phone Agent */}
          <div className="bg-card text-card-foreground rounded-2xl p-8 shadow-xl">
            <div className="bg-primary text-primary-foreground rounded-t-2xl -m-8 mb-6 p-6">
              <h3 className="font-bold text-lg">📱 Phone Agent Conversation</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm font-medium mb-1">Student:</p>
                <p className="text-sm">"What do I need for graduation?"</p>
              </div>
              <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
                <p className="text-sm font-medium mb-1 text-accent">UniFlow:</p>
                <p className="text-sm">
                  Complete remaining coursework, submit final transcript, pay graduation fees...
                </p>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm font-medium mb-1">Student:</p>
                <p className="text-sm">"Can you show me my completed courses?"</p>
              </div>
              <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
                <p className="text-sm font-medium mb-1 text-accent">UniFlow:</p>
                <p className="text-sm">Opening visual dashboard...</p>
              </div>
            </div>
          </div>

          {/* Visual Agent */}
          <div className="bg-card text-card-foreground rounded-2xl p-8 shadow-xl">
            <div className="bg-accent -m-8 mb-6 p-6 rounded-t-2xl text-accent-foreground">
              <h3 className="font-bold text-lg">🖥️ Visual Agent Display</h3>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-primary">Completed Courses</h4>
                  <span className="text-accent font-bold">32/35</span>
                </div>
                <div className="bg-muted/10 rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full w-11/12"></div>
                </div>
              </div>

              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <p className="text-xs text-muted mb-2">Remaining Requirements</p>
                <ul className="text-sm space-y-1">
                  <li>✓ CS 401 - Capstone</li>
                  <li>✓ MATH 310 - Linear Algebra</li>
                  <li>○ Final Transcript Upload</li>
                </ul>
              </div>

              <button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-2 rounded-lg font-medium transition">
                Download Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
