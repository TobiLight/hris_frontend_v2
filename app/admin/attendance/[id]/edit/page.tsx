import { AdminDashboardHeader } from "@/components/admin/dashboard-header"
import { AttendanceRecordEditForm } from "@/components/admin/attendance/attendance-record-edit-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AttendanceRecordEditPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/admin/attendance/${params.id}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Edit Attendance Record</h1>
            <p className="text-gray-500">Record ID: {params.id}</p>
          </div>
        </div>

        <AttendanceRecordEditForm id={params.id} />
      </div>
    </div>
  )
}
