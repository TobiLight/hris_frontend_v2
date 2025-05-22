import { DashboardHeader } from "@/components/employee/dashboard-header"
import { PayrollSummary } from "@/components/employee/payroll/summary"
import { PayrollHistory } from "@/components/employee/payroll/history"

export default function PayrollPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold tracking-tight">Payroll</h1>
        <div className="grid gap-6">
          <PayrollSummary />
          <PayrollHistory />
        </div>
      </div>
    </div>
  )
}
