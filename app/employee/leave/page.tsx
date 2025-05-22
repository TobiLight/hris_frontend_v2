import { DashboardHeader } from "@/components/employee/dashboard-header"
import { LeaveBalance } from "@/components/employee/leave/balance"
import { LeaveRequest } from "@/components/employee/leave/request"
import { LeaveHistory } from "@/components/employee/leave/history"

export default function LeavePage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold tracking-tight">Leave Management</h1>
        <div className="grid gap-6">
          <LeaveBalance />
          <div className="grid gap-6 md:grid-cols-2">
            <LeaveRequest />
            <LeaveHistory />
          </div>
        </div>
      </div>
    </div>
  )
}
