"use client"

import Image from "next/image"
import {
  ConciergeBell,
  UtensilsCrossed,
  Sparkles,
  Luggage,
  SprayCan,
  Headphones,
  MoreHorizontal,
  LogOut,
  ChevronRight,
  Clock,
  Star,
} from "lucide-react"
import { ServiceCard } from "./service-card"
import { BottomNav } from "./bottom-nav"
import { useState } from "react"

interface ServicesScreenProps {
  guestName: string
  roomNumber: string
  onLogout: () => void
}

const services = [
  {
    icon: ConciergeBell,
    label: "Concierge",
    description: "Personal assistance",
    color: "#9b795c",
    bgColor: "#9b795c15",
  },
  {
    icon: UtensilsCrossed,
    label: "Room Service",
    description: "Food & beverages",
    color: "#d69f7e",
    bgColor: "#d69f7e15",
  },
  {
    icon: Sparkles,
    label: "Spa & Wellness",
    description: "Relax & rejuvenate",
    color: "#99d3d5",
    bgColor: "#99d3d515",
  },
  {
    icon: Luggage,
    label: "Bellboy",
    description: "Luggage help",
    color: "#607d8b",
    bgColor: "#607d8b15",
  },
  {
    icon: SprayCan,
    label: "Housekeeping",
    description: "Room cleaning",
    color: "#7D8A2D",
    bgColor: "#7D8A2D15",
  },
  {
    icon: Headphones,
    label: "Support",
    description: "24/7 assistance",
    color: "#9b795c",
    bgColor: "#9b795c15",
  },
]

const quickActions = [
  { label: "Extra Towels", icon: SprayCan },
  { label: "Wake Up Call", icon: Clock },
  { label: "Rate Stay", icon: Star },
]

export function ServicesScreen({
  guestName,
  roomNumber,
  onLogout,
}: ServicesScreenProps) {
  const [activeTab, setActiveTab] = useState("services")

  const firstName = guestName.split(" ")[0]

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header area */}
      <div className="relative">
        {/* Hero image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src="/images/hotel-hero.jpg"
            alt="Hotel lobby"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
        </div>

        {/* Floating header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-card/50 shadow-md">
              <Image
                src="/images/mascot.png"
                alt="Hotel mascot"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-card/80">Good day,</p>
              <p className="text-sm font-bold text-card">{firstName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-full bg-card/20 backdrop-blur-md border border-card/20">
              <span className="text-xs font-semibold text-card">
                Room {roomNumber}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="w-9 h-9 rounded-full bg-card/20 backdrop-blur-md border border-card/20 flex items-center justify-center"
              aria-label="Log out"
            >
              <LogOut className="w-4 h-4 text-card" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 -mt-6 relative z-10">
        {/* Welcome card */}
        <div className="rounded-2xl p-5 shadow-md border border-border/50" style={{ backgroundColor: '#99d3d5' }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold" style={{ color: '#1a3a3b' }}>
                How can we help you?
              </h2>
              <p className="text-xs mt-0.5" style={{ color: '#1a3a3b99' }}>
                Explore our services below
              </p>
            </div>
            <div className="w-12 h-12">
              <Image
                src="/images/mascot.png"
                alt="Hotel mascot"
                width={48}
                height={48}
                className="drop-shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="flex gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.label}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border/50 shadow-sm transition-all hover:shadow-md active:scale-95"
                >
                  <Icon className="w-3.5 h-3.5 text-hotel-teal" />
                  <span className="text-xs font-medium text-foreground whitespace-nowrap">
                    {action.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Our Services
            </h3>
            <button className="flex items-center gap-1 text-xs font-medium text-hotel-brown">
              View all
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {services.map((service) => (
              <ServiceCard key={service.label} {...service} />
            ))}
          </div>
        </div>

        {/* Other Requests */}
        <div className="mt-4">
          <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-hotel-slate/10">
                <MoreHorizontal className="w-5 h-5 text-hotel-slate" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-semibold text-foreground">
                  Other Requests
                </h3>
                <p className="text-xs text-muted-foreground">
                  Can&apos;t find what you need?
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
