"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { ServicesScreen } from "@/components/services-screen"

export default function HotelApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [guestName, setGuestName] = useState("")
  const [roomNumber, setRoomNumber] = useState("")

  const handleLogin = (room: string, name: string) => {
    setRoomNumber(room)
    setGuestName(name)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setGuestName("")
    setRoomNumber("")
  }

  return (
    <div className="flex justify-center min-h-screen bg-hotel-slate/10">
      <div className="w-full max-w-[430px] min-h-screen bg-background relative shadow-2xl">
        {!isLoggedIn ? (
          <LoginScreen onLogin={handleLogin} />
        ) : (
          <ServicesScreen
            guestName={guestName}
            roomNumber={roomNumber}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  )
}
