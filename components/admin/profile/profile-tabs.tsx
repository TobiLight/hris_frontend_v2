"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PersonalInformation from "./personal-information"
import AccountSettings from "./account-settings"
import SecuritySettings from "./security-settings"
import ActivityLog from "./activity-log"
import NotificationPreferences from "./notification-preferences"

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="activity">Activity Log</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="mt-6">
        <PersonalInformation />
      </TabsContent>

      <TabsContent value="account" className="mt-6">
        <AccountSettings />
      </TabsContent>

      <TabsContent value="security" className="mt-6">
        <SecuritySettings />
      </TabsContent>

      <TabsContent value="activity" className="mt-6">
        <ActivityLog />
      </TabsContent>

      <TabsContent value="notifications" className="mt-6">
        <NotificationPreferences />
      </TabsContent>
    </Tabs>
  )
}
