"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RecentActivity } from "@/lib/api/dashboard-service"
import { CalendarClock, Clock, FileText, User, UserCog } from "lucide-react"

interface AdminRecentActivitiesProps {
  activities: RecentActivity[]
}

export function AdminRecentActivities({ activities }: AdminRecentActivitiesProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "leave":
        return <CalendarClock className="h-5 w-5 text-amber-500" />
      case "attendance":
        return <Clock className="h-5 w-5 text-green-500" />
      case "profile":
        return <User className="h-5 w-5 text-blue-500" />
      case "payroll":
        return <FileText className="h-5 w-5 text-purple-500" />
      case "department":
        return <UserCog className="h-5 w-5 text-teal-500" />
      default:
        return <User className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities && activities.length > 0 ? activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{activity.user.name}</div>
                  <div className="text-xs text-gray-500">{activity.timestamp}</div>
                </div>
                <p className="text-sm text-gray-500">
                  {activity.action} {activity.target && <span className="font-medium">{activity.target}</span>}
                </p>
              </div>
            </div>
          )) : <p>No recent activities</p> }
        </div>
      </CardContent>
    </Card>
  )
}
