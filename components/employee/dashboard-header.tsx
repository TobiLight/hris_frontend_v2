"use client"

import { useState, useEffect } from "react"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm sm:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8 text-teal-600 hover:text-teal-700" />
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-48 rounded-full bg-gray-50 pl-8 focus-visible:ring-teal-500 lg:w-64"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="hidden text-xs font-medium text-gray-600 sm:block md:text-sm">{formattedDate}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative h-8 w-8 rounded-full border-none bg-gray-100 hover:bg-gray-200 sm:h-9 sm:w-9"
            >
              <Bell className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 sm:w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start p-3">
                <div className="font-medium">Leave Request Approved</div>
                <div className="text-sm text-gray-500">Your leave request for June 10-15 has been approved.</div>
                <div className="mt-1 text-xs text-gray-400">2 hours ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-3">
                <div className="font-medium">New Payslip Available</div>
                <div className="text-sm text-gray-500">Your April 2024 payslip is now available for download.</div>
                <div className="mt-1 text-xs text-gray-400">Yesterday</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-3">
                <div className="font-medium">Performance Review Scheduled</div>
                <div className="text-sm text-gray-500">Your Q2 performance review is scheduled for June 5, 2024.</div>
                <div className="mt-1 text-xs text-gray-400">2 days ago</div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-center font-medium text-teal-600">
              View All Notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Avatar className="h-8 w-8 border-2 border-teal-200">
          <AvatarImage src="/placeholder.svg" alt="John Doe" />
          <AvatarFallback className="bg-gradient-to-br from-teal-500 to-sky-500 text-white">JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
