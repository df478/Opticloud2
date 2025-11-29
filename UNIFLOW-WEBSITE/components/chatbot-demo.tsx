"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Mic } from "lucide-react"

type Message = {
  id: string
  text: string
  sender: "user" | "agent"
  agentType: "it" | "student" | "admin"
  timestamp: Date
}

type AgentType = "it" | "student" | "admin"

export default function ChatbotDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your UniFlow AI assistant. How can I help you today?",
      sender: "agent",
      agentType: "student",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [currentAgent, setCurrentAgent] = useState<AgentType>("student")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const agentConfig = {
    it: { name: "IT Support", color: "bg-primary", textColor: "text-primary" },
    student: { name: "Student Services", color: "bg-muted", textColor: "text-muted" },
    admin: { name: "Admin", color: "bg-accent", textColor: "text-accent" },
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      agentType: currentAgent,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate agent response
    setTimeout(() => {
      const responses: Record<AgentType, string> = {
        it: "I can help you with that technical issue. Let me access your account details...",
        student: "Great question! Let me look up that information for you.",
        admin: "I'll process that request and route it to the appropriate department.",
      }

      const newAgent = (["it", "student", "admin"] as AgentType[])[Math.floor(Math.random() * 3)]
      setCurrentAgent(newAgent)

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[newAgent],
        sender: "agent",
        agentType: newAgent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, agentMessage])
    }, 500)
  }

  const handleMic = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Simulate voice input
      setTimeout(() => {
        setIsRecording(false)
        setInput("I need help with my class schedule")
      }, 1000)
    }
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg max-w-2xl mx-auto flex flex-col h-96 md:h-[500px]">
      {/* Header */}
      <div className={`${agentConfig[currentAgent].color} text-white px-6 py-4 flex items-center justify-between`}>
        <div>
          <p className="text-sm opacity-90">Chatting with</p>
          <p className="font-bold text-lg">{agentConfig[currentAgent].name}</p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl">
          {currentAgent === "it" ? "🖥️" : currentAgent === "student" ? "📚" : "📋"}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-background">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs rounded-lg px-4 py-2 ${
                msg.sender === "user"
                  ? "bg-accent text-accent-foreground rounded-br-none"
                  : `${agentConfig[msg.agentType].color} text-white rounded-bl-none`
              } animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card px-6 py-4 space-y-3">
        <div className="flex gap-2">
          <button
            onClick={handleMic}
            className={`p-3 rounded-lg transition ${
              isRecording ? "bg-destructive text-white animate-pulse" : "bg-muted hover:bg-muted/80 text-foreground"
            }`}
            title="Voice input"
          >
            <Mic className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message or use the microphone..."
            className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <button
            onClick={handleSend}
            className="p-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition"
            title="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs text-muted-foreground">
          Agent automatically switches based on your question. Try mentioning IT issues, academics, or administrative
          requests.
        </div>
      </div>
    </div>
  )
}
