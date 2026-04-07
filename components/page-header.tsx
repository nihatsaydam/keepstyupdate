"use client"

import { ArrowLeft } from "lucide-react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  onBack: () => void
  rightElement?: React.ReactNode
}

export function PageHeader({ title, subtitle, onBack, rightElement }: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-xl border-b border-border/50">
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center active:scale-95 transition-transform"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground leading-tight">{title}</h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        {rightElement && <div>{rightElement}</div>}
      </div>
    </div>
  )
}
