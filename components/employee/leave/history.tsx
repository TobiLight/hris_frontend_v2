import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const leaveHistory = [
  {
    id: 1,
    type: "Annual Leave",
    startDate: "June 10, 2024",
    endDate: "June 15, 2024",
    days: 5,
    status: "Approved",
  },
  {
    id: 2,
    type: "Sick Leave",
    startDate: "July 5, 2024",
    endDate: "July 5, 2024",
    days: 1,
    status: "Pending",
  },
  {
    id: 3,
    type: "Personal Leave",
    startDate: "March 15, 2024",
    endDate: "March 15, 2024",
    days: 1,
    status: "Approved",
  },
  {
    id: 4,
    type: "Annual Leave",
    startDate: "January 10, 2024",
    endDate: "January 12, 2024",
    days: 3,
    status: "Approved",
  },
]

export function LeaveHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave History</CardTitle>
        <CardDescription>Your recent leave requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaveHistory.map((leave) => (
            <div key={leave.id} className="flex items-start justify-between rounded-lg border p-3">
              <div>
                <h4 className="font-medium">{leave.type}</h4>
                <p className="text-sm text-gray-500">
                  {leave.startDate} {leave.startDate !== leave.endDate && `- ${leave.endDate}`}
                </p>
                <p className="text-sm text-gray-500">
                  {leave.days} day{leave.days > 1 && "s"}
                </p>
              </div>
              <Badge
                variant="outline"
                className={
                  leave.status === "Approved"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : leave.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                }
              >
                {leave.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
