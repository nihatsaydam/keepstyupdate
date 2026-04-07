"use client"

import { useState } from "react"
import Image from "next/image"
import { PageHeader } from "./page-header"
import { useCart } from "./cart-context"
import { ShoppingBag, Plus, Minus } from "lucide-react"

interface RoomServicePageProps {
  onBack: () => void
  onOpenCart: () => void
}

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
}

const menuItems: MenuItem[] = [
  { id: "rs-1", name: "Continental Breakfast", description: "Croissant, butter, jam, fresh juice & coffee", price: 24, category: "Breakfast" },
  { id: "rs-2", name: "Eggs Benedict", description: "Poached eggs, hollandaise sauce, smoked salmon", price: 28, category: "Breakfast" },
  { id: "rs-3", name: "Avocado Toast", description: "Sourdough bread, avocado, poached egg, chili flakes", price: 22, category: "Breakfast" },
  { id: "rs-4", name: "Pancake Stack", description: "Fluffy pancakes with maple syrup & fresh berries", price: 20, category: "Breakfast" },
  { id: "rs-5", name: "Caesar Salad", description: "Romaine lettuce, parmesan, croutons, caesar dressing", price: 18, category: "Lunch" },
  { id: "rs-6", name: "Club Sandwich", description: "Triple-decker with turkey, bacon, lettuce & tomato", price: 22, category: "Lunch" },
  { id: "rs-7", name: "Grilled Salmon", description: "Atlantic salmon with seasonal vegetables & lemon butter", price: 38, category: "Dinner" },
  { id: "rs-8", name: "Beef Tenderloin", description: "Prime cut with truffle mash and red wine jus", price: 48, category: "Dinner" },
  { id: "rs-9", name: "Pasta Carbonara", description: "Spaghetti with pancetta, egg, parmesan & black pepper", price: 26, category: "Dinner" },
  { id: "rs-10", name: "Margherita Pizza", description: "Wood-fired pizza with fresh mozzarella & basil", price: 24, category: "Dinner" },
  { id: "rs-11", name: "Fresh Juice", description: "Orange, apple, or watermelon", price: 8, category: "Beverages" },
  { id: "rs-12", name: "Smoothie Bowl", description: "Acai, banana, berries, granola & coconut flakes", price: 16, category: "Beverages" },
  { id: "rs-13", name: "Sparkling Water", description: "750ml bottle with lemon", price: 6, category: "Beverages" },
  { id: "rs-14", name: "Chocolate Lava Cake", description: "Warm chocolate cake with vanilla ice cream", price: 16, category: "Desserts" },
  { id: "rs-15", name: "Creme Brulee", description: "Classic French custard with caramelized sugar", price: 14, category: "Desserts" },
  { id: "rs-16", name: "Fruit Platter", description: "Seasonal fresh fruits selection", price: 18, category: "Desserts" },
]

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Beverages", "Desserts"]

export function RoomServicePage({ onBack, onOpenCart }: RoomServicePageProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const { items, addItem, updateQuantity, totalItems } = useCart()

  const filteredItems = activeCategory === "All" ? menuItems : menuItems.filter((item) => item.category === activeCategory)

  const getItemQuantity = (id: string) => {
    const item = items.find((i) => i.id === id)
    return item?.quantity || 0
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader
        title="Room Service"
        subtitle="Food & beverages"
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
        <Image src="/images/food-hero.jpg" alt="Room Service" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h2 className="text-lg font-bold text-white">Room Service</h2>
          <p className="text-xs text-white/80">Delivered to your room</p>
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
                <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.description}</p>
                <span className="inline-block mt-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                  {item.category}
                </span>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-base font-bold text-foreground">${item.price}</span>
                  {qty === 0 ? (
                    <button
                      onClick={() => addItem({ id: item.id, name: item.name, price: item.price, category: "room-service" })}
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
