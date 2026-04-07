"use client"

import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  icon: LucideIcon
  label: string
  description: string
  color: string
  bgColor: string
  onClick?: () => void
}

export function ServiceCard({
  icon: Icon,
  label,
  description,
  color,
  bgColor,
  onClick,
}: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className="service-card flex flex-col items-start gap-3 p-4 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md text-left w-full"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <Icon className="w-5 h-5" style={{ color }} strokeWidth={2} />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground leading-tight">
          {label}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>
    </button>
  )
}
