"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export function BackupSettings() {
  const { toast } = useToast()
  const [backupSchedule, setBackupSchedule] = useState("daily")
  const [backupLocation, setBackupLocation] = useState("cloud")
  const [automaticBackups, setAutomaticBackups] = useState(true)

  const handleBackupScheduleChange = (value: string) => {
    setBackupSchedule(value)
  }

  const handleBackupLocationChange = (value: string) => {
    setBackupLocation(value)
  }

  const handleAutomaticBackupsChange = (checked: boolean) => {
    setAutomaticBackups(checked)
  }

  const handleSaveBackupSettings = () => {
    toast({
      title: "Backup settings saved",
      description: "Your backup settings have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Backup Settings</CardTitle>
          <CardDescription>Configure your system backup preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="backup-schedule">Backup Schedule</Label>
              <Select value={backupSchedule} onValueChange={handleBackupScheduleChange}>
                <SelectTrigger id="backup-schedule">
                  <SelectValue placeholder="Select backup schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backup-location">Backup Location</Label>
              <Select value={backupLocation} onValueChange={handleBackupLocationChange}>
                <SelectTrigger id="backup-location">
                  <SelectValue placeholder="Select backup location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cloud">Cloud Storage</SelectItem>
                  <SelectItem value="local">Local Server</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between space-y-0 md:col-span-2">
              <Label htmlFor="automatic-backups">Enable Automatic Backups</Label>
              <Switch
                id="automatic-backups"
                checked={automaticBackups}
                onCheckedChange={handleAutomaticBackupsChange}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveBackupSettings}>Save Backup Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
