"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GeneralSettings } from "./general-settings"
import { UserManagement } from "./user-management"
import { EmailSettings } from "./email-settings"
import { SecuritySettings } from "./security-settings"
import { IntegrationSettings } from "./integration-settings"
import { BackupSettings } from "./backup-settings"
import { Building, Users, Mail, Shield, LinkIcon, Database } from "lucide-react"

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-6 h-auto p-1 w-full max-w-4xl mx-auto">
        <TabsTrigger value="general" className="flex flex-col items-center py-2 px-4 gap-1">
          <Building className="h-4 w-4" />
          <span>General</span>
        </TabsTrigger>
        <TabsTrigger value="users" className="flex flex-col items-center py-2 px-4 gap-1">
          <Users className="h-4 w-4" />
          <span>Users</span>
        </TabsTrigger>
        <TabsTrigger value="email" className="flex flex-col items-center py-2 px-4 gap-1">
          <Mail className="h-4 w-4" />
          <span>Email</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex flex-col items-center py-2 px-4 gap-1">
          <Shield className="h-4 w-4" />
          <span>Security</span>
        </TabsTrigger>
        <TabsTrigger value="integrations" className="flex flex-col items-center py-2 px-4 gap-1">
          <LinkIcon className="h-4 w-4" />
          <span>Integrations</span>
        </TabsTrigger>
        <TabsTrigger value="backup" className="flex flex-col items-center py-2 px-4 gap-1">
          <Database className="h-4 w-4" />
          <span>Backup</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="space-y-4">
        <GeneralSettings />
      </TabsContent>
      <TabsContent value="users" className="space-y-4">
        <UserManagement />
      </TabsContent>
      <TabsContent value="email" className="space-y-4">
        <EmailSettings />
      </TabsContent>
      <TabsContent value="security" className="space-y-4">
        <SecuritySettings />
      </TabsContent>
      <TabsContent value="integrations" className="space-y-4">
        <IntegrationSettings />
      </TabsContent>
      <TabsContent value="backup" className="space-y-4">
        <BackupSettings />
      </TabsContent>
    </Tabs>
  )
}
