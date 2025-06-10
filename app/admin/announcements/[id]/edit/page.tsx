import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { AnnouncementForm } from "@/components/admin/announcements/announcement-form"

interface EditAnnouncementPageProps {
  params: {
    id: string
  }
}

export default function EditAnnouncementPage({ params }: EditAnnouncementPageProps) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Announcement</h1>
        <p className="text-muted-foreground">Update an existing announcement</p>
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
        <AnnouncementForm announcementId={params.id} />
      </Suspense>
    </div>
  )
}
