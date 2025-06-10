import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminDashboardHeader } from "@/components/admin/dashboard-header";
import { AnnouncementList } from "@/components/admin/announcements/announcement-list";
import { PlusCircle } from "lucide-react";

export default function AnnouncementsPage() {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      {/* <div className="p-4 sm:p-6">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Announcements
                  </h1>
                  <p className="text-gray-500">
                    Manage your organization's announcements/                  </p>
                </div>
                <Button
                  className="mt-4 bg-teal-600 hover:bg-teal-700 sm:mt-0"
                  asChild
                >
                  <Link href="/admin/announcements/add">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Department
                  </Link>
                </Button>
              </div>
      
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription className="flex justify-between items-center">
                    {error}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={loadAnnouncements}
                      className="ml-2"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retry
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
      
              <div className="grid gap-6">
                {loading ? (
                  <>
                    <Skeleton className="h-[200px] w-full" />
                    <Skeleton className="h-[300px] w-full" />
                    <Skeleton className="h-[400px] w-full" />
                  </>
                ) : (
                  <>
                    <DepartmentStats
                      total={announcements/length}
                      totalEmployees={announcements/reduce(
                        (a, b) => a + b.team_members.length,
                        0
                      )}
                      allocation={0}
                    />
                    <DepartmentList announcements/{announcements/ />
                    <DepartmentStructure announcements/{announcements/ isLoading={loading} />
                  </>
                )}
              </div>
            </div> */}

      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Announcements
                  </h1>
                  <p className="text-gray-500">
                    Manage your organization's announcements/                  </p>
                </div>
                <Button
                  className="mt-4 bg-teal-600 hover:bg-teal-700 sm:mt-0"
                  asChild
                >
                  <Link href="/admin/announcements/add">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Department
                  </Link>
                </Button>
              </div>
        <Suspense
          fallback={
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          }
        >
          <AnnouncementList />
        </Suspense>
      </div>
    </div>
  );
}
