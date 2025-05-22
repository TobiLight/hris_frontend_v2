import { DashboardHeader } from "@/components/employee/dashboard-header"
import { ProfileInfo } from "@/components/employee/profile/info"
import { ProfileSettings } from "@/components/employee/profile/settings"

export default function ProfilePage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="p-4 sm:p-6">
        <h1 className="mb-6 text-xl font-bold tracking-tight sm:text-2xl">My Profile</h1>
        <div className="grid gap-6 lg:grid-cols-2">
          <ProfileInfo />
          <ProfileSettings />
        </div>
      </div>
    </div>
  )
}
