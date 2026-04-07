"use client"

import {
  LayoutGrid,
  MessageCircle,
  ClipboardList,
  ShoppingBag,
  Settings,
} from "lucide-react"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "services", label: "Services", icon: LayoutGrid },
  { id: "concierge", label: "AI Assist", icon: MessageCircle },
  { id: "requests", label: "Requests", icon: ClipboardList },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "settings", label: "More", icon: Settings },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50">
      <div className="bg-card/95 backdrop-blur-xl border-t border-border safe-bottom">
        <div className="flex items-center justify-around px-2 pt-2 pb-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all duration-200"
                aria-label={tab.label}
              >
                <div
                  className={`p-1.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-hotel-teal/20"
                      : "bg-transparent"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive
                        ? "text-hotel-teal stroke-[2.5]"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
