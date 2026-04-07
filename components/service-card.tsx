"use client"

import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  icon: LucideIcon
  label: string
  description: string
  color: string
  bgColor: string
  variant?: "default" | "compact"
  onClick?: () => void
}

export function ServiceCard({
  icon: Icon,
  label,
  description,
  color,
  bgColor,
  variant = "default",
  onClick,
}: ServiceCardProps) {
  if (variant === "compact") {
    return (
      <button
        onClick={onClick}
        className="service-card flex flex-col items-center gap-2.5 p-4 py-5 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md text-center w-full"
      >
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <Icon className="w-5.5 h-5.5" style={{ color }} strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="text-xs font-semibold text-foreground leading-tight">
            {label}
          </h3>
          <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
            {description}
          </p>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className="service-card group flex flex-col items-start gap-3.5 p-5 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-lg text-left w-full transition-shadow duration-300"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundColor: bgColor }}
      >
        <Icon className="w-5.5 h-5.5" style={{ color }} strokeWidth={1.8} />
      </div>
      <div>
        <h3 className="text-sm font-bold text-foreground leading-tight">
          {label}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </button>
  )
}
