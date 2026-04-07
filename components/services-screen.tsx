"use client"

import Image from "next/image"
import {
  MoreHorizontal,
  LogOut,
  ChevronRight,
  ChevronDown,
  Zap,
  SprayCan,
  UtensilsCrossed,
  Sparkles,
  BellRing,
  Coffee,
  Flower2,
  Luggage,
  Wind,
  MessageCircle,
} from "lucide-react"
import { BottomNav } from "./bottom-nav"
import { useState, useRef, useEffect } from "react"

interface ServicesScreenProps {
  guestName: string
  roomNumber: string
  onLogout: () => void
}

const services = [
  {
    icon: BellRing,
    label: "Concierge",
    color: "#9b795c",
    accent: "#f5eede",
  },
  {
    icon: Coffee,
    label: "Room Service",
    color: "#d69f7e",
    accent: "#fdf6ef",
  },
  {
    icon: Flower2,
    label: "Spa",
    color: "#99d3d5",
    accent: "#eef9f9",
  },
  {
    icon: Luggage,
    label: "Bellboy",
    color: "#607d8b",
    accent: "#eef2f4",
  },
  {
    icon: Wind,
    label: "Housekeeping",
    color: "#7D8A2D",
    accent: "#f4f5ec",
  },
  {
    icon: MessageCircle,
    label: "Support",
    color: "#9b795c",
    accent: "#f5eede",
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
  const [servicesVisible, setServicesVisible] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  const firstName = guestName.split(" ")[0]

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [quickAccessOpen])

  // Trigger staggered entrance animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setServicesVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section - slightly shorter */}
      <div className="relative shrink-0">
        <div className="relative h-52 overflow-hidden">
          <Image
            src="/images/hotel-hero.jpg"
            alt="Hotel lobby"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-background" />
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
      </div>

      {/* Main Content - flex-1 to fill remaining space */}
      <div className="flex-1 flex flex-col px-5 pt-3 pb-24">

        {/* Quick Access - Curtain Toggle */}
        <div className="mb-5 shrink-0">
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

        {/* Our Services Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-foreground tracking-tight">
              Our Services
            </h3>
            <button className="flex items-center gap-1 text-xs font-semibold text-hotel-brown">
              View all
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Animated Services Grid - 2 columns */}
          <div className="grid grid-cols-2 gap-3 flex-1">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <button
                  key={service.label}
                  className="service-tile-shimmer group relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border border-border/30 shadow-sm text-center active:scale-[0.95] overflow-hidden"
                  style={{
                    backgroundColor: service.accent,
                    opacity: servicesVisible ? 1 : 0,
                    transform: servicesVisible
                      ? "translateY(0) scale(1)"
                      : "translateY(24px) scale(0.92)",
                    transitionProperty: "opacity, transform",
                    transitionDuration: "0.6s",
                    transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transitionDelay: `${index * 80 + 100}ms`,
                  }}
                >
                  {/* Decorative background circle */}
                  <div
                    className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-[0.07] transition-transform duration-500 group-hover:scale-150"
                    style={{ backgroundColor: service.color }}
                  />

                  {/* Icon container */}
                  <div
                    className="relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ backgroundColor: `${service.color}18` }}
                  >
                    <Icon
                      className="w-6 h-6 transition-transform duration-300 group-hover:rotate-[-6deg]"
                      style={{ color: service.color }}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Label */}
                  <span className="relative text-xs font-bold text-foreground tracking-wide">
                    {service.label}
                  </span>
                </button>
              )
            })}

            {/* More tile */}
            <button
              className="group relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border border-dashed border-border/50 bg-card shadow-sm text-center active:scale-[0.95] col-span-2"
              style={{
                opacity: servicesVisible ? 1 : 0,
                transform: servicesVisible
                  ? "translateY(0) scale(1)"
                  : "translateY(24px) scale(0.92)",
                transitionProperty: "opacity, transform",
                transitionDuration: "0.6s",
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                transitionDelay: `${services.length * 80 + 100}ms`,
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-hotel-slate/8 transition-transform duration-300 group-hover:scale-110">
                  <MoreHorizontal className="w-5 h-5 text-hotel-slate" strokeWidth={1.6} />
                </div>
                <span className="text-xs font-bold text-muted-foreground tracking-wide">
                  Other Requests
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
