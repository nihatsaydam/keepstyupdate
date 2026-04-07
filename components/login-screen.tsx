"use client"

import { useState } from "react"
import Image from "next/image"
import { DoorOpen, User, ArrowRight } from "lucide-react"

interface LoginScreenProps {
  onLogin: (room: string, name: string) => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [room, setRoom] = useState("")
  const [name, setName] = useState("")
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (room && name) {
      onLogin(room, name)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top section with gradient and mascot */}
      <div
        className="relative flex-shrink-0 flex items-center justify-center pt-16 pb-8"
        style={{
          background:
            "linear-gradient(135deg, #c8e6e7 0%, #f5eede 40%, #e8cbb8 100%)",
        }}
      >
        <div className="relative">
          <Image
            src="/images/mascot.png"
            alt="Hotel mascot"
            width={180}
            height={180}
            className="drop-shadow-lg"
            priority
          />
        </div>
      </div>

      {/* Login form */}
      <div className="flex-1 -mt-6 relative">
        <div className="bg-card rounded-t-3xl px-6 pt-8 pb-12 min-h-full shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
          <div className="max-w-sm mx-auto">
            <h1 className="text-2xl font-bold text-foreground">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Sign in to access your hotel services
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              {/* Room Number */}
              <div className="relative">
                <label
                  htmlFor="room"
                  className="text-xs font-medium text-muted-foreground mb-1.5 block"
                >
                  Room Number
                </label>
                <div
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                    focused === "room"
                      ? "border-hotel-teal bg-hotel-teal/5"
                      : "border-border bg-secondary/50"
                  }`}
                >
                  <DoorOpen
                    className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      focused === "room"
                        ? "text-hotel-teal"
                        : "text-muted-foreground"
                    }`}
                  />
                  <input
                    id="room"
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    onFocus={() => setFocused("room")}
                    onBlur={() => setFocused(null)}
                    placeholder="e.g. 101"
                    className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 text-sm outline-none"
                  />
                </div>
              </div>

              {/* Full Name */}
              <div className="relative">
                <label
                  htmlFor="name"
                  className="text-xs font-medium text-muted-foreground mb-1.5 block"
                >
                  Full Name
                </label>
                <div
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                    focused === "name"
                      ? "border-hotel-teal bg-hotel-teal/5"
                      : "border-border bg-secondary/50"
                  }`}
                >
                  <User
                    className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      focused === "name"
                        ? "text-hotel-teal"
                        : "text-muted-foreground"
                    }`}
                  />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="Your full name"
                    className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 text-sm outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!room || !name}
                className="mt-2 flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: room && name ? "#99d3d5" : "#ccc",
                  color: room && name ? "#1a3a3b" : "#888",
                }}
              >
                Sign In
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="text-xs text-center text-muted-foreground mt-6">
              Need help? Contact the front desk
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
