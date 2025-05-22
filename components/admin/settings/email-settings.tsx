"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export function EmailSettings() {
  const { toast } = useToast()
  const [smtpSettings, setSmtpSettings] = useState({
    host: "smtp.btms.com",
    port: "587",
    username: "notifications@btms.com",
    password: "••••••••••••",
    encryption: "tls",
    fromName: "BTMS HR",
    fromEmail: "hr@btms.com",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newEmployee: true,
    leaveRequest: true,
    attendanceAlert: true,
    payrollProcessed: true,
    performanceReview: true,
    systemUpdates: false,
  })

  const [selectedTemplate, setSelectedTemplate] = useState("welcome")
  const [emailTemplates, setEmailTemplates] = useState({
    welcome: {
      subject: "Welcome to Business Travel Management Limited",
      body: "Dear {{employee_name}},\n\nWelcome to Business Travel Management Limited! We're excited to have you join our team.\n\nYour account has been created with the following credentials:\nUsername: {{username}}\nTemporary Password: {{password}}\n\nPlease log in at {{login_url}} and change your password.\n\nBest regards,\nHR Team\nBusiness Travel Management Limited",
    },
    leaveApproval: {
      subject: "Leave Request Approved",
      body: "Dear {{employee_name}},\n\nYour leave request for {{leave_dates}} has been approved.\n\nReason: {{leave_reason}}\nApproved by: {{approver_name}}\n\nIf you have any questions, please contact the HR department.\n\nBest regards,\nHR Team\nBusiness Travel Management Limited",
    },
    payslip: {
      subject: "Your Monthly Payslip",
      body: "Dear {{employee_name}},\n\nYour payslip for the period {{pay_period}} is now available.\n\nYou can view and download your payslip by logging into the HR portal at {{portal_url}}.\n\nIf you have any questions regarding your payslip, please contact the payroll department.\n\nBest regards,\nPayroll Team\nBusiness Travel Management Limited",
    },
  })

  const handleSmtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSmtpSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleEncryptionChange = (value: string) => {
    setSmtpSettings((prev) => ({ ...prev, encryption: value }))
  }

  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleTemplateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEmailTemplates((prev) => ({
      ...prev,
      [selectedTemplate]: {
        ...prev[selectedTemplate as keyof typeof prev],
        [name]: value,
      },
    }))
  }

  const handleTestEmail = () => {
    toast({
      title: "Test email sent",
      description: "A test email has been sent to the configured address.",
    })
  }

  const handleSaveSmtpSettings = () => {
    toast({
      title: "SMTP settings saved",
      description: "Your email server settings have been updated successfully.",
    })
  }

  const handleSaveNotificationSettings = () => {
    toast({
      title: "Notification settings saved",
      description: "Your email notification preferences have been updated.",
    })
  }

  const handleSaveTemplate = () => {
    toast({
      title: "Email template saved",
      description: `The ${selectedTemplate} email template has been updated.`,
    })
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Email Server Settings</CardTitle>
          <CardDescription>Configure your SMTP server for sending emails</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input id="smtp-host" name="host" value={smtpSettings.host} onChange={handleSmtpChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input id="smtp-port" name="port" value={smtpSettings.port} onChange={handleSmtpChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-username">Username</Label>
              <Input id="smtp-username" name="username" value={smtpSettings.username} onChange={handleSmtpChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-password">Password</Label>
              <Input
                id="smtp-password"
                name="password"
                type="password"
                value={smtpSettings.password}
                onChange={handleSmtpChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-encryption">Encryption</Label>
              <Select value={smtpSettings.encryption} onValueChange={handleEncryptionChange}>
                <SelectTrigger id="smtp-encryption">
                  <SelectValue placeholder="Select encryption" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="tls">TLS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-name">From Name</Label>
              <Input id="from-name" name="fromName" value={smtpSettings.fromName} onChange={handleSmtpChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-email">From Email</Label>
              <Input
                id="from-email"
                name="fromEmail"
                type="email"
                value={smtpSettings.fromEmail}
                onChange={handleSmtpChange}
              />
            </div>
            <div className="md:col-span-2">
              <Button variant="outline" onClick={handleTestEmail}>
                Send Test Email
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSmtpSettings}>Save SMTP Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Configure which events trigger email notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-y-0">
              <Label htmlFor="new-employee">New Employee Registration</Label>
              <Switch
                id="new-employee"
                checked={notificationSettings.newEmployee}
                onCheckedChange={(checked) => handleNotificationChange("newEmployee", checked)}
              />
            </div>
            <div className="flex items-center justify-between space-y-0">
              <Label htmlFor="leave-request">Leave Request Status Change</Label>
              <Switch
                id="leave-request"
                checked={notificationSettings.leaveRequest}
                onCheckedChange={(checked) => handleNotificationChange("leaveRequest", checked)}
              />
            </div>
            <div className="flex items-center justify-between space-y-0">
              <Label htmlFor="attendance-alert">Attendance Irregularities</Label>
              <Switch
                id="attendance-alert"
                checked={notificationSettings.attendanceAlert}
                onCheckedChange={(checked) => handleNotificationChange("attendanceAlert", checked)}
              />
            </div>
            <div className="flex items-center justify-between space-y-0">
              <Label htmlFor="payroll-processed">Payroll Processing</Label>
              <Switch
                id="payroll-processed"
                checked={notificationSettings.payrollProcessed}
                onCheckedChange={(checked) => handleNotificationChange("payrollProcessed", checked)}
              />
            </div>
            <div className="flex items-center justify-between space-y-0">
              <Label htmlFor="performance-review">Performance Review Reminders</Label>
              <Switch
                id="performance-review"
                checked={notificationSettings.performanceReview}
                onCheckedChange={(checked) => handleNotificationChange("performanceReview", checked)}
              />
            </div>
            <div className="flex items-center justify-between space-y-0">
              <Label htmlFor="system-updates">System Updates</Label>
              <Switch
                id="system-updates"
                checked={notificationSettings.systemUpdates}
                onCheckedChange={(checked) => handleNotificationChange("systemUpdates", checked)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveNotificationSettings}>Save Notification Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>Customize email templates for various notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="welcome">Welcome Email</TabsTrigger>
              <TabsTrigger value="leaveApproval">Leave Approval</TabsTrigger>
              <TabsTrigger value="payslip">Payslip Notification</TabsTrigger>
            </TabsList>
            <TabsContent value="welcome" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="welcome-subject">Email Subject</Label>
                <Input
                  id="welcome-subject"
                  name="subject"
                  value={emailTemplates.welcome.subject}
                  onChange={handleTemplateChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="welcome-body">Email Body</Label>
                <Textarea
                  id="welcome-body"
                  name="body"
                  rows={10}
                  value={emailTemplates.welcome.body}
                  onChange={handleTemplateChange}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Available variables:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>{"{{employee_name}}"} - Full name of the employee</li>
                  <li>{"{{username}}"} - Employee's username</li>
                  <li>{"{{password}}"} - Temporary password</li>
                  <li>{"{{login_url}}"} - URL to the login page</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="leaveApproval" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="leave-subject">Email Subject</Label>
                <Input
                  id="leave-subject"
                  name="subject"
                  value={emailTemplates.leaveApproval.subject}
                  onChange={handleTemplateChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leave-body">Email Body</Label>
                <Textarea
                  id="leave-body"
                  name="body"
                  rows={10}
                  value={emailTemplates.leaveApproval.body}
                  onChange={handleTemplateChange}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Available variables:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>{"{{employee_name}}"} - Full name of the employee</li>
                  <li>{"{{leave_dates}}"} - Start and end dates of leave</li>
                  <li>{"{{leave_reason}}"} - Reason for leave</li>
                  <li>{"{{approver_name}}"} - Name of the person who approved</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="payslip" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payslip-subject">Email Subject</Label>
                <Input
                  id="payslip-subject"
                  name="subject"
                  value={emailTemplates.payslip.subject}
                  onChange={handleTemplateChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payslip-body">Email Body</Label>
                <Textarea
                  id="payslip-body"
                  name="body"
                  rows={10}
                  value={emailTemplates.payslip.body}
                  onChange={handleTemplateChange}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Available variables:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>{"{{employee_name}}"} - Full name of the employee</li>
                  <li>{"{{pay_period}}"} - Pay period (e.g., "January 2023")</li>
                  <li>{"{{portal_url}}"} - URL to the HR portal</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveTemplate}>Save Template</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
