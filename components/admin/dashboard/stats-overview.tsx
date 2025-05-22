"use client"

import type { DashboardStats } from "@/lib/api/dashboard-service"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Briefcase, CalendarClock, TrendingUp, UserPlus } from "lucide-react"

interface AdminStatsOverviewProps {
  stats: DashboardStats
}

export function AdminStatsOverview({ stats }: AdminStatsOverviewProps) {
  const statsItems = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      change: "+2.5%",
      icon: Users,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
    },
    {
      title: "Departments",
      value: stats.departmentsCount,
      change: "0%",
      icon: Briefcase,
      iconColor: "text-teal-500",
      iconBg: "bg-teal-100",
    },
    {
      title: "Pending Leaves",
      value: stats.pendingLeaveRequests,
      change: "+4.3%",
      icon: CalendarClock,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-100",
    },
    {
      title: "Attendance Rate",
      value: `${stats.attendanceRate}%`,
      change: "+1.2%",
      icon: TrendingUp,
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
    },
    {
      title: "New Hires",
      value: stats.newHires,
      change: "+3",
      icon: UserPlus,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-100",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
      {statsItems.map((item, index) => (
        <Card key={index} className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${item.iconBg}`}>
                <item.icon className={`h-6 w-6 ${item.iconColor}`} />
              </div>
              <div className="text-sm font-medium text-green-600">{item.change}</div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="text-sm text-gray-500">{item.title}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
