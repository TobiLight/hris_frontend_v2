import { DashboardHeader } from "@/components/employee/dashboard-header"
import { PerformanceOverview } from "@/components/employee/performance/overview"
import { PerformanceGoals } from "@/components/employee/performance/goals"
import { PerformanceReviews } from "@/components/employee/performance/reviews"
import { PerformanceChart } from "@/components/employee/performance/performance-chart"

export default function PerformancePage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="p-4 sm:p-6">
        <h1 className="mb-6 text-xl font-bold tracking-tight sm:text-2xl">Performance</h1>
        <div className="grid gap-6">
          <PerformanceOverview />
          <PerformanceChart />
          <div className="grid gap-6 md:grid-cols-2">
            <PerformanceGoals />
            <PerformanceReviews />
          </div>
        </div>
      </div>
    </div>
  )
}
