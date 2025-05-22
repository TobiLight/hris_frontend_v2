import { AdminDashboardHeader } from "@/components/admin/dashboard-header"
import { PayrollStats } from "@/components/admin/payroll/payroll-stats"
import { PayrollList } from "@/components/admin/payroll/payroll-list"
import { PayrollFilters } from "@/components/admin/payroll/payroll-filters"
import { PayrollSummary } from "@/components/admin/payroll/payroll-summary"
import { Button } from "@/components/ui/button"
import { FileText, DollarSign } from "lucide-react"
import Link from "next/link"

export default function PayrollPage() {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Payroll Management</h1>
            <p className="text-gray-500">Manage employee compensation and payment records</p>
          </div>
          <div className="mt-4 flex gap-2 sm:mt-0">
            <Button variant="outline" asChild>
              <Link href="/admin/payroll/report">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Link>
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700" asChild>
              <Link href="/admin/payroll/run">
                <DollarSign className="mr-2 h-4 w-4" />
                Run Payroll
              </Link>
            </Button>
          </div>
        </div>

        <PayrollStats />

        <div className="mt-6">
          <PayrollFilters />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <PayrollSummary />
          </div>
          <div className="lg:col-span-2">
            <PayrollList />
          </div>
        </div>
      </div>
    </div>
  )
}
