"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, Info } from "lucide-react";
import { VideoPanel } from "./VideoPanel";
import { useWebRTC } from "../hooks/useWebRTC";
import { useRealtime } from "../hooks/useRealtime";
import { AssessmentPanel } from "../components/AssessmentPanel";
import { useScenarios } from "../hooks/useScenarios";
import { useRecorder } from "../hooks/useRecorder";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { api } from "../services/api";
import { Assessment } from "../types";
import { ChatPanel } from "./ChatPanel";

type AgentType = "it" | "administrative" | "student" | "other";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  agent?: AgentType;
  type?: "text" | "suggestions" | "rich";
  richContent?: {
    buttons?: { label: string; action: string }[];
    cards?: { title: string; description: string; color: string }[];
  };
}

const agentConfig = {
  it: {
    name: "IT Support",
    color: "#2b2d42",
    accentColor: "#d90429",
    textColor: "#edf2f4",
    emoji: "🤖",
    description: "Tech support assistant",
  },
  administrative: {
    name: "Administrative Support",
    color: "#8d99ae",
    accentColor: "#2b2d42",
    textColor: "#ffffff",
    emoji: "📄",
    description: "Admissions guidance",
  },
  student: {
    name: "Student Services",
    color: "#ef233c",
    accentColor: "#d90429",
    textColor: "#ffffff",
    emoji: "🎓",
    description: "Certificates & docs",
  },
  other: {
    name: "Other",
    color: "#2b2d42",
    accentColor: "#d90429",
    textColor: "#edf2f4",
    emoji: "🤖",
    description: "Another Support",
  },
};

const suggestedPromptsByAgent: Record<AgentType, string[]> = {
  it: [
    "How do I reset my university password?",
    "I need help setting up 2FA",
    "My internet connection is slow",
    "How do I install university software?",
  ],
  administrative: [
    "How do I apply for admissions?",
    "What are the admission requirements?",
    "When are the application deadlines?",
    "What documents do I need to submit?",
  ],
  student: [
    "Where can I download my certificate?",
    "How do I request a transcript?",
    "When will I receive my diploma?",
    "How do I access my student records?",
  ],
  other: [
    "I have a general question",
    "Can you help me find information?",
    "I need assistance with something else",
    "How do I contact support?",
  ],
};

