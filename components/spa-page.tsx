"use client"

import { useState } from "react"
import Image from "next/image"
import { PageHeader } from "./page-header"
import { useCart } from "./cart-context"
import { ShoppingBag, Plus, Minus, Clock, Star } from "lucide-react"

interface SpaPageProps {
  onBack: () => void
  onOpenCart: () => void
}

interface SpaItem {
  id: string
  name: string
  description: string
  price: number
  duration: string
  rating: number
  category: string
}

const spaMenu: SpaItem[] = [
  { id: "spa-1", name: "Swedish Massage", description: "Full body relaxation with gentle pressure", price: 120, duration: "60 min", rating: 4.9, category: "Massage" },
  { id: "spa-2", name: "Deep Tissue Massage", description: "Target deep muscle tension and knots", price: 140, duration: "60 min", rating: 4.8, category: "Massage" },
  { id: "spa-3", name: "Hot Stone Therapy", description: "Heated stones for ultimate relaxation", price: 160, duration: "75 min", rating: 4.9, category: "Massage" },
  { id: "spa-4", name: "Aromatherapy Massage", description: "Essential oils for mind & body balance", price: 130, duration: "60 min", rating: 4.7, category: "Massage" },
  { id: "spa-5", name: "Classic Facial", description: "Deep cleansing and hydration treatment", price: 90, duration: "45 min", rating: 4.6, category: "Facial" },
  { id: "spa-6", name: "Anti-Aging Facial", description: "Premium treatment for youthful glow", price: 150, duration: "60 min", rating: 4.8, category: "Facial" },
  { id: "spa-7", name: "Body Scrub & Wrap", description: "Exfoliation and nourishing body wrap", price: 110, duration: "50 min", rating: 4.7, category: "Body" },
  { id: "spa-8", name: "Manicure & Pedicure", description: "Complete nail care package", price: 70, duration: "45 min", rating: 4.5, category: "Nails" },
  { id: "spa-9", name: "Couples Massage", description: "Shared massage experience for two", price: 220, duration: "60 min", rating: 4.9, category: "Special" },
  { id: "spa-10", name: "Hammam Experience", description: "Traditional steam bath ritual", price: 180, duration: "90 min", rating: 4.8, category: "Special" },
]

const categories = ["All", "Massage", "Facial", "Body", "Nails", "Special"]

export function SpaPage({ onBack, onOpenCart }: SpaPageProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const { items, addItem, updateQuantity, totalItems } = useCart()

  const filteredItems = activeCategory === "All" ? spaMenu : spaMenu.filter((item) => item.category === activeCategory)

  const getItemQuantity = (id: string) => {
    const item = items.find((i) => i.id === id)
    return item?.quantity || 0
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader
        title="Spa & Wellness"
        subtitle="Relax & rejuvenate"
        onBack={onBack}
        rightElement={
          <button
            onClick={onOpenCart}
            className="relative w-9 h-9 rounded-full bg-secondary flex items-center justify-center active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-4 h-4 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-hotel-teal text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        }
      />

      {/* Hero */}
      <div className="relative h-40 mx-5 mt-4 rounded-2xl overflow-hidden">
        <Image src="/images/spa-hero.jpg" alt="Spa" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h2 className="text-lg font-bold text-white">Spa Menu</h2>
          <p className="text-xs text-white/80">Book your perfect treatment</p>
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 mt-5">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-hotel-teal text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-5 mt-4 flex flex-col gap-3">
        {filteredItems.map((item) => {
          const qty = getItemQuantity(item.id)
          return (
            <div
              key={item.id}
              className="flex gap-4 p-4 rounded-2xl bg-card border border-border/50 shadow-sm"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground truncate">{item.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {item.duration}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 fill-hotel-peach text-hotel-peach" />
                    {item.rating}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-base font-bold text-foreground">${item.price}</span>
                  {qty === 0 ? (
                    <button
                      onClick={() => addItem({ id: item.id, name: item.name, price: item.price, category: "spa" })}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-hotel-teal text-primary-foreground text-xs font-semibold active:scale-95 transition-transform"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 bg-hotel-teal/10 rounded-xl px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, qty - 1)}
                        className="w-7 h-7 rounded-lg bg-card border border-border flex items-center justify-center active:scale-95 transition-transform"
                      >
                        <Minus className="w-3.5 h-3.5 text-foreground" />
                      </button>
                      <span className="text-sm font-bold text-foreground w-4 text-center">{qty}</span>
                      <button
                        onClick={() => updateQuantity(item.id, qty + 1)}
                        className="w-7 h-7 rounded-lg bg-hotel-teal flex items-center justify-center active:scale-95 transition-transform"
                      >
                        <Plus className="w-3.5 h-3.5 text-primary-foreground" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
