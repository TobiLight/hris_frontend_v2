import { Suspense } from "react";
import { AdminDashboardHeader } from "@/components/admin/dashboard-header";
import { EmploymentTypeForm } from "@/components/admin/employment-types/employment-type-form";
import { Skeleton } from "@/components/ui/skeleton";
import {  ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EditEmploymentTypePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-1">
            <Link
              href={`/admin/employment-types`}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Employment types
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Edit Employment Type
          </h1>
          <p className="text-gray-500">Update employment type information</p>
        </div>

        <Suspense fallback={<EmploymentTypeFormSkeleton />}>
          <EmploymentTypeForm employmentTypeId={params.id} />
        </Suspense>
      </div>
    </div>
  );
}

function EmploymentTypeFormSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-1/4" />
    </div>
  );
}
