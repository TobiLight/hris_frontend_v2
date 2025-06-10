import { Suspense } from "react";
import { LeaveTypeList } from "@/components/admin/leave-types/leave-type-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminDashboardHeader } from "@/components/admin/dashboard-header";
import { PlusCircle } from "lucide-react";

export default function LeaveTypesPage() {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Leave Types
            </h1>
            <p className="text-gray-500">
              Manage your organization's leave types
            </p>
          </div>
          <Button
            className="mt-4 bg-teal-600 hover:bg-teal-700 sm:mt-0"
            asChild
          >
            <Link href="/admin/leave-types/add">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Leave Type
            </Link>
          </Button>
        </div>
        <Suspense
          fallback={
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          }
        >
          <LeaveTypeList />
        </Suspense>
      </div>
    </div>
  );
}
