import { AdminDashboardHeader } from "@/components/admin/dashboard-header"
import { RunPayrollForm } from "@/components/admin/payroll/run-payroll-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RunPayrollPage() {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/payroll">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Run Payroll</h1>
            <p className="text-gray-500">Process payroll for the current period</p>
          </div>
        </div>

        <RunPayrollForm />
      </div>
    </div>
  )
}
