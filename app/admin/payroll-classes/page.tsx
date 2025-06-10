import { Suspense } from "react";
import { PayrollClassList } from "@/components/admin/payroll-classes/payroll-class-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminDashboardHeader } from "@/components/admin/dashboard-header";
import { PlusCircle } from "lucide-react";

export default function PayrollClassesPage() {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Payroll Classes
            </h1>
            <p className="text-gray-500">
              Manage your organization's payroll grade level
            </p>
          </div>
          <Button
            className="mt-4 bg-teal-600 hover:bg-teal-700 sm:mt-0"
            asChild
          >
            <Link href="/admin/payroll-classes/add">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Payroll Class
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
          <PayrollClassList />
        </Suspense>
      </div>
    </div>
  );
}
