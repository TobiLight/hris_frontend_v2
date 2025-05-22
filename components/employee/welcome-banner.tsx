"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function WelcomeBanner() {
  const [greeting, setGreeting] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const hour = currentTime.getHours()
    if (hour < 12) {
      setGreeting("Good morning")
    } else if (hour < 18) {
      setGreeting("Good afternoon")
    } else {
      setGreeting("Good evening")
    }
  }, [currentTime])

  return (
    <div className="relative mb-6 overflow-hidden rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 p-4 text-white shadow-lg md:p-6">
      {/* Background decorations - made smaller and positioned better for mobile */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 md:-right-10 md:-top-10 md:h-40 md:w-40" />
      <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/10 md:-bottom-10 md:-left-10 md:h-40 md:w-40" />

      <div className="relative z-10 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-xl font-bold md:text-2xl">{greeting}, John!</h2>
          <p className="mt-1 text-sm text-teal-100 md:text-base">Welcome to your HR Management Dashboard</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30 md:size-default">
            View Announcements
          </Button>
          <Button size="sm" className="bg-white text-teal-600 hover:bg-teal-50 md:size-default">
            Quick Actions
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
