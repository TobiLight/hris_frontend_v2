import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdminDashboardHeader } from "@/components/admin/dashboard-header";


interface EditLeaveTypePageProps {
  params: {
    id: string;
  };
}

export default function EditLeaveTypePage({ params }: EditLeaveTypePageProps) {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-1">
            <Link
              href={`/admin/leave-types`}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Leave Types
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Edit Leave Type
          </h1>
          <p className="text-gray-500">Update Leave Type information</p>
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
          <LeaveTypeForm leaveTypeId={params.id} />
        </Suspense>
      </div>
    </div>
  );
}
