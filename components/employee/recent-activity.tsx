import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const activities = [
  {
    id: 1,
    action: "Clocked in",
    time: "Today, 9:00 AM",
    description: "Regular working hours",
    color: "bg-teal-500",
  },
  {
    id: 2,
    action: "Submitted leave request",
    time: "Yesterday, 4:30 PM",
    description: "Annual leave for June 10-15",
    color: "bg-sky-500",
  },
  {
    id: 3,
    action: "Completed training",
    time: "May 10, 2:15 PM",
    description: "Customer Service Excellence",
    color: "bg-emerald-500",
  },
  {
    id: 4,
    action: "Payslip generated",
    time: "April 30, 10:00 AM",
    description: "April 2024 salary",
    color: "bg-amber-500",
  },
]

export function RecentActivity() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="border-b bg-gray-50 p-4 pb-3">
        <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="mt-2 text-teal-600 hover:text-teal-700 sm:mt-0">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-4 p-4 transition-colors hover:bg-gray-50">
              <div className="relative mt-1 flex h-2 w-2 flex-shrink-0">
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full ${activity.color} opacity-75`}
                ></span>
                <span className={`relative inline-flex h-2 w-2 rounded-full ${activity.color}`}></span>
              </div>
              <div className="min-w-0">
                <p className="font-medium truncate">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
                <p className="text-sm text-gray-500 truncate">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
