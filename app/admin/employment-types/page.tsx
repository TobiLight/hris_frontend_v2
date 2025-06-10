import { Suspense } from "react";
import { AdminDashboardHeader } from "@/components/admin/dashboard-header";
import { EmploymentTypeList } from "@/components/admin/employment-types/employment-type-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function EmploymentTypesPage() {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Employment Types
            </h1>
            <p className="text-gray-500">
              Manage your organization's employmenet types
            </p>
          </div>
          <Button
            className="mt-4 bg-teal-600 hover:bg-teal-700 sm:mt-0"
            asChild
          >
            <Link href="/admin/employment-types/add">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Employment Type
            </Link>
          </Button>
        </div>

        <Suspense fallback={<EmploymentTypeListSkeleton />}>
          <EmploymentTypeList />
        </Suspense>
      </div>
    </div>
  );
}

function EmploymentTypeListSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}
