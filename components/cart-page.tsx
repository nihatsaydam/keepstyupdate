"use client"

import { useState } from "react"
import { PageHeader } from "./page-header"
import { useCart } from "./cart-context"
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2 } from "lucide-react"

interface CartPageProps {
  onBack: () => void
  roomNumber: string
  guestName: string
}

export function CartPage({ onBack, roomNumber, guestName }: CartPageProps) {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart()
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="Order" onBack={() => { setSubmitted(false); onBack() }} />
        <div className="flex flex-col items-center justify-center px-6 pt-24">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#99d3d515' }}>
            <CheckCircle2 className="w-10 h-10 text-hotel-teal" />
          </div>
          <h2 className="text-xl font-bold text-foreground text-center">Order Placed</h2>
          <p className="text-sm text-muted-foreground text-center mt-2 max-w-xs">
            Your order has been received and will be delivered to Room {roomNumber}.
          </p>
          <div className="mt-6 w-full max-w-xs rounded-xl bg-card border border-border/50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Room</span>
              <span className="font-semibold text-foreground">{roomNumber}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">Guest</span>
              <span className="font-semibold text-foreground">{guestName}</span>
            </div>
            <div className="h-px bg-border my-3" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold text-foreground">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => { clearCart(); setSubmitted(false); onBack() }}
            className="mt-6 px-6 py-3 rounded-xl font-semibold text-sm bg-hotel-teal text-primary-foreground active:scale-95 transition-transform"
          >
            Back to Services
          </button>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="My Cart" onBack={onBack} />
        <div className="flex flex-col items-center justify-center px-6 pt-24">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-secondary">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground text-center">Your Cart is Empty</h2>
          <p className="text-sm text-muted-foreground text-center mt-2 max-w-xs">
            Add items from Room Service or Spa to get started.
          </p>
          <button
            onClick={onBack}
            className="mt-6 px-6 py-3 rounded-xl font-semibold text-sm bg-hotel-teal text-primary-foreground active:scale-95 transition-transform"
          >
            Browse Services
          </button>
        </div>
      </div>
    )
  }

  const spaItems = items.filter((i) => i.category === "spa")
  const foodItems = items.filter((i) => i.category === "room-service")

  return (
    <div className="min-h-screen bg-background pb-32">
      <PageHeader
        title="My Cart"
        subtitle={`${totalItems} ${totalItems === 1 ? "item" : "items"}`}
        onBack={onBack}
      />

      <div className="px-5 pt-4">
        {/* Room Service Items */}
        {foodItems.length > 0 && (
          <div className="mb-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Room Service</h3>
            <div className="flex flex-col gap-2">
              {foodItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground truncate">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">${item.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center active:scale-95 transition-transform"
                    >
                      <Minus className="w-3.5 h-3.5 text-foreground" />
                    </button>
                    <span className="text-sm font-bold text-foreground w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-hotel-teal flex items-center justify-center active:scale-95 transition-transform"
                    >
                      <Plus className="w-3.5 h-3.5 text-primary-foreground" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center active:scale-95 transition-transform ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spa Items */}
        {spaItems.length > 0 && (
          <div className="mb-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Spa & Wellness</h3>
            <div className="flex flex-col gap-2">
              {spaItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground truncate">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">${item.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center active:scale-95 transition-transform"
                    >
                      <Minus className="w-3.5 h-3.5 text-foreground" />
                    </button>
                    <span className="text-sm font-bold text-foreground w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-hotel-teal flex items-center justify-center active:scale-95 transition-transform"
                    >
                      <Plus className="w-3.5 h-3.5 text-primary-foreground" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center active:scale-95 transition-transform ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="rounded-xl bg-card border border-border/50 p-4 mt-4">
          <h3 className="text-sm font-bold text-foreground mb-3">Order Summary</h3>
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                <span className="font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="h-px bg-border my-2" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">Total</span>
              <span className="text-lg font-bold text-foreground">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card/95 backdrop-blur-xl border-t border-border/50 px-5 py-4 safe-bottom">
        <button
          onClick={() => setSubmitted(true)}
          className="w-full py-3.5 rounded-xl font-semibold text-sm bg-hotel-teal text-primary-foreground active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          Place Order - ${totalPrice.toFixed(2)}
        </button>
      </div>
    </div>
  )
}
