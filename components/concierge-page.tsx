"use client"

import { useState } from "react"
import { PageHeader } from "./page-header"
import {
  Car,
  MapPin,
  Calendar,
  Clock,
  Users,
  ChevronRight,
  CheckCircle2,
  Plane,
  Mountain,
} from "lucide-react"

interface ConciergePageProps {
  onBack: () => void
  roomNumber: string
  guestName: string
}

type ServiceType = "transfer" | "tour" | null
type Step = "select" | "form" | "success"

export function ConciergePage({ onBack, roomNumber, guestName }: ConciergePageProps) {
  const [selectedService, setSelectedService] = useState<ServiceType>(null)
  const [step, setStep] = useState<Step>("select")

  // Transfer form
  const [transferType, setTransferType] = useState<"airport-hotel" | "hotel-airport" | "custom">("airport-hotel")
  const [transferDate, setTransferDate] = useState("")
  const [transferTime, setTransferTime] = useState("")
  const [transferPassengers, setTransferPassengers] = useState("1")
  const [transferNotes, setTransferNotes] = useState("")

  // Tour form
  const [tourType, setTourType] = useState("")
  const [tourDate, setTourDate] = useState("")
  const [tourGuests, setTourGuests] = useState("1")
  const [tourNotes, setTourNotes] = useState("")

  const tours = [
    { id: "city", label: "City Tour", duration: "4 hours" },
    { id: "historical", label: "Historical Sites", duration: "6 hours" },
    { id: "food", label: "Food & Culture", duration: "3 hours" },
    { id: "adventure", label: "Adventure Tour", duration: "Full day" },
  ]

  const handleSubmit = () => {
    setStep("success")
  }

  const handleReset = () => {
    setSelectedService(null)
    setStep("select")
    setTransferDate("")
    setTransferTime("")
    setTransferNotes("")
    setTourType("")
    setTourDate("")
    setTourNotes("")
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="Concierge" onBack={() => { handleReset(); onBack() }} />
        <div className="flex flex-col items-center justify-center px-6 pt-24">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#99d3d515' }}>
            <CheckCircle2 className="w-10 h-10 text-hotel-teal" />
          </div>
          <h2 className="text-xl font-bold text-foreground text-center">Request Submitted</h2>
          <p className="text-sm text-muted-foreground text-center mt-2 max-w-xs">
            Your {selectedService === "transfer" ? "transfer" : "tour"} request has been received. We&apos;ll confirm shortly.
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
              <span className="text-muted-foreground">Service</span>
              <span className="font-semibold text-foreground capitalize">{selectedService}</span>
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
        title="Concierge"
        subtitle="Personal assistance"
        onBack={selectedService && step === "form" ? () => { setSelectedService(null); setStep("select") } : onBack}
      />

      {step === "select" && (
        <div className="px-5 pt-6">
          <p className="text-sm text-muted-foreground mb-4">What can we help you with?</p>
          <div className="flex flex-col gap-3">
            {/* Transfer Service */}
            <button
              onClick={() => { setSelectedService("transfer"); setStep("form") }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 shadow-sm active:scale-[0.98] transition-transform text-left"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#607d8b15' }}>
                <Car className="w-7 h-7 text-hotel-slate" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">Transfer Service</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Airport pickup, drop-off & more</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Tour Service */}
            <button
              onClick={() => { setSelectedService("tour"); setStep("form") }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 shadow-sm active:scale-[0.98] transition-transform text-left"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#9b795c15' }}>
                <MapPin className="w-7 h-7 text-hotel-brown" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">Tour Service</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Explore local sights & culture</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      )}

      {step === "form" && selectedService === "transfer" && (
        <div className="px-5 pt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#607d8b15' }}>
              <Plane className="w-5 h-5 text-hotel-slate" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Transfer Request</h3>
              <p className="text-xs text-muted-foreground">Fill in your transfer details</p>
            </div>
          </div>

          {/* Transfer Type */}
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Transfer Type</label>
          <div className="flex flex-col gap-2 mb-5">
            {[
              { value: "airport-hotel" as const, label: "Airport to Hotel" },
              { value: "hotel-airport" as const, label: "Hotel to Airport" },
              { value: "custom" as const, label: "Custom Location" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTransferType(opt.value)}
                className={`px-4 py-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                  transferType === opt.value
                    ? "border-hotel-teal bg-hotel-teal/5 text-foreground"
                    : "border-border bg-secondary/50 text-muted-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Date</label>
              <div className="flex items-center gap-2 px-3 py-3 rounded-xl border-2 border-border bg-secondary/50">
                <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                  type="date"
                  value={transferDate}
                  onChange={(e) => setTransferDate(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Time</label>
              <div className="flex items-center gap-2 px-3 py-3 rounded-xl border-2 border-border bg-secondary/50">
                <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                  type="time"
                  value={transferTime}
                  onChange={(e) => setTransferTime(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground outline-none"
                />
              </div>
            </div>
          </div>

          {/* Passengers */}
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Passengers</label>
          <div className="flex items-center gap-2 px-3 py-3 rounded-xl border-2 border-border bg-secondary/50 mb-5">
            <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <select
              value={transferPassengers}
              onChange={(e) => setTransferPassengers(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "passenger" : "passengers"}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Special Requests</label>
          <textarea
            value={transferNotes}
            onChange={(e) => setTransferNotes(e.target.value)}
            placeholder="Flight number, additional stops..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border-2 border-border bg-secondary/50 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none resize-none focus:border-hotel-teal transition-colors"
          />

          <button
            onClick={handleSubmit}
            disabled={!transferDate || !transferTime}
            className="mt-6 w-full py-3.5 rounded-xl font-semibold text-sm bg-hotel-teal text-primary-foreground active:scale-95 transition-transform disabled:opacity-40"
          >
            Submit Transfer Request
          </button>
        </div>
      )}

      {step === "form" && selectedService === "tour" && (
        <div className="px-5 pt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#9b795c15' }}>
              <Mountain className="w-5 h-5 text-hotel-brown" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Tour Request</h3>
              <p className="text-xs text-muted-foreground">Choose a tour and your preferred date</p>
            </div>
          </div>

          {/* Tour Options */}
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Select Tour</label>
          <div className="flex flex-col gap-2 mb-5">
            {tours.map((tour) => (
              <button
                key={tour.id}
                onClick={() => setTourType(tour.id)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl border-2 text-left transition-all ${
                  tourType === tour.id
                    ? "border-hotel-teal bg-hotel-teal/5"
                    : "border-border bg-secondary/50"
                }`}
              >
                <span className={`text-sm font-medium ${tourType === tour.id ? "text-foreground" : "text-muted-foreground"}`}>
                  {tour.label}
                </span>
                <span className="text-xs text-muted-foreground">{tour.duration}</span>
              </button>
            ))}
          </div>

          {/* Date */}
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Preferred Date</label>
          <div className="flex items-center gap-2 px-3 py-3 rounded-xl border-2 border-border bg-secondary/50 mb-5">
            <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="date"
              value={tourDate}
              onChange={(e) => setTourDate(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground outline-none"
            />
          </div>

          {/* Guests */}
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Number of Guests</label>
          <div className="flex items-center gap-2 px-3 py-3 rounded-xl border-2 border-border bg-secondary/50 mb-5">
            <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <select
              value={tourGuests}
              onChange={(e) => setTourGuests(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground outline-none"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Special Requests</label>
          <textarea
            value={tourNotes}
            onChange={(e) => setTourNotes(e.target.value)}
            placeholder="Any preferences or requirements..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border-2 border-border bg-secondary/50 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none resize-none focus:border-hotel-teal transition-colors"
          />

          <button
            onClick={handleSubmit}
            disabled={!tourType || !tourDate}
            className="mt-6 w-full py-3.5 rounded-xl font-semibold text-sm bg-hotel-teal text-primary-foreground active:scale-95 transition-transform disabled:opacity-40"
          >
            Submit Tour Request
          </button>
        </div>
      )}
    </div>
  )
}
