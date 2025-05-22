"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";

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
  { name: "System Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  const { logout, user } = useAuth();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logout();
  };

  return (
    <Sidebar className="border-r bg-white bg-gradient-to-b from-white to-gray-50 flex flex-col h-full">
      <SidebarHeader className="border-b p-4 flex-shrink-0 h-16">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-sky-600 text-white shadow-md">
            <span className="text-lg font-bold">BT</span>
          </div>
          <div className={`flex flex-col ${!open && "hidden"}`}>
            <span className="text-sm font-bold text-gray-900">BTMS HRMS</span>
            <span className="text-xs font-medium text-teal-600">
              Admin Portal
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4 flex-1 overflow-y-auto">
        <SidebarMenu>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
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
                  <span className={`ml-3 ${!open && "hidden"}`}>
                    {item.name}
                  </span>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4 flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full h-10 items-center px-3 hover:bg-gray-100"
            >
              <Avatar className="h-8 w-8 border-2 border-teal-200">
                <AvatarImage src="/placeholder.svg" alt="Admin User" />
                <AvatarFallback className="bg-gradient-to-br from-teal-600 to-sky-600 text-white">
                  AD
                </AvatarFallback>
              </Avatar>
              <div
                className={`ml-2 flex flex-col items-start ${!open && "hidden"}`}
              >
                <span className="text-sm font-medium">Admin User</span>
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
            <DropdownMenuItem
              onClick={handleLogout}
              asChild
              className="cursor-pointer text-red-500 focus:text-red-500"
            >
              <button className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
