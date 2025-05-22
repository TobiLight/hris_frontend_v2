import type { Metadata } from "next"
import { SettingsHeader } from "@/components/admin/settings/settings-header"
import { SettingsTabs } from "@/components/admin/settings/settings-tabs"

export const metadata: Metadata = {
  title: "System Settings | HRMS Admin",
  description: "Configure system settings for your HR Management System",
}

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <SettingsHeader />
      <div className="flex-1 p-6">
        <SettingsTabs />
      </div>
    </div>
  )
}
