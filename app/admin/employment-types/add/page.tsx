import { AdminDashboardHeader } from "@/components/admin/dashboard-header";
import { EmploymentTypeForm } from "@/components/admin/employment-types/employment-type-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AddEmploymentTypePage() {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link
              href="/admin/employment-types"
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Employment types
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Add New Employment type
          </h1>
          <p className="text-gray-500">
            Create a new employment type record in the system
          </p>
        </div>
        <EmploymentTypeForm />
      </div>
    </div>
  );
}
