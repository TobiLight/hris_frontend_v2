import { AdminDashboardHeader } from "@/components/admin/dashboard-header"
import { LeaveStats } from "@/components/admin/leave/leave-stats"
import { LeaveRequests } from "@/components/admin/leave/leave-requests"
import { LeaveCalendar } from "@/components/admin/leave/leave-calendar"
import { LeaveFilters } from "@/components/admin/leave/leave-filters"
import { Button } from "@/components/ui/button"
import { FileText, Calendar } from "lucide-react"
import Link from "next/link"

export default function LeavePage() {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Leave Management</h1>
            <p className="text-gray-500">Manage employee leave requests and balances</p>
          </div>
          <div className="mt-4 flex gap-2 sm:mt-0">
            <Button variant="outline" asChild>
              <Link href="/admin/leave/report">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Link>
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700" asChild>
              <Link href="/admin/leave/calendar">
                <Calendar className="mr-2 h-4 w-4" />
                View Calendar
              </Link>
            </Button>
          </div>
        </div>

        <LeaveStats />

        <div className="mt-6">
          <LeaveFilters />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LeaveRequests />
          </div>
          <div className="lg:col-span-1">
            <LeaveCalendar />
          </div>
        </div>
      </div>
    </div>
  )
}
