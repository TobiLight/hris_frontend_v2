import { AdminDashboardHeader } from "@/components/admin/dashboard-header"
import { DepartmentDetails } from "@/components/admin/departments/department-details"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Edit, Users } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: { id: string }
}

export default function DepartmentDetailsPage({ params }: PageProps) {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Button variant="ghost" size="sm" asChild className="mb-1">
              <Link href="/admin/departments" className="flex items-center text-gray-500 hover:text-gray-700">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Departments
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Department Details</h1>
            <p className="text-gray-500">View and manage department information</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href={`/admin/departments/${params.id}/employees`}>
                <Users className="mr-2 h-4 w-4" />
                View Employees
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href={`/admin/departments/${params.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Department
              </Link>
            </Button>
          </div>
        </div>

        <DepartmentDetails id={params.id} />
      </div>
    </div>
  )
}
