"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Clock, LogIn, LogOut } from "lucide-react"

export function AttendanceClockInOut() {
  const { toast } = useToast()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [clockedIn, setClockedIn] = useState(false)
  const [clockInTime, setClockInTime] = useState<Date | null>(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(currentTime)

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentTime)

  const handleClockIn = () => {
    const now = new Date()
    setClockInTime(now)
    setClockedIn(true)
    toast({
      title: "Clocked In",
      description: `You have successfully clocked in at ${new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(now)}`,
    })
  }

  const handleClockOut = () => {
    const now = new Date()
    let duration = "0h 0m"

    if (clockInTime) {
      const diff = now.getTime() - clockInTime.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      duration = `${hours}h ${minutes}m`
    }

    setClockedIn(false)
    setClockInTime(null)

    toast({
      title: "Clocked Out",
      description: `You have successfully clocked out. Duration: ${duration}`,
    })
  }

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="bg-gradient-to-r from-teal-500 to-sky-500 p-4 text-white">
        <CardTitle>Clock In/Out</CardTitle>
        <CardDescription className="text-teal-100">Track your working hours</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6 p-4 sm:p-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-24 w-24 rounded-full border-4 border-teal-100 sm:h-32 sm:w-32"></div>
            </div>
            <div className="flex h-24 w-24 flex-col items-center justify-center sm:h-32 sm:w-32">
              <div className="text-xl font-bold tabular-nums text-teal-600 sm:text-3xl">{formattedTime}</div>
              <div className="text-xs text-gray-500 text-center">{formattedDate}</div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center space-y-4">
          {clockedIn ? (
            <>
              <div className="flex items-center space-x-2 text-green-600">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Currently Working</span>
              </div>
              <div className="text-sm text-center">
                Clocked in at:{" "}
                {clockInTime &&
                  new Intl.DateTimeFormat("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }).format(clockInTime)}
              </div>
              <Button
                onClick={handleClockOut}
                className="w-full bg-red-500 hover:bg-red-600 shadow-md transition-all duration-200"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Clock Out
              </Button>
            </>
          ) : (
            <Button
              onClick={handleClockIn}
              className="w-full bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 shadow-md transition-all duration-200"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Clock In
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
