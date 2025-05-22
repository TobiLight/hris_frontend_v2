import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"

const attendanceHistory = [
  {
    id: 1,
    date: "May 20, 2024",
    clockIn: "9:00 AM",
    clockOut: "5:30 PM",
    duration: "8h 30m",
    status: "Present",
  },
  {
    id: 2,
    date: "May 19, 2024",
    clockIn: "8:45 AM",
    clockOut: "5:15 PM",
    duration: "8h 30m",
    status: "Present",
  },
  {
    id: 3,
    date: "May 18, 2024",
    clockIn: "9:15 AM",
    clockOut: "5:45 PM",
    duration: "8h 30m",
    status: "Present",
  },
  {
    id: 4,
    date: "May 17, 2024",
    clockIn: "-",
    clockOut: "-",
    duration: "-",
    status: "Absent",
  },
  {
    id: 5,
    date: "May 16, 2024",
    clockIn: "8:55 AM",
    clockOut: "5:25 PM",
    duration: "8h 30m",
    status: "Present",
  },
]

export function AttendanceHistory() {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="border-b bg-gray-50 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Attendance History</CardTitle>
            <CardDescription>Your recent attendance records</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {attendanceHistory.map((record) => (
            <div key={record.id} className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-teal-100 p-2 text-teal-600">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium">{record.date}</h4>
                  <div className="mt-1 grid grid-cols-2 gap-x-4 text-sm text-gray-500">
                    <div>In: {record.clockIn}</div>
                    <div>Out: {record.clockOut}</div>
                    <div className="col-span-2">Duration: {record.duration}</div>
                  </div>
                </div>
              </div>
              <Badge
                variant="outline"
                className={
                  record.status === "Present"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : "bg-red-100 text-red-800 hover:bg-red-100"
                }
              >
                {record.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
