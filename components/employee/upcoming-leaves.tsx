import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"

const upcomingLeaves = [
  {
    id: 1,
    type: "Annual Leave",
    startDate: "June 10, 2024",
    endDate: "June 15, 2024",
    status: "Approved",
    days: 5,
  },
  {
    id: 2,
    type: "Sick Leave",
    startDate: "July 5, 2024",
    endDate: "July 5, 2024",
    status: "Pending",
    days: 1,
  },
]

export function UpcomingLeaves() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="border-b bg-gray-50 p-4 pb-3">
        <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <CardTitle>Upcoming Leaves</CardTitle>
            <CardDescription>Your scheduled time off</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="mt-2 text-teal-600 hover:text-teal-700 sm:mt-0">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {upcomingLeaves.length > 0 ? (
          <div className="divide-y">
            {upcomingLeaves.map((leave) => (
              <div
                key={leave.id}
                className="flex flex-col p-4 transition-colors hover:bg-gray-50 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex gap-3">
                  <div className="rounded-full bg-teal-100 p-2 text-teal-600 flex-shrink-0">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium truncate">{leave.type}</h4>
                    <p className="text-sm text-gray-500 truncate">
                      {leave.startDate} {leave.startDate !== leave.endDate && `- ${leave.endDate}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {leave.days} day{leave.days > 1 && "s"}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={leave.status === "Approved" ? "default" : "outline"}
                  className={`mt-2 sm:mt-0 ${
                    leave.status === "Approved"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  }`}
                >
                  {leave.status}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <Calendar className="h-12 w-12 text-gray-300" />
            <p className="mt-2 text-center text-sm text-gray-500">No upcoming leaves scheduled</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
