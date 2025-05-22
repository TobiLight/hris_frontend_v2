import { AdminDashboardHeader } from "@/components/admin/dashboard-header"
import { PerformanceStats } from "@/components/admin/performance/performance-stats"
import { PerformanceReviews } from "@/components/admin/performance/performance-reviews"
import { PerformanceOverview } from "@/components/admin/performance/performance-overview"
import { PerformanceGoals } from "@/components/admin/performance/performance-goals"
import { Button } from "@/components/ui/button"
import { FileText, BarChart3 } from "lucide-react"

export default function PerformancePage() {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Performance Management</h1>
            <p className="text-gray-500">Track and manage employee performance metrics</p>
          </div>
          <div className="mt-4 flex gap-2 sm:mt-0">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </div>
        </div>

        <PerformanceStats />

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <PerformanceOverview />
          <PerformanceGoals />
        </div>

        <div className="mt-6">
          <PerformanceReviews />
        </div>
      </div>
    </div>
  )
}
