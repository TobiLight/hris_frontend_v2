import { AdminDashboardHeader } from "@/components/admin/dashboard-header"
import { AttendanceOverview } from "@/components/admin/attendance/attendance-overview"
import { AttendanceList } from "@/components/admin/attendance/attendance-list"
import { AttendanceFilters } from "@/components/admin/attendance/attendance-filters"
import { AttendanceStats } from "@/components/admin/attendance/attendance-stats"
import { Button } from "@/components/ui/button"
import { Download, FileText, Users } from "lucide-react"
import Link from "next/link"

export default function AttendancePage() {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Attendance Management</h1>
            <p className="text-gray-500">Track and manage employee attendance records</p>
          </div>
          <div className="mt-4 flex gap-2 sm:mt-0">
            <Button variant="outline" asChild>
              <Link href="/admin/attendance/records">
                <Users className="mr-2 h-4 w-4" />
                View All Records
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/attendance/report">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Link>
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700" asChild>
              <Link href="/admin/attendance/export">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Link>
            </Button>
          </div>
        </div>

        <AttendanceStats />

        <div className="mt-6">
          <AttendanceFilters />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <AttendanceOverview />
          </div>
          <div className="lg:col-span-2">
            <AttendanceList />
          </div>
        </div>
      </div>
    </div>
  )
}
