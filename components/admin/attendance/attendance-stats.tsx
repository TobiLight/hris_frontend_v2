import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, Calendar, AlertTriangle } from "lucide-react"

export function AttendanceStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-teal-500 to-teal-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Present Today</CardTitle>
          <div className="rounded-full bg-teal-100 p-2 text-teal-600">
            <Users className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">112</div>
          <p className="text-xs text-muted-foreground">90.3% of total employees</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-sky-500 to-sky-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">On Leave</CardTitle>
          <div className="rounded-full bg-sky-100 p-2 text-sky-600">
            <Calendar className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">6.5% of total employees</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-amber-500 to-amber-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
          <div className="rounded-full bg-amber-100 p-2 text-amber-600">
            <Clock className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">4</div>
          <p className="text-xs text-muted-foreground">3.2% of total employees</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-red-500 to-red-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Absent</CardTitle>
          <div className="rounded-full bg-red-100 p-2 text-red-600">
            <AlertTriangle className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">0% of total employees</p>
        </CardContent>
      </Card>
    </div>
  )
}
