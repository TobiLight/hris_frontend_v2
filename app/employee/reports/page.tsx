import { DashboardHeader } from "@/components/employee/dashboard-header"
import { ReportsOverview } from "@/components/employee/reports/overview"
import { ReportsList } from "@/components/employee/reports/list"

export default function ReportsPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold tracking-tight">Reports</h1>
        <div className="grid gap-6">
          <ReportsOverview />
          <ReportsList />
        </div>
      </div>
    </div>
  )
}
