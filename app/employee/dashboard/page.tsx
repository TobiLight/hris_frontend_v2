import { DashboardHeader } from "@/components/employee/dashboard-header"
import { DashboardStats } from "@/components/employee/dashboard-stats"
import { RecentActivity } from "@/components/employee/recent-activity"
import { UpcomingLeaves } from "@/components/employee/upcoming-leaves"
import { WelcomeBanner } from "@/components/employee/welcome-banner"

export default function EmployeeDashboard() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="p-4 sm:p-6">
        <WelcomeBanner />
        <DashboardStats />
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <UpcomingLeaves />
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
