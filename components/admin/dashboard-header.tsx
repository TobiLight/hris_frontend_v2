"use client";

import { useState, useEffect } from "react";
import { Bell, Search, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, getUser } from "@/lib/auth/storage";
import { getInitials } from "@/lib/utils";

export function AdminDashboardHeader() {
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
    const timer = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm sm:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8 text-teal-600 hover:text-teal-700" />
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search employees, departments..."
            className="w-64 rounded-full bg-gray-50 pl-8 focus-visible:ring-teal-500 lg:w-80"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="hidden text-xs font-medium text-gray-600 sm:block md:text-sm">
          {formattedDate}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-none bg-gray-100 hover:bg-gray-200"
        >
          <HelpCircle className="h-4 w-4 text-gray-600" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative h-8 w-8 rounded-full border-none bg-gray-100 hover:bg-gray-200 sm:h-9 sm:w-9"
            >
              <Bell className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                5
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 sm:w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start p-3">
                <div className="font-medium">New Employee Registration</div>
                <div className="text-sm text-gray-500">
                  Sarah Johnson has completed her registration process.
                </div>
                <div className="mt-1 text-xs text-gray-400">2 hours ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-3">
                <div className="font-medium">Leave Request Pending</div>
                <div className="text-sm text-gray-500">
                  5 leave requests are pending your approval.
                </div>
                <div className="mt-1 text-xs text-gray-400">Yesterday</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-3">
                <div className="font-medium">Payroll Processing Due</div>
                <div className="text-sm text-gray-500">
                  Monthly payroll processing is due in 2 days.
                </div>
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
          {user && user.image_uri && user.image_uri.length ? (
            <AvatarImage
              src={user.image_uri || "/placeholder.svg"}
              alt={`${user.first_name} ${user.last_name}`}
            />
          ) : (
            <AvatarFallback className="bg-teal-100 text-teal-800 text-lg">
              {getInitials(user ? `${user.first_name} ${user.last_name}`.toUpperCase() : 'SA', 2)}
            </AvatarFallback>
          )}
        </Avatar>
      </div>
    </header>
  );
}
