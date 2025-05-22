"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface PayrollRecord {
  id: number
  employee: {
    id: number
    name: string
    avatar: string
    department: string
    position: string
    email: string
    employeeId: string
  }
  payPeriod: string
  payDate: string
  baseSalary: string
  overtime: string
  bonus: string
  grossPay: string
  taxDeductions: string
  otherDeductions: string
  totalDeductions: string
  netPay: string
  status: string
  bankAccount: string
  bankName: string
}

export function PayslipView({ id }: { id: string }) {
  const [record, setRecord] = useState<PayrollRecord | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll simulate loading the data
    const timeout = setTimeout(() => {
      setRecord({
        id: Number.parseInt(id),
        employee: {
          id: 101,
          name: "John Doe",
          avatar: "/placeholder.svg",
          department: "Travel Services",
          position: "Travel Consultant",
          email: "john.doe@example.com",
          employeeId: "EMP-2024-0042",
        },
        payPeriod: "May 1 - May 31, 2024",
        payDate: "May 31, 2024",
        baseSalary: "$3,450.00",
        overtime: "$0.00",
        bonus: "$0.00",
        grossPay: "$3,450.00",
        taxDeductions: "$517.50",
        otherDeductions: "$172.50",
        totalDeductions: "$690.00",
        netPay: "$2,760.00",
        status: "Processed",
        bankAccount: "****6789",
        bankName: "First National Bank",
      })
      setLoading(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [id])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Pending":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "Failed":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  if (loading) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gray-50 p-4">
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!record) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gray-50 p-4">
          <CardTitle>Payslip Not Found</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p>The payslip you are looking for does not exist.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="border-b bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <CardTitle>Payslip for {record.payPeriod}</CardTitle>
          <Badge variant="outline" className={getStatusColor(record.status)}>
            {record.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={record.employee.avatar || "/placeholder.svg"} alt={record.employee.name} />
                <AvatarFallback className="bg-teal-100 text-teal-800 text-lg">
                  {getInitials(record.employee.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-medium">
                  <Link href={`/admin/employees/${record.employee.id}`} className="hover:text-teal-600">
                    {record.employee.name}
                  </Link>
                </h3>
                <p className="text-gray-500">{record.employee.position}</p>
                <p className="text-gray-500">{record.employee.department}</p>
                <p className="text-xs text-gray-500">{record.employee.employeeId}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Pay Period:</span>
              <span>{record.payPeriod}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Pay Date:</span>
              <span>{record.payDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Bank Account:</span>
              <span>{record.bankAccount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Bank Name:</span>
              <span>{record.bankName}</span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-medium">Earnings</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Base Salary</span>
                <span>{record.baseSalary}</span>
              </div>
              <div className="flex justify-between">
                <span>Overtime</span>
                <span>{record.overtime}</span>
              </div>
              <div className="flex justify-between">
                <span>Bonus</span>
                <span>{record.bonus}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Gross Pay</span>
                <span>{record.grossPay}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Deductions</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{record.taxDeductions}</span>
              </div>
              <div className="flex justify-between">
                <span>Other Deductions</span>
                <span>{record.otherDeductions}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total Deductions</span>
                <span>{record.totalDeductions}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex justify-between rounded-md bg-gray-50 p-4 text-lg font-bold">
          <span>Net Pay</span>
          <span>{record.netPay}</span>
        </div>
      </CardContent>
    </Card>
  )
}
