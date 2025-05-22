import { AdminDashboardHeader } from "@/components/admin/dashboard-header"
import { DepartmentEditForm } from "@/components/admin/departments/department-edit-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function EditDepartmentPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-1">
            <Link
              href={`/admin/departments/${params.id}`}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Department Details
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Edit Department</h1>
          <p className="text-gray-500">Update department information</p>
        </div>

        <DepartmentEditForm id={params.id} />
      </div>
    </div>
  )
}
