import { PermissionForm } from "@/components/admin/permissions/permission-form";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdminDashboardHeader } from "@/components/admin/dashboard-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

interface EditPermissionPageProps {
  params: {
    id: string;
  };
}

export default function EditPermissionPage({
  params,
}: EditPermissionPageProps) {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-1">
            <Link
              href={`/admin/payroll-classes`}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Permissions
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Edit Permission
          </h1>
          <p className="text-gray-500">Update Permission information</p>
        </div>

        <Suspense
          fallback={
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          }
        >
          <PermissionForm permissionId={params.id} />
        </Suspense>
      </div>
    </div>
  );
}
