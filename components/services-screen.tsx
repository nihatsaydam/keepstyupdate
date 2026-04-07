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
  ChevronDown,
  Zap,
} from "lucide-react"
import { ServiceCard } from "./service-card"
import { BottomNav } from "./bottom-nav"
import { useState, useRef, useEffect } from "react"

interface ServicesScreenProps {
  guestName: string
  roomNumber: string
  onLogout: () => void
}

const services = [
  {
    icon: ConciergeBell,
    label: "Concierge",
    description: "Personal assistance & local tips",
    color: "#9b795c",
    bgColor: "#9b795c15",
  },
  {
    icon: UtensilsCrossed,
    label: "Room Service",
    description: "Food & beverages to your room",
    color: "#d69f7e",
    bgColor: "#d69f7e15",
  },
  {
    icon: Sparkles,
    label: "Spa & Wellness",
    description: "Relax & rejuvenate your senses",
    color: "#99d3d5",
    bgColor: "#99d3d515",
  },
  {
    icon: Luggage,
    label: "Bellboy",
    description: "Luggage assistance anytime",
    color: "#607d8b",
    bgColor: "#607d8b15",
  },
  {
    icon: SprayCan,
    label: "Housekeeping",
    description: "Room cleaning & fresh linens",
    color: "#7D8A2D",
    bgColor: "#7D8A2D15",
  },
  {
    icon: Headphones,
    label: "Support",
    description: "24/7 guest assistance line",
    color: "#9b795c",
    bgColor: "#9b795c15",
  },
]

const quickActions = [
  {
    icon: SprayCan,
    label: "Request Extra Towels",
    subtitle: "Housekeeping will deliver shortly",
    color: "#7D8A2D",
  },
  {
    icon: UtensilsCrossed,
    label: "Order Breakfast",
    subtitle: "In-room dining 6AM - 11AM",
    color: "#d69f7e",
  },
  {
    icon: Sparkles,
    label: "Book Spa Session",
    subtitle: "Same-day appointments available",
    color: "#99d3d5",
  },
]

export function ServicesScreen({
  guestName,
  roomNumber,
  onLogout,
}: ServicesScreenProps) {
  const [activeTab, setActiveTab] = useState("services")
  const [quickAccessOpen, setQuickAccessOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  const firstName = guestName.split(" ")[0]

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [quickAccessOpen])

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative h-60 overflow-hidden">
          <Image
            src="/images/hotel-hero.jpg"
            alt="Hotel lobby"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        </div>

        {/* Top Bar */}
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

        {/* Hero Text */}
        <div className="absolute bottom-8 left-5 right-5">
          <h1 className="text-xl font-bold text-card leading-tight text-balance">
            {"What would you like today?"}
          </h1>
          <p className="text-xs text-card/70 mt-1 font-medium">
            Explore our premium services
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-5 pt-6 relative z-10">

        {/* Quick Access - Curtain Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setQuickAccessOpen(!quickAccessOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-hotel-teal/10 border border-hotel-teal/20 transition-all duration-300 active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-hotel-teal/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-hotel-teal" />
              </div>
              <span className="text-sm font-semibold text-foreground">Quick Access</span>
            </div>
            <ChevronDown
              className={`w-4.5 h-4.5 text-hotel-teal transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                quickAccessOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Curtain Content */}
          <div
            className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              maxHeight: quickAccessOpen ? `${contentHeight}px` : "0px",
              opacity: quickAccessOpen ? 1 : 0,
            }}
          >
            <div ref={contentRef} className="pt-3 flex flex-col gap-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.label}
                    className="w-full flex items-center gap-3.5 p-3.5 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left"
                    style={{
                      transitionProperty: "transform, opacity, box-shadow",
                      transitionDuration: "0.4s, 0.3s, 0.2s",
                      transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1), ease, ease",
                      transitionDelay: quickAccessOpen ? `${index * 80}ms` : "0ms",
                      transform: quickAccessOpen ? "translateY(0)" : "translateY(-12px)",
                      opacity: quickAccessOpen ? 1 : 0,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${action.color}15` }}
                    >
                      <Icon className="w-4.5 h-4.5" style={{ color: action.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground leading-tight">
                        {action.label}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {action.subtitle}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Services Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-foreground tracking-tight">
            Our Services
          </h3>
          <button className="flex items-center gap-1 text-xs font-semibold text-hotel-brown">
            View all
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Services Grid - 2 columns, more spacious */}
        <div className="grid grid-cols-2 gap-3">
          {services.map((service) => (
            <ServiceCard key={service.label} {...service} variant="default" />
          ))}
        </div>

        {/* Other Requests */}
        <div className="mt-5">
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
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
