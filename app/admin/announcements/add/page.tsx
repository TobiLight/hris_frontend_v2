import { AnnouncementForm } from "@/components/admin/announcements/announcement-form";
import { AdminDashboardHeader } from "@/components/admin/dashboard-header";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AddAnnouncementPage() {
  return (
    // <div className="p-6 space-y-6">
    //   <div>
    //     <h1 className="text-3xl font-bold tracking-tight">Add Announcement</h1>
    //     <p className="text-muted-foreground">Create a new company announcement</p>
    //   </div>

    //   <AnnouncementForm />
    // </div>
    <div className="flex flex-col">
          <AdminDashboardHeader />
          <div className="p-4 sm:p-6">
            <div className="mb-6">
              <Button variant="ghost" size="sm" asChild className="mb-4">
                <Link
                  href="/admin/announcements"
                  className="flex items-center text-gray-500 hover:text-gray-700"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back to Announcements
                </Link>
              </Button>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Add Announcement
              </h1>
              <p className="text-gray-500">
                Create a new company announcement
              </p>
            </div>
            <AnnouncementForm />
          </div>
        </div>
  )
}
