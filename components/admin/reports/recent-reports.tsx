import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Calendar, Clock, Users, DollarSign } from "lucide-react"

// Sample recent reports data
const recentReports = [
  {
    id: 1,
    name: "Monthly Attendance Summary",
    date: "May 25, 2024",
    category: "Attendance",
    icon: Clock,
  },
  {
    id: 2,
    name: "Employee Headcount",
    date: "May 20, 2024",
    category: "Employees",
    icon: Users,
  },
  {
    id: 3,
    name: "Leave Balance Report",
    date: "May 15, 2024",
    category: "Leave",
    icon: Calendar,
  },
  {
    id: 4,
    name: "Payroll Summary",
    date: "May 10, 2024",
    category: "Payroll",
    icon: DollarSign,
  },
]

export function RecentReports() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="border-b bg-gray-50 p-4 pb-3">
        <CardTitle>Recent Reports</CardTitle>
        <CardDescription>Recently generated reports</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {recentReports.map((report) => (
            <div key={report.id} className="flex items-start justify-between p-4 hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-gray-100 p-2 mt-1">
                  <report.icon className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium">{report.name}</h4>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{report.category}</span>
                    <span className="mx-2">•</span>
                    <span>{report.date}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
