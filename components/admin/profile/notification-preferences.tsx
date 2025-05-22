"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Bell, Mail, Save, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

const notificationSchema = z.object({
  emailDigest: z.enum(["none", "daily", "weekly"]),
  emailLeaveRequests: z.boolean(),
  emailPayroll: z.boolean(),
  emailSystemUpdates: z.boolean(),
  emailSecurityAlerts: z.boolean(),
  pushNewEmployees: z.boolean(),
  pushLeaveRequests: z.boolean(),
  pushPayroll: z.boolean(),
  pushSystemUpdates: z.boolean(),
  pushSecurityAlerts: z.boolean(),
  smsLeaveRequests: z.boolean(),
  smsPayroll: z.boolean(),
  smsSecurityAlerts: z.boolean(),
})

export default function NotificationPreferences() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  // Initialize form with default values
  const form = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailDigest: "weekly",
      emailLeaveRequests: true,
      emailPayroll: true,
      emailSystemUpdates: true,
      emailSecurityAlerts: true,
      pushNewEmployees: true,
      pushLeaveRequests: true,
      pushPayroll: false,
      pushSystemUpdates: false,
      pushSecurityAlerts: true,
      smsLeaveRequests: false,
      smsPayroll: false,
      smsSecurityAlerts: true,
    },
  })

  function onSubmit(values: z.infer<typeof notificationSchema>) {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Notification preferences updated",
        description: "Your notification preferences have been updated successfully.",
        variant: "default",
      })
      console.log(values)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how and when you receive notifications.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="email" className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="push" className="flex items-center">
                  <Bell className="mr-2 h-4 w-4" />
                  Push
                </TabsTrigger>
                <TabsTrigger value="sms" className="flex items-center">
                  <Smartphone className="mr-2 h-4 w-4" />
                  SMS
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Email Digest</h3>
                    <p className="text-sm text-muted-foreground mb-4">Receive a summary of important activities.</p>

                    <FormField
                      control={form.control}
                      name="emailDigest"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="none" />
                                </FormControl>
                                <FormLabel className="font-normal">None</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="daily" />
                                </FormControl>
                                <FormLabel className="font-normal">Daily digest</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="weekly" />
                                </FormControl>
                                <FormLabel className="font-normal">Weekly digest</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>

                    <FormField
                      control={form.control}
                      name="emailLeaveRequests"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Leave Requests</FormLabel>
                            <FormDescription>Notifications about leave requests and approvals.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emailPayroll"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Payroll</FormLabel>
                            <FormDescription>Notifications about payroll processing and updates.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emailSystemUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">System Updates</FormLabel>
                            <FormDescription>Notifications about system updates and maintenance.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emailSecurityAlerts"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Security Alerts</FormLabel>
                            <FormDescription>Important security notifications and alerts.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="push" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Push Notifications</h3>

                  <FormField
                    control={form.control}
                    name="pushNewEmployees"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">New Employees</FormLabel>
                          <FormDescription>Notifications when new employees are added.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pushLeaveRequests"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Leave Requests</FormLabel>
                          <FormDescription>Notifications about leave requests and approvals.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pushPayroll"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Payroll</FormLabel>
                          <FormDescription>Notifications about payroll processing and updates.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pushSystemUpdates"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">System Updates</FormLabel>
                          <FormDescription>Notifications about system updates and maintenance.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pushSecurityAlerts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Security Alerts</FormLabel>
                          <FormDescription>Important security notifications and alerts.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="sms" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">SMS Notifications</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Only critical notifications will be sent via SMS.
                  </p>

                  <FormField
                    control={form.control}
                    name="smsLeaveRequests"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Leave Requests</FormLabel>
                          <FormDescription>SMS alerts for urgent leave requests.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="smsPayroll"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Payroll</FormLabel>
                          <FormDescription>SMS alerts for critical payroll issues.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="smsSecurityAlerts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Security Alerts</FormLabel>
                          <FormDescription>SMS alerts for critical security issues.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSaving} className="ml-auto">
              {isSaving ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
