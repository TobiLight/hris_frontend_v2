import { AdminDashboardHeader } from "@/components/admin/dashboard-header"
import { AttendanceRecordDetails } from "@/components/admin/attendance/attendance-record-details"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Download } from "lucide-react"
import Link from "next/link"

export default function AttendanceRecordPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/attendance">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">Attendance Record Details</h1>
              <p className="text-gray-500">Record ID: {params.id}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2 sm:mt-0">
            <Button variant="outline" asChild>
              <Link href={`/admin/attendance/${params.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Record
              </Link>
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700" asChild>
              <Link href={`/admin/attendance/${params.id}/export`}>
                <Download className="mr-2 h-4 w-4" />
                Export Record
              </Link>
            </Button>
          </div>
        </div>

        <AttendanceRecordDetails id={params.id} />
      </div>
    </div>
  )
}
