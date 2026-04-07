"use client"

import { useState } from "react"
import { PageHeader } from "./page-header"
import { Luggage, Minus, Plus, CheckCircle2, Clock, MapPin } from "lucide-react"

interface BellboyPageProps {
  onBack: () => void
  roomNumber: string
  guestName: string
}

export function BellboyPage({ onBack, roomNumber, guestName }: BellboyPageProps) {
  const [luggageCount, setLuggageCount] = useState(1)
  const [pickupTime, setPickupTime] = useState("")
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="Bellboy" onBack={() => { setSubmitted(false); onBack() }} />
        <div className="flex flex-col items-center justify-center px-6 pt-24">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#99d3d515' }}>
            <CheckCircle2 className="w-10 h-10 text-hotel-teal" />
          </div>
          <h2 className="text-xl font-bold text-foreground text-center">Check-out Request Sent</h2>
          <p className="text-sm text-muted-foreground text-center mt-2 max-w-xs">
            Our bellboy will arrive at your room to assist with your luggage.
          </p>
          <div className="mt-6 w-full max-w-xs rounded-xl bg-card border border-border/50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Room</span>
              <span className="font-semibold text-foreground">{roomNumber}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">Guest</span>
              <span className="font-semibold text-foreground">{guestName}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">Luggage</span>
              <span className="font-semibold text-foreground">{luggageCount} {luggageCount === 1 ? "piece" : "pieces"}</span>
            </div>
            {pickupTime && (
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-muted-foreground">Pickup Time</span>
                <span className="font-semibold text-foreground">{pickupTime}</span>
              </div>
            )}
          </div>
          <button
            onClick={() => { setSubmitted(false); setLuggageCount(1); setPickupTime(""); setNotes("") }}
            className="mt-6 px-6 py-3 rounded-xl font-semibold text-sm bg-hotel-teal text-primary-foreground active:scale-95 transition-transform"
          >
            Make Another Request
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <PageHeader title="Bellboy" subtitle="Check-out assistance" onBack={onBack} />

      <div className="px-5 pt-6">
        {/* Illustration */}
        <div className="flex items-center gap-4 p-5 rounded-2xl mb-6" style={{ backgroundColor: '#607d8b10' }}>
          <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#607d8b15' }}>
            <Luggage className="w-7 h-7 text-hotel-slate" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Check-out Service</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Our bellboy will collect your luggage and assist with check-out
            </p>
          </div>
        </div>

        {/* Luggage Count */}
        <label className="text-xs font-medium text-muted-foreground mb-3 block">Number of Luggage</label>
        <div className="flex items-center justify-center gap-6 p-6 rounded-2xl bg-card border border-border/50 shadow-sm mb-6">
          <button
            onClick={() => setLuggageCount(Math.max(1, luggageCount - 1))}
            disabled={luggageCount <= 1}
            className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center active:scale-95 transition-transform disabled:opacity-30"
          >
            <Minus className="w-5 h-5 text-foreground" />
          </button>
          <div className="text-center">
            <span className="text-4xl font-bold text-foreground">{luggageCount}</span>
            <p className="text-xs text-muted-foreground mt-1">{luggageCount === 1 ? "piece" : "pieces"}</p>
          </div>
          <button
            onClick={() => setLuggageCount(Math.min(20, luggageCount + 1))}
            disabled={luggageCount >= 20}
            className="w-12 h-12 rounded-xl bg-hotel-teal flex items-center justify-center active:scale-95 transition-transform disabled:opacity-30"
          >
            <Plus className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        {/* Pickup Time */}
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Preferred Pickup Time</label>
        <div className="flex items-center gap-2 px-3 py-3 rounded-xl border-2 border-border bg-secondary/50 mb-5">
          <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground outline-none"
          />
        </div>

        {/* Lobby or Room */}
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Pickup Location</label>
        <div className="flex items-center gap-2 px-3 py-3 rounded-xl border-2 border-border bg-secondary/50 mb-5">
          <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-sm text-foreground">Room {roomNumber}</span>
        </div>

        {/* Notes */}
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Additional Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Fragile items, special handling..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-secondary/50 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none resize-none focus:border-hotel-teal transition-colors"
        />

        <button
          onClick={() => setSubmitted(true)}
          className="mt-6 w-full py-3.5 rounded-xl font-semibold text-sm bg-hotel-teal text-primary-foreground active:scale-95 transition-transform"
        >
          Request Bellboy
        </button>
      </div>
    </div>
  )
}
