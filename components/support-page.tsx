"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { PageHeader } from "./page-header"
import { Send, Bot } from "lucide-react"

interface SupportPageProps {
  onBack: () => void
  guestName: string
  roomNumber: string
}

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

const quickReplies = [
  "What time is check-out?",
  "Where is the pool?",
  "How do I order room service?",
  "Wi-Fi password?",
  "Restaurant hours?",
]

function getAIResponse(userMsg: string): string {
  const msg = userMsg.toLowerCase()
  if (msg.includes("check-out") || msg.includes("checkout")) {
    return "Check-out time is at 12:00 PM (noon). If you need a late check-out, please let the front desk know and we'll do our best to accommodate your request, subject to availability. A late check-out fee may apply."
  }
  if (msg.includes("pool") || msg.includes("swim")) {
    return "Our outdoor pool is located on the 3rd floor terrace and is open from 7:00 AM to 10:00 PM daily. Towels are provided at the pool area. We also have a heated indoor pool in the spa area, open 6:00 AM to 11:00 PM."
  }
  if (msg.includes("room service") || msg.includes("food") || msg.includes("order")) {
    return "You can order room service directly from our app! Just go back to the main menu and tap 'Room Service'. Our kitchen is open 24/7 for in-room dining. Breakfast is served from 6:30 AM to 10:30 AM."
  }
  if (msg.includes("wifi") || msg.includes("wi-fi") || msg.includes("internet") || msg.includes("password")) {
    return "The Wi-Fi network is 'HotelGuest'. Your access code is your room number followed by your last name (e.g., 101Smith). If you need help connecting, please call the front desk at extension 0."
  }
  if (msg.includes("restaurant") || msg.includes("dining") || msg.includes("breakfast")) {
    return "Our main restaurant 'The Terrace' is open for:\n- Breakfast: 6:30 AM - 10:30 AM\n- Lunch: 12:00 PM - 3:00 PM\n- Dinner: 6:30 PM - 10:30 PM\n\nWe also have a lobby bar open from 11:00 AM to midnight."
  }
  if (msg.includes("spa") || msg.includes("massage")) {
    return "Our spa is open from 9:00 AM to 9:00 PM daily. You can book treatments directly from our app under 'Spa & Wellness'. We recommend booking in advance as slots fill up quickly!"
  }
  if (msg.includes("gym") || msg.includes("fitness")) {
    return "Our fitness center is located on the 2nd floor and is open 24/7 for hotel guests. We provide fresh towels, bottled water, and complimentary headphones."
  }
  if (msg.includes("parking") || msg.includes("car")) {
    return "We offer both valet parking ($30/night) and self-parking ($20/night) in our underground garage. Your valet can be reached at extension 7. Electric vehicle charging stations are also available."
  }
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello! Welcome to our hotel. I'm your AI concierge assistant. How can I help make your stay more comfortable? Feel free to ask about our amenities, services, dining options, or anything else!"
  }
  return "Thank you for your question! I'd be happy to help. For this specific request, I recommend contacting our front desk directly at extension 0, or I can connect you with our concierge team who will assist you personally. Is there anything else I can help with?"
}

export function SupportPage({ onBack, guestName, roomNumber }: SupportPageProps) {
  const firstName = guestName.split(" ")[0]
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: `Hi ${firstName}! I'm your AI concierge for Room ${roomNumber}. How can I assist you today?`,
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(text)
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        text: response,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 800 + Math.random() * 1200)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader title="Support" subtitle="AI Concierge" onBack={onBack} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 mb-4 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {msg.sender === "ai" && (
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-border">
                <Image
                  src="/images/mascot.png"
                  alt="AI Assistant"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            )}
            <div className={`max-w-[75%] ${msg.sender === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-hotel-teal text-primary-foreground rounded-br-md"
                    : "bg-card border border-border/50 text-foreground rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>
              <p className={`text-[10px] text-muted-foreground mt-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-border">
              <Image
                src="/images/mascot.png"
                alt="AI Assistant"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-card border border-border/50">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies & Input */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card/95 backdrop-blur-xl border-t border-border/50 safe-bottom">
        {/* Quick Replies */}
        {messages.length <= 2 && (
          <div className="px-4 pt-3 pb-1">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  className="px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap bg-secondary text-muted-foreground hover:bg-hotel-teal/10 hover:text-foreground transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3">
          <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary border border-border/50">
            <Bot className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-full bg-hotel-teal flex items-center justify-center active:scale-95 transition-transform disabled:opacity-40"
          >
            <Send className="w-4 h-4 text-primary-foreground" />
          </button>
        </form>
      </div>
    </div>
  )
}
