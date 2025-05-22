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
import { useToast } from "@/hooks/use-toast"

export function GeneralSettings() {
  const { toast } = useToast()
  const [companyInfo, setCompanyInfo] = useState({
    name: "Business Travel Management Limited",
    email: "info@btms.com",
    phone: "+1 (555) 123-4567",
    website: "https://btms.com",
    address: "123 Corporate Plaza, Business District, New York, NY 10001",
    logo: "/placeholder.svg",
  })

  const [systemPreferences, setSystemPreferences] = useState({
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    timezone: "UTC-5 (Eastern Time)",
    language: "en-US",
    enableNotifications: true,
    enableEmployeeSelfService: true,
  })

  const handleCompanyInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCompanyInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSystemPreferenceChange = (name: string, value: string | boolean) => {
    setSystemPreferences((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveCompanyInfo = () => {
    toast({
      title: "Company information saved",
      description: "Your company information has been updated successfully.",
    })
  }

  const handleSaveSystemPreferences = () => {
    toast({
      title: "System preferences saved",
      description: "Your system preferences have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Update your company details and information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" name="name" value={companyInfo.name} onChange={handleCompanyInfoChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-email">Email Address</Label>
              <Input
                id="company-email"
                name="email"
                type="email"
                value={companyInfo.email}
                onChange={handleCompanyInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-phone">Phone Number</Label>
              <Input id="company-phone" name="phone" value={companyInfo.phone} onChange={handleCompanyInfoChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-website">Website</Label>
              <Input
                id="company-website"
                name="website"
                value={companyInfo.website}
                onChange={handleCompanyInfoChange}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="company-address">Address</Label>
              <Textarea
                id="company-address"
                name="address"
                rows={3}
                value={companyInfo.address}
                onChange={handleCompanyInfoChange}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="company-logo">Company Logo</Label>
              <div className="flex items-center gap-4">
                <img
                  src={companyInfo.logo || "/placeholder.svg"}
                  alt="Company Logo"
                  className="h-16 w-16 rounded border object-contain p-1"
                />
                <Button variant="outline" type="button">
                  Upload New Logo
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveCompanyInfo}>Save Company Information</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Preferences</CardTitle>
          <CardDescription>Configure system-wide preferences and defaults</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format</Label>
              <Select
                value={systemPreferences.dateFormat}
                onValueChange={(value) => handleSystemPreferenceChange("dateFormat", value)}
              >
                <SelectTrigger id="date-format">
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time-format">Time Format</Label>
              <Select
                value={systemPreferences.timeFormat}
                onValueChange={(value) => handleSystemPreferenceChange("timeFormat", value)}
              >
                <SelectTrigger id="time-format">
                  <SelectValue placeholder="Select time format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                  <SelectItem value="24h">24-hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={systemPreferences.timezone}
                onValueChange={(value) => handleSystemPreferenceChange("timezone", value)}
              >
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</SelectItem>
                  <SelectItem value="UTC-6 (Central Time)">UTC-6 (Central Time)</SelectItem>
                  <SelectItem value="UTC-7 (Mountain Time)">UTC-7 (Mountain Time)</SelectItem>
                  <SelectItem value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time)</SelectItem>
                  <SelectItem value="UTC+0 (GMT)">UTC+0 (GMT)</SelectItem>
                  <SelectItem value="UTC+1 (CET)">UTC+1 (CET)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={systemPreferences.language}
                onValueChange={(value) => handleSystemPreferenceChange("language", value)}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="en-GB">English (UK)</SelectItem>
                  <SelectItem value="es-ES">Spanish</SelectItem>
                  <SelectItem value="fr-FR">French</SelectItem>
                  <SelectItem value="de-DE">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between space-y-0">
              <Label htmlFor="notifications">Enable System Notifications</Label>
              <Switch
                id="notifications"
                checked={systemPreferences.enableNotifications}
                onCheckedChange={(checked) => handleSystemPreferenceChange("enableNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between space-y-0">
              <Label htmlFor="self-service">Enable Employee Self-Service</Label>
              <Switch
                id="self-service"
                checked={systemPreferences.enableEmployeeSelfService}
                onCheckedChange={(checked) => handleSystemPreferenceChange("enableEmployeeSelfService", checked)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSystemPreferences}>Save System Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
