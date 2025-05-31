"use client"
import Link from "next/link"
import type React from "react"

import { usePathname } from "next/navigation"
import {
  Users,
  BarChart3,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Home,
  DollarSign,
  BriefcaseBusiness,
  UserCog,
  Bell,
  X,
  Building2,
  Briefcase,
  Calculator,
  CalendarDays,
  Shield,
  Key,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/auth-context"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Employees", href: "/admin/employees", icon: Users },
  { name: "Departments", href: "/admin/departments", icon: BriefcaseBusiness },
  { name: "Attendance", href: "/admin/attendance", icon: Calendar },
  { name: "Payroll", href: "/admin/payroll", icon: DollarSign },
  { name: "Leave Management", href: "/admin/leave", icon: Calendar },
  { name: "Performance", href: "/admin/performance", icon: BarChart3 },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Announcements", href: "/admin/announcements", icon: Bell },

  // New Management Section
  { name: "Bank Management", href: "/admin/banks", icon: Building2 },
  { name: "Employment Types", href: "/admin/employment-types", icon: Briefcase },
  { name: "Payroll Classes", href: "/admin/payroll-classes", icon: Calculator },
  { name: "Leave Types", href: "/admin/leave-types", icon: CalendarDays },
  { name: "Role Management", href: "/admin/roles", icon: Shield },
  { name: "Permission Management", href: "/admin/permissions", icon: Key },
  { name: "System Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { open, mobileOpen, setMobileOpen } = useSidebar()
  const { logout, user } = useAuth()

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault()
    await logout()
  }

  return (
    <Sidebar className="border-r bg-white bg-gradient-to-b from-white to-gray-50 flex flex-col h-full">
      <SidebarHeader className="border-b p-4 flex-shrink-0 h-16">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-sky-600 text-white shadow-md">
              <span className="text-lg font-bold">BT</span>
            </div>
            <div className={`flex flex-col ${!open && "hidden lg:flex"}`}>
              <span className="text-sm font-bold text-gray-900">BTMS HRMS</span>
              <span className="text-xs font-medium text-teal-600">Admin Portal</span>
            </div>
          </div>
          {/* Mobile Close Button */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4 flex-1 overflow-y-auto">
        <SidebarMenu>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <SidebarMenuItem key={item.name}>
                <Link
                  href={item.href}
                  className={`flex h-10 w-full items-center px-3 rounded-lg my-1 transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-teal-600 to-sky-600 text-white shadow-md"
                      : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 transition-all ${isActive ? "text-white" : "text-gray-500 group-hover:text-teal-600"}`}
                  />
                  <span className={`ml-3 ${!open && "hidden lg:inline-block"}`}>{item.name}</span>
                </Link>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4 flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex w-full h-10 items-center px-3 hover:bg-gray-100">
              <Avatar className="h-8 w-8 border-2 border-teal-200">
                <AvatarImage src="/placeholder.svg" alt={user?.first_name || "Admin User"} />
                <AvatarFallback className="bg-gradient-to-br from-teal-600 to-sky-600 text-white">
                  {user?.first_name?.[0] || "A"}
                </AvatarFallback>
              </Avatar>
              <div className={`ml-2 flex flex-col items-start ${!open && "hidden lg:flex"}`}>
                <span className="text-sm font-medium">
                  {user?.first_name || "Admin"} {user?.last_name || "User"}
                </span>
                <span className="text-xs text-teal-600">Super Admin</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/admin/profile">
                <UserCog className="mr-2 h-4 w-4" />
                <span>Admin Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>System Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
