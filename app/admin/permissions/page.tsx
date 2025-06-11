import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AdminDashboardHeader } from "@/components/admin/dashboard-header";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { PermissionList } from "@/components/admin/permissions/permission-list";

function PermissionListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function PermissionsPage() {
  return (
    <div className="flex flex-col">
      
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Permissions
            </h1>
            <p className="text-gray-500">
              Manage your organization's permissions
            </p>
          </div>
          <Button
            className="mt-4 bg-teal-600 hover:bg-teal-700 sm:mt-0"
            asChild
          >
            <Link href="/admin/permissions/add">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Permission
            </Link>
          </Button>
        </div>
        <Suspense fallback={<PermissionListSkeleton />}>
          <PermissionList />
        </Suspense>
      </div>
    </div>
  );
}
