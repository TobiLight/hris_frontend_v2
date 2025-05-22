"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function RunPayrollForm() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    payPeriod: "may-2024",
    payDate: "2024-05-31",
    includeOvertime: true,
    includeBonuses: true,
    departments: ["all"],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // In a real app, this would be an API call
    // For now, we'll simulate submitting the data
    setTimeout(() => {
      setSubmitting(false)
      setStep(3) // Success step
    }, 2000)
  }

  const handleConfirm = () => {
    setStep(2) // Confirmation step
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
    } else if (step === 3) {
      router.push("/admin/payroll")
    }
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="border-b bg-gray-50 p-4">
        <CardTitle>
          {step === 1 && "Payroll Configuration"}
          {step === 2 && "Confirm Payroll Run"}
          {step === 3 && "Payroll Processing Complete"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleConfirm()
            }}
          >
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="payPeriod">Pay Period</Label>
                <Select
                  value={formData.payPeriod}
                  onValueChange={(value) => setFormData({ ...formData, payPeriod: value })}
                >
                  <SelectTrigger id="payPeriod">
                    <SelectValue placeholder="Select pay period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="may-2024">May 2024</SelectItem>
                    <SelectItem value="apr-2024">April 2024</SelectItem>
                    <SelectItem value="mar-2024">March 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="payDate">Pay Date</Label>
                <Input
                  id="payDate"
                  type="date"
                  value={formData.payDate}
                  onChange={(e) => setFormData({ ...formData, payDate: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="departments">Departments</Label>
                <Select
                  value={formData.departments[0]}
                  onValueChange={(value) => setFormData({ ...formData, departments: [value] })}
                >
                  <SelectTrigger id="departments">
                    <SelectValue placeholder="Select departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="travel">Travel Services</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeOvertime"
                  checked={formData.includeOvertime}
                  onCheckedChange={(checked) => setFormData({ ...formData, includeOvertime: !!checked })}
                />
                <Label htmlFor="includeOvertime">Include overtime payments</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeBonuses"
                  checked={formData.includeBonuses}
                  onCheckedChange={(checked) => setFormData({ ...formData, includeBonuses: !!checked })}
                />
                <Label htmlFor="includeBonuses">Include bonuses</Label>
              </div>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Confirmation Required</AlertTitle>
              <AlertDescription>
                You are about to run payroll for{" "}
                {formData.payPeriod === "may-2024"
                  ? "May 2024"
                  : formData.payPeriod === "apr-2024"
                    ? "April 2024"
                    : "March 2024"}
                . This will process payments for all employees in{" "}
                {formData.departments[0] === "all" ? "all departments" : "selected departments"}. Please confirm to
                proceed.
              </AlertDescription>
            </Alert>

            <div className="rounded-md bg-gray-50 p-4">
              <h3 className="mb-2 font-medium">Payroll Summary</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Pay Period:</span>
                  <span>
                    {formData.payPeriod === "may-2024"
                      ? "May 2024"
                      : formData.payPeriod === "apr-2024"
                        ? "April 2024"
                        : "March 2024"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Pay Date:</span>
                  <span>{new Date(formData.payDate).toLocaleDateString()}</span>
                </li>
                <li className="flex justify-between">
                  <span>Departments:</span>
                  <span>{formData.departments[0] === "all" ? "All Departments" : formData.departments.join(", ")}</span>
                </li>
                <li className="flex justify-between">
                  <span>Include Overtime:</span>
                  <span>{formData.includeOvertime ? "Yes" : "No"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Include Bonuses:</span>
                  <span>{formData.includeBonuses ? "Yes" : "No"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Estimated Total:</span>
                  <span>$427,800.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Employees Affected:</span>
                  <span>124</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <Alert className="bg-green-50 text-green-800">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Payroll Processing Complete</AlertTitle>
              <AlertDescription>
                Payroll for{" "}
                {formData.payPeriod === "may-2024"
                  ? "May 2024"
                  : formData.payPeriod === "apr-2024"
                    ? "April 2024"
                    : "March 2024"}{" "}
                has been successfully processed. All employees will receive their payments on{" "}
                {new Date(formData.payDate).toLocaleDateString()}.
              </AlertDescription>
            </Alert>

            <div className="rounded-md bg-gray-50 p-4">
              <h3 className="mb-2 font-medium">Processing Summary</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Total Processed:</span>
                  <span>$427,800.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Employees Paid:</span>
                  <span>124</span>
                </li>
                <li className="flex justify-between">
                  <span>Processing Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </li>
                <li className="flex justify-between">
                  <span>Transaction ID:</span>
                  <span>
                    TRX-
                    {Math.floor(Math.random() * 1000000)
                      .toString()
                      .padStart(6, "0")}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t bg-gray-50 p-4">
        {step === 1 && (
          <>
            <Button variant="outline" type="button" onClick={() => router.push("/admin/payroll")}>
              Cancel
            </Button>
            <Button type="button" className="bg-teal-600 hover:bg-teal-700" onClick={handleConfirm}>
              Next
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Button variant="outline" type="button" onClick={handleBack}>
              Back
            </Button>
            <Button
              type="button"
              className="bg-teal-600 hover:bg-teal-700"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Processing..." : "Run Payroll"}
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <Button
              type="button"
              className="bg-teal-600 hover:bg-teal-700"
              onClick={() => router.push("/admin/payroll")}
            >
              Return to Payroll
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
