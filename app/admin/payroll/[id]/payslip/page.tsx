import { AdminDashboardHeader } from "@/components/admin/dashboard-header"
import { PayslipView } from "@/components/admin/payroll/payslip-view"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Printer } from "lucide-react"
import Link from "next/link"

export default function PayslipPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/payroll">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">Payslip</h1>
              <p className="text-gray-500">Payroll ID: {params.id}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2 sm:mt-0">
            <Button variant="outline" asChild>
              <Link href={`/admin/payroll/${params.id}/print`} target="_blank">
                <Printer className="mr-2 h-4 w-4" />
                Print Payslip
              </Link>
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700" asChild>
              <Link href={`/admin/payroll/${params.id}/download`}>
                <Download className="mr-2 h-4 w-4" />
                Download Payslip
              </Link>
            </Button>
          </div>
        </div>

        <PayslipView id={params.id} />
      </div>
    </div>
  )
}
