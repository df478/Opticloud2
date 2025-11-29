"use client"

import { useRef, useEffect } from 'react'
import { Mic, MicOff, Trash2, BarChart3, Send } from 'lucide-react'
interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  agent?: string
  type?: "text" | "suggestions" | "rich"
  richContent?: {
    buttons?: { label: string; action: string }[]
    cards?: { title: string; description: string; color: string }[]
  }
}

interface Scenario {
  id: string
  name: string
  description: string
  is_graph_scenario?: boolean
  generated_from_graph?: boolean
}

interface Props {
  messages: Message[]
  recording: boolean
  connected: boolean
  canAnalyze: boolean
  onToggleRecording: () => void
  onClear: () => void
  onAnalyze: () => void
  scenario?: Scenario | null
  isTyping?: boolean
  emoji?: string
  input: string
  onInputChange: (value: string) => void
  onSendMessage: () => void
}

export function ChatPanel({
  messages,
  recording,
  connected: _connected,
  canAnalyze,
  onToggleRecording,
  onClear,
  onAnalyze,
  scenario,
  isTyping = false,
  emoji = '🤖',
  input,
  onInputChange,
  onSendMessage,
}: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom - DISABLED per user request
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  // }, [messages, isTyping])

  return (
    <>
      <div className="h-96 overflow-y-auto px-8 py-6 space-y-4 bg-background/50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <p className="font-semibold">Get started</p>
              <p className="text-sm">Click "Start Recording" to begin the conversation.</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  {msg.sender === 'bot' && (
                    <div className="mr-3 flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                        {emoji}
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-accent text-accent-foreground rounded-br-none'
                        : 'bg-card text-foreground border border-border rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="mr-3 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                    {emoji}
                  </div>
                </div>
                <div className="bg-card text-foreground border border-border px-4 py-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                    <div
                      className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-8 py-4 bg-card border-t border-border flex gap-3 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            console.log('Input changed to:', e.target.value); // Debug log
            onInputChange(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              console.log('Enter pressed, input:', input); // Debug log
              onSendMessage()
            }
          }}
          placeholder="Type your question... (Press Enter to send)"
          className="flex-1 bg-background border border-border rounded-full px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
        />
        <button
          className={`p-3 rounded-full transition transform cursor-pointer ${
            recording
              ? 'bg-accent text-white scale-105 shadow-lg'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
          onClick={onToggleRecording}
        >
          {recording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <button
          className="p-3 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition cursor-pointer"
          onClick={onClear}
        >
          <Trash2 className="w-5 h-5" />
        </button>

        <button
          className={`p-3 rounded-full font-medium transition cursor-pointer ${
            canAnalyze
              ? 'bg-accent text-white hover:bg-accent/90'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
          onClick={onAnalyze}
          disabled={!canAnalyze}
        >
          <BarChart3 className="w-5 h-5" />
        </button>

        <button
          onClick={() => {
            console.log('Send button clicked, input:', input); // Debug log
            onSendMessage();
          }}
          className="p-3 rounded-full bg-accent hover:bg-accent/90 text-white transition cursor-pointer"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </>
  )
}
