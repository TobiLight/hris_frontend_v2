import { AdminDashboardHeader } from "@/components/admin/dashboard-header"
import { ReportsList } from "@/components/admin/reports/reports-list"
import { ReportsCategories } from "@/components/admin/reports/reports-categories"
import { RecentReports } from "@/components/admin/reports/recent-reports"
import { Button } from "@/components/ui/button"
import { Download, Plus } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Reports</h1>
            <p className="text-gray-500">Generate and manage HR reports</p>
          </div>
          <div className="mt-4 flex gap-2 sm:mt-0">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Report
            </Button>
          </div>
        </div>

        <ReportsCategories />

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <RecentReports />
          </div>
          <div className="lg:col-span-2">
            <ReportsList />
          </div>
        </div>
      </div>
    </div>
  )
}
