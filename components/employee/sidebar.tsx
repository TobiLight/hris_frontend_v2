"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Clock,
  FileText,
  Home,
  LogOut,
  Settings,
  User,
  DollarSign,
  BarChart3,
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
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";

const navigation = [
  { name: "Dashboard", href: "/employee/dashboard", icon: Home },
  { name: "Attendance", href: "/employee/attendance", icon: Clock },
  { name: "Payroll", href: "/employee/payroll", icon: DollarSign },
  { name: "Leave", href: "/employee/leave", icon: Calendar },
  { name: "Performance", href: "/employee/performance", icon: BarChart3 },
  { name: "Reports", href: "/employee/reports", icon: FileText },
  { name: "My Profile", href: "/employee/profile", icon: User },
];

export function EmployeeSidebar() {
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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-sky-500 text-white shadow-md">
            <span className="text-lg font-bold">BT</span>
          </div>
          <div className={`flex flex-col ${!open && "hidden"}`}>
            <span className="text-sm font-bold text-gray-900">BTMS HRMS</span>
            <span className="text-xs font-medium text-teal-600">
              Employee Portal
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
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={`group my-1 h-10 transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-teal-500 to-sky-500 text-white shadow-md"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Link
                    href={item.href}
                    className="flex h-full w-full items-center px-3 rounded-lg"
                  >
                    <item.icon
                      className={`h-5 w-5 flex-shrink-0 transition-all ${isActive ? "text-white" : "text-gray-500 group-hover:text-teal-600"}`}
                    />
                    <span className={`ml-3 ${!open && "hidden"}`}>
                      {item.name}
                    </span>
                  </Link>
                </SidebarMenuButton>
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
                <AvatarImage src="/placeholder.svg" alt="John Doe" />
                <AvatarFallback className="bg-gradient-to-br from-teal-500 to-sky-500 text-white">
                  JD
                </AvatarFallback>
              </Avatar>
              <div
                className={`ml-2 flex flex-col items-start ${!open && "hidden"}`}
              >
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-teal-600">Travel Consultant</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/employee/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/employee/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
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

export default EmployeeSidebar;
