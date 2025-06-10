import { Suspense } from "react";
import { AdminDashboardHeader } from "@/components/admin/dashboard-header";
import { Skeleton } from "@/components/ui/skeleton";
import { EmployeeEditForm } from "@/components/admin/employees/employee-edit-form";
import {  ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EditEmployeePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <Button variant="ghost" size="sm" asChild className="mb-3">
          <Link
            href={`/admin/employees/${params.id}`}
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Employees Details
          </Link>
        </Button>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Edit Employee
          </h1>
          <p className="text-gray-500">Update employee information</p>
        </div>
        <Suspense fallback={<EmployeeEditFormSkeleton />}>
          <EmployeeEditForm employeeId={params.id} />
        </Suspense>
      </div>
    </div>
  );
}

function EmployeeEditFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-10 w-1/4" />
    </div>
  );
}
