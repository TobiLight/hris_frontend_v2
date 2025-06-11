import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { AdminDashboardHeader } from "@/components/admin/dashboard-header";
import { PermissionForm } from "@/components/admin/permissions/permission-form";

export default function AddPermissionPage() {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link
              href="/admin/permissions"
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Permissions
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Add New Permission
          </h1>
          <p className="text-gray-500">
            Create a new Permission record in the system
          </p>
        </div>
        <PermissionForm />
      </div>
    </div>
  );
}
