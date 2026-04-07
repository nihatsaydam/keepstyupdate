"use client"

import { useState } from "react"
import { PageHeader } from "./page-header"
import { SprayCan, Sparkles, Check, CheckCircle2 } from "lucide-react"

interface HousekeepingPageProps {
  onBack: () => void
  roomNumber: string
}

type HousekeepingMode = "select" | "items" | "cleaning" | "success"

const requestItems = [
  { id: "towels", label: "Extra Towels", icon: "towel" },
  { id: "pillows", label: "Extra Pillows", icon: "pillow" },
  { id: "blankets", label: "Extra Blankets", icon: "blanket" },
  { id: "toiletries", label: "Toiletries Set", icon: "toiletry" },
  { id: "bathrobe", label: "Bathrobe", icon: "robe" },
  { id: "slippers", label: "Slippers", icon: "slipper" },
  { id: "iron", label: "Iron & Board", icon: "iron" },
  { id: "hangers", label: "Extra Hangers", icon: "hanger" },
  { id: "minibar", label: "Minibar Refill", icon: "minibar" },
  { id: "water", label: "Bottled Water", icon: "water" },
]

const cleaningOptions = [
  { id: "full", label: "Full Room Cleaning", description: "Complete cleaning including bed making, bathroom, and vacuuming", time: "30-45 min" },
  { id: "quick", label: "Quick Tidy Up", description: "Bed making, trash removal, and fresh towels", time: "15-20 min" },
  { id: "bathroom", label: "Bathroom Only", description: "Bathroom deep clean with fresh towels and toiletries", time: "15-20 min" },
  { id: "turndown", label: "Turndown Service", description: "Evening bed preparation with chocolates and curtains", time: "10-15 min" },
]

export function HousekeepingPage({ onBack, roomNumber }: HousekeepingPageProps) {
  const [mode, setMode] = useState<HousekeepingMode>("select")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectedCleaning, setSelectedCleaning] = useState<string | null>(null)
  const [notes, setNotes] = useState("")

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleSubmit = () => {
    setMode("success")
  }

  const handleReset = () => {
    setMode("select")
    setSelectedItems([])
    setSelectedCleaning(null)
    setNotes("")
  }

  if (mode === "success") {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="Housekeeping" onBack={() => { handleReset(); onBack() }} />
        <div className="flex flex-col items-center justify-center px-6 pt-24">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#99d3d515' }}>
            <CheckCircle2 className="w-10 h-10 text-hotel-teal" />
          </div>
          <h2 className="text-xl font-bold text-foreground text-center">Request Submitted</h2>
          <p className="text-sm text-muted-foreground text-center mt-2 max-w-xs">
            Housekeeping is on the way. We&apos;ll take care of everything.
          </p>
          <div className="mt-6 w-full max-w-xs rounded-xl bg-card border border-border/50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Room</span>
              <span className="font-semibold text-foreground">{roomNumber}</span>
            </div>
          </div>
          <button
            onClick={handleReset}
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
      <PageHeader
        title="Housekeeping"
        subtitle="Room cleaning & items"
        onBack={mode === "select" ? onBack : () => setMode("select")}
      />

      {mode === "select" && (
        <div className="px-5 pt-6">
          <p className="text-sm text-muted-foreground mb-4">What do you need?</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setMode("items")}
              className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 shadow-sm active:scale-[0.98] transition-transform text-left"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#7D8A2D15' }}>
                <Sparkles className="w-7 h-7 text-hotel-olive" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">Request Items</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Towels, pillows, toiletries & more</p>
              </div>
            </button>

            <button
              onClick={() => setMode("cleaning")}
              className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 shadow-sm active:scale-[0.98] transition-transform text-left"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#99d3d515' }}>
                <SprayCan className="w-7 h-7 text-hotel-teal" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">Cleaning Service</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Full clean, quick tidy, turndown & more</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {mode === "items" && (
        <div className="px-5 pt-6">
          <p className="text-sm text-muted-foreground mb-4">Select items you need</p>
          <div className="grid grid-cols-2 gap-3">
            {requestItems.map((item) => {
              const isSelected = selectedItems.includes(item.id)
              return (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95 ${
                    isSelected
                      ? "border-hotel-teal bg-hotel-teal/5"
                      : "border-border bg-card"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <Check className="w-4 h-4 text-hotel-teal" />
                    </div>
                  )}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: isSelected ? '#99d3d520' : '#7D8A2D10' }}
                  >
                    <Sparkles className="w-5 h-5" style={{ color: isSelected ? '#99d3d5' : '#7D8A2D' }} />
                  </div>
                  <span className={`text-xs font-medium text-center ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>

          <label className="text-xs font-medium text-muted-foreground mb-1.5 block mt-5">Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Quantity, special requests..."
            rows={2}
            className="w-full px-4 py-3 rounded-xl border-2 border-border bg-secondary/50 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none resize-none focus:border-hotel-teal transition-colors"
          />

          <button
            onClick={handleSubmit}
            disabled={selectedItems.length === 0}
            className="mt-5 w-full py-3.5 rounded-xl font-semibold text-sm bg-hotel-teal text-primary-foreground active:scale-95 transition-transform disabled:opacity-40"
          >
            Request {selectedItems.length} {selectedItems.length === 1 ? "Item" : "Items"}
          </button>
        </div>
      )}

      {mode === "cleaning" && (
        <div className="px-5 pt-6">
          <p className="text-sm text-muted-foreground mb-4">Choose a cleaning service</p>
          <div className="flex flex-col gap-3">
            {cleaningOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedCleaning(option.id)}
                className={`relative flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                  selectedCleaning === option.id
                    ? "border-hotel-teal bg-hotel-teal/5"
                    : "border-border bg-card"
                }`}
              >
                {selectedCleaning === option.id && (
                  <div className="absolute top-3 right-3">
                    <Check className="w-4 h-4 text-hotel-teal" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className={`text-sm font-semibold ${selectedCleaning === option.id ? "text-foreground" : "text-muted-foreground"}`}>
                    {option.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
                  <span className="inline-block mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    {option.time}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <label className="text-xs font-medium text-muted-foreground mb-1.5 block mt-5">Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Preferred time, special requests..."
            rows={2}
            className="w-full px-4 py-3 rounded-xl border-2 border-border bg-secondary/50 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none resize-none focus:border-hotel-teal transition-colors"
          />

          <button
            onClick={handleSubmit}
            disabled={!selectedCleaning}
            className="mt-5 w-full py-3.5 rounded-xl font-semibold text-sm bg-hotel-teal text-primary-foreground active:scale-95 transition-transform disabled:opacity-40"
          >
            Request Cleaning
          </button>
        </div>
      )}
    </div>
  )
}
