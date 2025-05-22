"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Check, Copy, ExternalLink, RefreshCw } from "lucide-react"

export function IntegrationSettings() {
  const { toast } = useToast()
  const [apiSettings, setApiSettings] = useState({
    apiEnabled: true,
    apiKey: "sk_live_51NxT7QKbT7QKbT7QKbT7QKbT7QKbT7QKbT7QKbT7QKbT7QKbT",
    webhookUrl: "https://btms.com/api/webhooks",
    rateLimitPerMinute: "60",
  })

  const [integrations, setIntegrations] = useState({
    googleCalendar: {
      enabled: true,
      connected: true,
      lastSync: "2023-05-01 14:30",
    },
    slack: {
      enabled: true,
      connected: true,
      lastSync: "2023-05-02 09:15",
    },
    zoom: {
      enabled: false,
      connected: false,
      lastSync: "Never",
    },
    quickbooks: {
      enabled: true,
      connected: true,
      lastSync: "2023-05-03 16:45",
    },
  })

  const [copied, setCopied] = useState(false)

  const handleApiSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setApiSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleApiEnabledChange = (checked: boolean) => {
    setApiSettings((prev) => ({ ...prev, apiEnabled: checked }))
  }

  const handleIntegrationChange = (name: string, field: string, value: boolean) => {
    setIntegrations((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiSettings.apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "API key copied",
      description: "The API key has been copied to your clipboard.",
    })
  }

  const handleRegenerateApiKey = () => {
    const newApiKey =
      "sk_live_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setApiSettings((prev) => ({ ...prev, apiKey: newApiKey }))
    toast({
      title: "API key regenerated",
      description: "A new API key has been generated. Make sure to update your integrations.",
    })
  }

  const handleSaveApiSettings = () => {
    toast({
      title: "API settings saved",
      description: "Your API configuration has been updated successfully.",
    })
  }

  const handleConnectIntegration = (name: string) => {
    setIntegrations((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        connected: true,
        lastSync: new Date().toLocaleString(),
      },
    }))
    toast({
      title: `${name} connected`,
      description: `Your ${name} account has been successfully connected.`,
    })
  }

  const handleDisconnectIntegration = (name: string) => {
    setIntegrations((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        connected: false,
        lastSync: "Never",
      },
    }))
    toast({
      title: `${name} disconnected`,
      description: `Your ${name} account has been disconnected.`,
    })
  }

  const handleSyncIntegration = (name: string) => {
    setIntegrations((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        lastSync: new Date().toLocaleString(),
      },
    }))
    toast({
      title: `${name} synced`,
      description: `Your ${name} data has been successfully synchronized.`,
    })
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Manage API access and settings for external integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between space-y-0">
              <Label htmlFor="api-enabled">Enable API Access</Label>
              <Switch id="api-enabled" checked={apiSettings.apiEnabled} onCheckedChange={handleApiEnabledChange} />
            </div>

            {apiSettings.apiEnabled && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex items-center gap-2">
                    <Input id="api-key" value={apiSettings.apiKey} readOnly className="font-mono text-sm" />
                    <Button variant="outline" size="icon" onClick={handleCopyApiKey} className="flex-shrink-0">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleRegenerateApiKey} className="flex-shrink-0">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Keep this key secret. If compromised, regenerate it immediately.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    name="webhookUrl"
                    value={apiSettings.webhookUrl}
                    onChange={handleApiSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate-limit">Rate Limit (Requests per Minute)</Label>
                  <Input
                    id="rate-limit"
                    name="rateLimitPerMinute"
                    type="number"
                    value={apiSettings.rateLimitPerMinute}
                    onChange={handleApiSettingsChange}
                  />
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveApiSettings}>Save API Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Third-Party Integrations</CardTitle>
          <CardDescription>Connect and manage external services and applications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Google Calendar Integration */}
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center border-b pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Google Calendar</h3>
                  {integrations.googleCalendar.connected && (
                    <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                      Connected
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Sync leave requests and company events with Google Calendar
                </p>
                {integrations.googleCalendar.connected && (
                  <p className="text-xs text-muted-foreground">Last synced: {integrations.googleCalendar.lastSync}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="google-calendar-enabled"
                  checked={integrations.googleCalendar.enabled}
                  onCheckedChange={(checked) => handleIntegrationChange("googleCalendar", "enabled", checked)}
                />
                {integrations.googleCalendar.enabled && (
                  <>
                    {integrations.googleCalendar.connected ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleSyncIntegration("googleCalendar")}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Sync Now
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDisconnectIntegration("googleCalendar")}
                        >
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => handleConnectIntegration("googleCalendar")}>
                        Connect
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Slack Integration */}
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center border-b pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Slack</h3>
                  {integrations.slack.connected && (
                    <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                      Connected
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Send notifications and updates to Slack channels</p>
                {integrations.slack.connected && (
                  <p className="text-xs text-muted-foreground">Last synced: {integrations.slack.lastSync}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="slack-enabled"
                  checked={integrations.slack.enabled}
                  onCheckedChange={(checked) => handleIntegrationChange("slack", "enabled", checked)}
                />
                {integrations.slack.enabled && (
                  <>
                    {integrations.slack.connected ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleSyncIntegration("slack")}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Sync Now
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDisconnectIntegration("slack")}>
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => handleConnectIntegration("slack")}>
                        Connect
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Zoom Integration */}
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center border-b pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Zoom</h3>
                  {integrations.zoom.connected && (
                    <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                      Connected
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Schedule and manage video meetings for interviews and reviews
                </p>
                {integrations.zoom.connected && (
                  <p className="text-xs text-muted-foreground">Last synced: {integrations.zoom.lastSync}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="zoom-enabled"
                  checked={integrations.zoom.enabled}
                  onCheckedChange={(checked) => handleIntegrationChange("zoom", "enabled", checked)}
                />
                {integrations.zoom.enabled && (
                  <>
                    {integrations.zoom.connected ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleSyncIntegration("zoom")}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Sync Now
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDisconnectIntegration("zoom")}>
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => handleConnectIntegration("zoom")}>
                        Connect
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* QuickBooks Integration */}
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">QuickBooks</h3>
                  {integrations.quickbooks.connected && (
                    <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                      Connected
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Sync payroll and financial data with QuickBooks</p>
                {integrations.quickbooks.connected && (
                  <p className="text-xs text-muted-foreground">Last synced: {integrations.quickbooks.lastSync}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="quickbooks-enabled"
                  checked={integrations.quickbooks.enabled}
                  onCheckedChange={(checked) => handleIntegrationChange("quickbooks", "enabled", checked)}
                />
                {integrations.quickbooks.enabled && (
                  <>
                    {integrations.quickbooks.connected ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleSyncIntegration("quickbooks")}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Sync Now
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDisconnectIntegration("quickbooks")}>
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => handleConnectIntegration("quickbooks")}>
                        Connect
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            onClick={() => {
              window.open("https://btms.com/api/docs", "_blank")
            }}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View API Documentation
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
