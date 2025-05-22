"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Save } from "lucide-react"

export function ProfileSettings() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSaveSettings = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Settings saved",
      description: "Your profile settings have been updated successfully.",
    })

    setIsSubmitting(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="notifications">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                  <span>Email Notifications</span>
                  <span className="font-normal text-xs text-gray-500">
                    Receive email updates about your account activity
                  </span>
                </Label>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="leave-notifications" className="flex flex-col space-y-1">
                  <span>Leave Approvals</span>
                  <span className="font-normal text-xs text-gray-500">
                    Get notified when your leave requests are approved or rejected
                  </span>
                </Label>
                <Switch id="leave-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="payroll-notifications" className="flex flex-col space-y-1">
                  <span>Payroll Notifications</span>
                  <span className="font-normal text-xs text-gray-500">
                    Receive notifications when your payslip is available
                  </span>
                </Label>
                <Switch id="payroll-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="performance-notifications" className="flex flex-col space-y-1">
                  <span>Performance Updates</span>
                  <span className="font-normal text-xs text-gray-500">
                    Get notified about performance reviews and feedback
                  </span>
                </Label>
                <Switch id="performance-notifications" defaultChecked />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="password" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="profile-visibility" className="flex flex-col space-y-1">
                  <span>Profile Visibility</span>
                  <span className="font-normal text-xs text-gray-500">
                    Make your profile visible to other employees
                  </span>
                </Label>
                <Switch id="profile-visibility" defaultChecked />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="contact-sharing" className="flex flex-col space-y-1">
                  <span>Contact Information Sharing</span>
                  <span className="font-normal text-xs text-gray-500">
                    Share your contact information with team members
                  </span>
                </Label>
                <Switch id="contact-sharing" defaultChecked />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="activity-tracking" className="flex flex-col space-y-1">
                  <span>Activity Tracking</span>
                  <span className="font-normal text-xs text-gray-500">
                    Allow system to track your activity for analytics
                  </span>
                </Label>
                <Switch id="activity-tracking" defaultChecked />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Button
          onClick={handleSaveSettings}
          className="mt-6 w-full bg-teal-600 hover:bg-teal-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
