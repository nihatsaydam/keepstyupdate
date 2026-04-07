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

export function ServicesScreen({
  guestName,
  roomNumber,
  onLogout,
}: ServicesScreenProps) {
  const [activeTab, setActiveTab] = useState("services")

  const firstName = guestName.split(" ")[0]

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header area with hero */}
      <div className="relative">
        {/* Hero image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src="/images/hotel-hero.jpg"
            alt="Hotel lobby"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-background" />
        </div>

        {/* Top bar */}
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
              <p className="text-xs font-medium text-card/80">Welcome back,</p>
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

        {/* Greeting overlay on hero bottom */}
        <div className="absolute bottom-6 left-5 right-5">
          <h1 className="text-xl font-bold text-card leading-tight text-balance">
            {"What would you like today?"}
          </h1>
          <p className="text-xs text-card/70 mt-1 font-medium">
            Explore our premium services
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-5 relative z-10">
        {/* Services Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-foreground tracking-tight">
              Services
            </h3>
            <button className="flex items-center gap-1 text-xs font-medium text-hotel-brown">
              See all
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Featured row - 3 column */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            {services.slice(0, 3).map((service) => (
              <ServiceCard key={service.label} {...service} variant="compact" />
            ))}
          </div>

          {/* Second row - 3 column */}
          <div className="grid grid-cols-3 gap-3">
            {services.slice(3, 6).map((service) => (
              <ServiceCard key={service.label} {...service} variant="compact" />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-border/60" />

        {/* Quick Access Section */}
        <div>
          <h3 className="text-sm font-bold text-foreground tracking-tight mb-4">
            Quick Access
          </h3>

          <div className="flex flex-col gap-2.5">
            <QuickAccessRow
              icon={SprayCan}
              label="Request Extra Towels"
              subtitle="Housekeeping will deliver shortly"
              color="#7D8A2D"
            />
            <QuickAccessRow
              icon={UtensilsCrossed}
              label="Order Breakfast"
              subtitle="In-room dining available 6AM - 11AM"
              color="#d69f7e"
            />
            <QuickAccessRow
              icon={Sparkles}
              label="Book Spa Session"
              subtitle="Same-day appointments available"
              color="#99d3d5"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-border/60" />

        {/* Other Requests */}
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
                {"Can't find what you need?"}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

/* Quick Access Row Component */
function QuickAccessRow({
  icon: Icon,
  label,
  subtitle,
  color,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  label: string
  subtitle: string
  color: string
}) {
  return (
    <button className="w-full flex items-center gap-3.5 p-3.5 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className="w-4.5 h-4.5" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-foreground leading-tight">
          {label}
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          {subtitle}
        </p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </button>
  )
}
