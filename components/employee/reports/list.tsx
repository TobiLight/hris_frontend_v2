import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Clock, Calendar, DollarSign, Award } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const reports = [
  {
    id: 1,
    name: "Monthly Attendance Summary",
    category: "Attendance",
    lastUpdated: "May 20, 2024",
    icon: Clock,
  },
  {
    id: 2,
    name: "Quarterly Leave Balance",
    category: "Leave",
    lastUpdated: "April 1, 2024",
    icon: Calendar,
  },
  {
    id: 3,
    name: "Annual Payroll Statement",
    category: "Payroll",
    lastUpdated: "January 15, 2024",
    icon: DollarSign,
  },
  {
    id: 4,
    name: "Performance Review History",
    category: "Performance",
    lastUpdated: "April 20, 2024",
    icon: Award,
  },
  {
    id: 5,
    name: "Leave Usage Trends",
    category: "Leave",
    lastUpdated: "May 1, 2024",
    icon: Calendar,
  },
  {
    id: 6,
    name: "Overtime Report",
    category: "Attendance",
    lastUpdated: "May 15, 2024",
    icon: Clock,
  },
]

export function ReportsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Reports</CardTitle>
        <CardDescription>Access and download your reports</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <report.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {report.name}
                  </div>
                </TableCell>
                <TableCell>{report.category}</TableCell>
                <TableCell>{report.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
