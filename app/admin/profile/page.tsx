import type { Metadata } from "next"
import ProfileHeader from "@/components/admin/profile/profile-header"
import ProfileTabs from "@/components/admin/profile/profile-tabs"

export const metadata: Metadata = {
  title: "Admin Profile | HRMS",
  description: "Manage your admin profile and account settings",
}

export default function AdminProfilePage() {
  return (
    <div className="container mx-auto py-6 space-y-8 max-w-6xl">
      <ProfileHeader />
      <ProfileTabs />
    </div>
  )
}
