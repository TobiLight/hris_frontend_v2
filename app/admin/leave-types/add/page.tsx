import { LeaveTypeForm } from "@/components/admin/leave-types/leave-type-form"

export default function AddLeaveTypePage() {
  return (
    <div className="flex flex-col">
     <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link
              href="/admin/payroll-classes"
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Payroll Classes
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Add New Payroll Class
          </h1>
          <p className="text-gray-500">
            Create a new payroll class record in the system
          </p>
        </div>
        <PayrollClassForm />
      </div>
      <LeaveTypeForm />
    </div>
  )
}