export default function ChatbotDemoFull() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! 👋 I'm your friendly assistant at MultiFlow AI. I'm here to help you with anything you need. What can I assist you with today?",
      sender: "bot",
      type: "suggestions",
    },
  ]);
  const [input, setInput] = useState("");
  const [activeAgent, setActiveAgent] = useState<AgentType>("it");
  const [isListening, setIsListening] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onstart = () => setIsListening(true);
        recognitionRef.current.onend = () => setIsListening(false);

        recognitionRef.current.onresult = (event: any) => {
          const interimTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              setInput(transcript);
              handleSendMessage(transcript);
            }
          }
        };
      }
    }
  }, []);

  const handleMicClick = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    }
  };

  const getAgentResponse = (userMessage: string, agent: AgentType): string => {
    const responses: Record<AgentType, Record<string, string>> = {
      it: {
        password:
          "You can reset your password by visiting the IT portal and clicking 'Forgot Password'. We'll send a reset link to your registered email.",
        "2fa":
          "Two-factor authentication can be set up in your account settings. We recommend enabling it for security.",
        network:
          "For network issues, check your connection and restart your router. If problems persist, contact IT support at support@university.edu",
        default:
          "I can help with IT-related questions. Try asking about password resets, 2FA, network issues, or software.",
      },
      administrative: {
        apply:
          "To apply for admissions, visit our applications portal and complete the required forms. You'll need your academic transcripts and test scores.",
        requirements:
          "Our admissions requirements include: completed application, transcripts, test scores, and a personal statement.",
        deadline:
          "Application deadlines vary by program. Spring applications close January 15th, Fall applications close August 1st.",
        default:
          "I can help with admissions questions. Ask me about application requirements, deadlines, or documents needed.",
      },
      student: {
        certificate:
          "You can download your completion certificates from your student portal under 'Credentials'. Certificates are generated within 2 business days after course completion.",
        transcript:
          "Official transcripts can be requested through the registrar's office. Processing takes 3-5 business days.",
        degree:
          "Your degree diploma will be mailed to your address on file after graduation. Allow 4-6 weeks for delivery.",
        default:
          "I can help with documentation requests. Ask about certificates, transcripts, diplomas, or other credentials.",
      },
      other: {
        default:
          "I can help with general questions. Please specify what you need assistance with.",
      },
    };

    const agentResponses = responses[agent];
    if (userMessage.toLowerCase().includes("password"))
      return agentResponses.password || agentResponses.default;
    if (userMessage.toLowerCase().includes("2fa"))
      return agentResponses["2fa"] || agentResponses.default;
    if (userMessage.toLowerCase().includes("apply"))
      return agentResponses.apply || agentResponses.default;
    if (userMessage.toLowerCase().includes("certificate"))
      return agentResponses.certificate || agentResponses.default;
    if (userMessage.toLowerCase().includes("transcript"))
      return agentResponses.transcript || agentResponses.default;

    return agentResponses.default;
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || input.trim();
    console.log('Sending message:', messageText); // Debug log
    if (!messageText) {
      console.log('Empty message, not sending'); // Debug log
      return;
    }

    // Detect agent from message keywords
    let detectedAgent = activeAgent;
    if (
      messageText.toLowerCase().includes("apply") ||
      messageText.toLowerCase().includes("admission")
    ) {
      detectedAgent = "administrative";
    } else if (
      messageText.toLowerCase().includes("certificate") ||
      messageText.toLowerCase().includes("transcript")
    ) {
      detectedAgent = "student";
    }

    setActiveAgent(detectedAgent);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    console.log('Input cleared, messages updated'); // Debug log
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAgentResponse(messageText, detectedAgent),
        sender: "bot",
        agent: detectedAgent,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const currentConfig = agentConfig[activeAgent];

  // Create agent when activeAgent changes
  useEffect(() => {
    const createAgentForActiveAgent = async () => {
      if (!activeAgent) return;

      try {
        // Assume scenario ID matches activeAgent key
        const { agent_id } = await api.createAgent(activeAgent);
        setCurrentAgent(agent_id);
        // Clear messages when switching agents
        setMessages([
          {
            id: "1",
            text: "Welcome to MultiFlow AI! I'm your intelligent assistant. Choose what you need help with below or type your question.",
            sender: "bot",
            type: "suggestions",
          },
        ]);
        setIsTyping(false);
      } catch (error) {
        console.error("Failed to create agent:", error);
      }
    };

    createAgentForActiveAgent();
  }, [activeAgent]);

  // const { connected, messages, send, clearMessages, getRecordings } =
  //   useRealtime({
  //     agentId: currentAgent,
  //     onMessage: handleWebRTCMessage,
  //     onAudioDelta: playAudio,
  //   })
  // const sendOffer = useCallback(
  //   (sdp: string) => {
  //     send({ type: 'session.avatar.connect', client_sdp: sdp })
  //   },
  //   [send]
  // )
  // const { setupWebRTC, handleAnswer, videoRef } = useWebRTC(sendOffer);

  // Agents handling
  const { scenarios, selectedScenario, setSelectedScenario, loading } =
    useScenarios();
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [showSetup, setShowSetup] = useState(true);
  const handleStart = async () => {
    if (!selectedScenario) return;

    try {
      const { agent_id } = await api.createAgent(selectedScenario);
      setCurrentAgent(agent_id);
      setShowSetup(false);
    } catch (error) {
      console.error("Failed to create agent:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Security Modal */}
      {showSecurityModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl p-8 max-w-sm shadow-2xl border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Security & Transparency
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground mb-6">
              <li className="flex gap-2">
                <span className="text-accent">✓</span>
                <span>Secure and privacy-focused</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✓</span>
                <span>Transparent AI behaviors</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✓</span>
                <span>Data is not used for training</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✓</span>
                <span>Follows safe university guidelines</span>
              </li>
            </ul>
            <button
              onClick={() => setShowSecurityModal(false)}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-2 rounded-lg font-medium transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Main Chat Container */}
      <div
        className="rounded-3xl shadow-2xl overflow-hidden border border-border"
        style={{
          background: `linear-gradient(135deg, ${currentConfig.color}15 0%, ${currentConfig.accentColor}08 100%)`,
        }}
      >
        {/* Header */}
        <div
          className="px-8 py-6 flex items-center justify-between text-white"
          style={{ backgroundColor: currentConfig.color }}
        >
          <div className="flex items-center gap-3">
            <div className="text-3xl">{currentConfig.emoji}</div>
            <div>
              <h2 className="font-bold text-lg">{currentConfig.name}</h2>
              <p className="text-sm opacity-90">{currentConfig.description}</p>
            </div>
          </div>
          <button
            onClick={() => setShowSecurityModal(true)}
            className="hover:bg-white/20 p-2 rounded-full transition"
          >
            <Info size={20} />
          </button>
        </div>

        {/* Agent Selector */}
        <div className="px-8 py-4 bg-card border-b border-border flex gap-3 flex-wrap">
          {(
            Object.entries(agentConfig) as [AgentType, typeof agentConfig.it][]
          ).map(([agent, config]) => (
            <button
              key={agent}
              onClick={() => setActiveAgent(agent)}
              className={`px-4 py-2 rounded-full font-medium transition transform ${
                activeAgent === agent
                  ? "text-white scale-105 shadow-lg"
                  : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
              }`}
              style={
                activeAgent === agent
                  ? {
                      backgroundColor: config.color,
                      color: config.textColor,
                    }
                  : {}
              }
            >
              {config.name}
            </button>
          ))}
        </div>

        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <div className="px-8 py-4 border-t border-border bg-background/50">
            <p className="text-sm font-medium text-muted-foreground mb-3">
              Suggested questions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestedPromptsByAgent[activeAgent].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestedPrompt(prompt)}
                  className="text-left px-4 py-2 rounded-lg bg-card border border-border hover:border-accent hover:bg-accent/5 transition text-sm text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* <VideoPanel videoRef={} /> */}
        <ChatPanel
          messages={messages}
          recording={isListening}
          connected={true}
          canAnalyze={messages.length > 0}
          onToggleRecording={handleMicClick}
          onClear={() => setMessages([])}
          onAnalyze={() => console.log("Analyze")}
          isTyping={isTyping}
          emoji={currentConfig.emoji}
          input={input}
          onInputChange={setInput}
          onSendMessage={handleSendMessage}
        />
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          This is a demo chatbot showcasing MultiFlow AI capabilities. All
          responses are simulated.
        </p>
      </div>
    </div>
  );
}
