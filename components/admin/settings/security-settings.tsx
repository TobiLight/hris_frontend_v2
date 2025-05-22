"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"

export function SecuritySettings() {
  const { toast } = useToast()
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    expiryDays: 90,
    preventReuse: 5,
  })

  const [sessionSettings, setSessionSettings] = useState({
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
    rememberMe: true,
  })

  const [twoFactorSettings, setTwoFactorSettings] = useState({
    enabled: false,
    requiredForAdmins: true,
    requiredForEmployees: false,
    method: "email",
  })

  const handlePasswordPolicyChange = (name: string, value: boolean | number) => {
    setPasswordPolicy((prev) => ({ ...prev, [name]: value }))
  }

  const handleSessionSettingsChange = (name: string, value: boolean | number) => {
    setSessionSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleTwoFactorSettingsChange = (name: string, value: boolean | string) => {
    setTwoFactorSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSavePasswordPolicy = () => {
    toast({
      title: "Password policy saved",
      description: "Your password policy settings have been updated successfully.",
    })
  }

  const handleSaveSessionSettings = () => {
    toast({
      title: "Session settings saved",
      description: "Your session security settings have been updated successfully.",
    })
  }

  const handleSaveTwoFactorSettings = () => {
    toast({
      title: "Two-factor authentication settings saved",
      description: "Your 2FA settings have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Password Policy</CardTitle>
          <CardDescription>Configure password requirements and expiration settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="min-length">Minimum Password Length: {passwordPolicy.minLength}</Label>
              </div>
              <Slider
                id="min-length"
                min={6}
                max={16}
                step={1}
                value={[passwordPolicy.minLength]}
                onValueChange={(value) => handlePasswordPolicyChange("minLength", value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>6</span>
                <span>16</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between space-y-0">
                <Label htmlFor="require-uppercase">Require Uppercase Letters</Label>
                <Switch
                  id="require-uppercase"
                  checked={passwordPolicy.requireUppercase}
                  onCheckedChange={(checked) => handlePasswordPolicyChange("requireUppercase", checked)}
                />
              </div>
              <div className="flex items-center justify-between space-y-0">
                <Label htmlFor="require-lowercase">Require Lowercase Letters</Label>
                <Switch
                  id="require-lowercase"
                  checked={passwordPolicy.requireLowercase}
                  onCheckedChange={(checked) => handlePasswordPolicyChange("requireLowercase", checked)}
                />
              </div>
              <div className="flex items-center justify-between space-y-0">
                <Label htmlFor="require-numbers">Require Numbers</Label>
                <Switch
                  id="require-numbers"
                  checked={passwordPolicy.requireNumbers}
                  onCheckedChange={(checked) => handlePasswordPolicyChange("requireNumbers", checked)}
                />
              </div>
              <div className="flex items-center justify-between space-y-0">
                <Label htmlFor="require-special">Require Special Characters</Label>
                <Switch
                  id="require-special"
                  checked={passwordPolicy.requireSpecialChars}
                  onCheckedChange={(checked) => handlePasswordPolicyChange("requireSpecialChars", checked)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiry-days">Password Expiry (Days)</Label>
              <Select
                value={passwordPolicy.expiryDays.toString()}
                onValueChange={(value) => handlePasswordPolicyChange("expiryDays", Number.parseInt(value))}
              >
                <SelectTrigger id="expiry-days">
                  <SelectValue placeholder="Select expiry period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">365 days</SelectItem>
                  <SelectItem value="0">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prevent-reuse">Prevent Password Reuse (Previous Passwords)</Label>
              <Select
                value={passwordPolicy.preventReuse.toString()}
                onValueChange={(value) => handlePasswordPolicyChange("preventReuse", Number.parseInt(value))}
              >
                <SelectTrigger id="prevent-reuse">
                  <SelectValue placeholder="Select number of passwords" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 passwords</SelectItem>
                  <SelectItem value="5">5 passwords</SelectItem>
                  <SelectItem value="10">10 passwords</SelectItem>
                  <SelectItem value="0">Don't prevent reuse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSavePasswordPolicy}>Save Password Policy</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Session Security</CardTitle>
          <CardDescription>Configure session timeout and login attempt settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (Minutes)</Label>
              <Select
                value={sessionSettings.sessionTimeout.toString()}
                onValueChange={(value) => handleSessionSettingsChange("sessionTimeout", Number.parseInt(value))}
              >
                <SelectTrigger id="session-timeout">
                  <SelectValue placeholder="Select timeout period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="240">4 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-attempts">Maximum Login Attempts Before Lockout</Label>
              <Select
                value={sessionSettings.maxLoginAttempts.toString()}
                onValueChange={(value) => handleSessionSettingsChange("maxLoginAttempts", Number.parseInt(value))}
              >
                <SelectTrigger id="max-attempts">
                  <SelectValue placeholder="Select maximum attempts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 attempts</SelectItem>
                  <SelectItem value="5">5 attempts</SelectItem>
                  <SelectItem value="10">10 attempts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lockout-duration">Account Lockout Duration (Minutes)</Label>
              <Select
                value={sessionSettings.lockoutDuration.toString()}
                onValueChange={(value) => handleSessionSettingsChange("lockoutDuration", Number.parseInt(value))}
              >
                <SelectTrigger id="lockout-duration">
                  <SelectValue placeholder="Select lockout duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="1440">24 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between space-y-0">
              <Label htmlFor="remember-me">Allow "Remember Me" Option</Label>
              <Switch
                id="remember-me"
                checked={sessionSettings.rememberMe}
                onCheckedChange={(checked) => handleSessionSettingsChange("rememberMe", checked)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSessionSettings}>Save Session Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Configure two-factor authentication settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between space-y-0">
              <Label htmlFor="enable-2fa">Enable Two-Factor Authentication</Label>
              <Switch
                id="enable-2fa"
                checked={twoFactorSettings.enabled}
                onCheckedChange={(checked) => handleTwoFactorSettingsChange("enabled", checked)}
              />
            </div>

            {twoFactorSettings.enabled && (
              <>
                <div className="flex items-center justify-between space-y-0">
                  <Label htmlFor="required-admins">Required for Admin Users</Label>
                  <Switch
                    id="required-admins"
                    checked={twoFactorSettings.requiredForAdmins}
                    onCheckedChange={(checked) => handleTwoFactorSettingsChange("requiredForAdmins", checked)}
                  />
                </div>

                <div className="flex items-center justify-between space-y-0">
                  <Label htmlFor="required-employees">Required for Employees</Label>
                  <Switch
                    id="required-employees"
                    checked={twoFactorSettings.requiredForEmployees}
                    onCheckedChange={(checked) => handleTwoFactorSettingsChange("requiredForEmployees", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="2fa-method">Default 2FA Method</Label>
                  <Select
                    value={twoFactorSettings.method}
                    onValueChange={(value) => handleTwoFactorSettingsChange("method", value)}
                  >
                    <SelectTrigger id="2fa-method">
                      <SelectValue placeholder="Select 2FA method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="app">Authenticator App</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveTwoFactorSettings}>Save 2FA Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
