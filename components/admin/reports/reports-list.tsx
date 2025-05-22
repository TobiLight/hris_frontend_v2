import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, FileText, Download, Calendar, Clock, Users, DollarSign, Award, Building } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample reports data
const reports = [
  {
    id: 1,
    name: "Employee Directory",
    category: "Employees",
    description: "Complete list of all employees with contact details",
    lastGenerated: "May 25, 2024",
    format: "Excel",
    icon: Users,
  },
  {
    id: 2,
    name: "Monthly Attendance Summary",
    category: "Attendance",
    description: "Summary of attendance records for the current month",
    lastGenerated: "May 25, 2024",
    format: "PDF",
    icon: Clock,
  },
  {
    id: 3,
    name: "Leave Balance Report",
    category: "Leave",
    description: "Current leave balances for all employees",
    lastGenerated: "May 15, 2024",
    format: "Excel",
    icon: Calendar,
  },
  {
    id: 4,
    name: "Payroll Summary",
    category: "Payroll",
    description: "Summary of payroll expenses for the current month",
    lastGenerated: "May 10, 2024",
    format: "PDF",
    icon: DollarSign,
  },
  {
    id: 5,
    name: "Performance Review Status",
    category: "Performance",
    description: "Status of all scheduled performance reviews",
    lastGenerated: "May 5, 2024",
    format: "Excel",
    icon: Award,
  },
  {
    id: 6,
    name: "Department Headcount",
    category: "Departments",
    description: "Employee count by department and location",
    lastGenerated: "May 1, 2024",
    format: "Excel",
    icon: Building,
  },
]

export function ReportsList() {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Employees":
        return "bg-teal-100 text-teal-800 hover:bg-teal-100"
      case "Attendance":
        return "bg-sky-100 text-sky-800 hover:bg-sky-100"
      case "Leave":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
      case "Payroll":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "Performance":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "Departments":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="border-b bg-gray-50 p-4 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>Generate and download reports</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All Reports
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Last Generated</TableHead>
                <TableHead>Format</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-gray-100 p-2">
                        <report.icon className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-gray-500">{report.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getCategoryColor(report.category)}>
                      {report.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.lastGenerated}</TableCell>
                  <TableCell>{report.format}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Generate
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>Schedule</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
