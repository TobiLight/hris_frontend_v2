import { AdminDashboardHeader } from "@/components/admin/dashboard-header"
import { DepartmentEmployees } from "@/components/admin/departments/department-employees"
import { Button } from "@/components/ui/button"
import { ChevronLeft, UserPlus } from "lucide-react"
import Link from "next/link"

export default function DepartmentEmployeesPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Button variant="ghost" size="sm" asChild className="mb-1">
              <Link
                href={`/admin/departments/${params.id}`}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Department Details
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Department Employees</h1>
            <p className="text-gray-500">View and manage employees in this department</p>
          </div>
          <Button asChild size="sm">
            <Link href="/admin/employees-add">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Link>
          </Button>
        </div>

        <DepartmentEmployees id={params.id} />
      </div>
    </div>
  )
}
