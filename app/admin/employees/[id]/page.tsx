import { Suspense } from "react"
import { AdminDashboardHeader } from "@/components/admin/dashboard-header"
import { EmployeeProfileView } from "@/components/admin/employees/employee-profile"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

interface PageProps {
  params: { id: string }
}
export default function EmployeeViewPage({ params }: PageProps) {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/admin/employees" className="flex items-center text-gray-500 hover:text-gray-700">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Employees
          </Link>
        </Button>

        <Suspense fallback={<EmployeeProfileSkeleton />}>
          <EmployeeProfileView employeeId={params.id} />
        </Suspense>
      </div>
    </div>
  )
}

function EmployeeProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="border rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-200 h-32 sm:h-40"></div>
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-20 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <Skeleton className="h-24 w-24 sm:h-32 sm:w-32 rounded-full" />
              <div className="mt-4 sm:mt-0 sm:ml-6">
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <div className="grid gap-6 md:grid-cols-2">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
