import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const leaveTypes = [
  {
    id: 1,
    type: "Annual Leave",
    allocated: 18,
    used: 3,
    remaining: 15,
    percentage: 83.3,
  },
  {
    id: 2,
    type: "Sick Leave",
    allocated: 10,
    used: 2,
    remaining: 8,
    percentage: 80,
  },
  {
    id: 3,
    type: "Personal Leave",
    allocated: 5,
    used: 0,
    remaining: 5,
    percentage: 100,
  },
]

export function LeaveBalance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave Balance</CardTitle>
        <CardDescription>Your available leave days by type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {leaveTypes.map((leave) => (
            <div key={leave.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{leave.type}</h4>
                <span className="text-sm text-gray-500">
                  {leave.remaining}/{leave.allocated} days
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div className="h-2 rounded-full bg-teal-600" style={{ width: `${leave.percentage}%` }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Used: {leave.used} days</span>
                <span>Remaining: {leave.remaining} days</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
