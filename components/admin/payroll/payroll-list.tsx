"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, FileText, Download } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Sample payroll data
const payrollRecords = [
  {
    id: 1,
    employee: {
      id: 101,
      name: "John Doe",
      avatar: "/placeholder.svg",
      department: "Travel Services",
    },
    employeeId: "EMP-2024-0042",
    baseSalary: "$3,450.00",
    overtime: "$0.00",
    bonus: "$0.00",
    deductions: "$690.00",
    netPay: "$2,760.00",
    status: "Processed",
  },
  {
    id: 2,
    employee: {
      id: 102,
      name: "Jane Smith",
      avatar: "/placeholder.svg",
      department: "Operations",
    },
    employeeId: "EMP-2024-0036",
    baseSalary: "$4,200.00",
    overtime: "$150.00",
    bonus: "$500.00",
    deductions: "$970.00",
    netPay: "$3,880.00",
    status: "Processed",
  },
  {
    id: 3,
    employee: {
      id: 103,
      name: "Robert Johnson",
      avatar: "/placeholder.svg",
      department: "Finance",
    },
    employeeId: "EMP-2024-0018",
    baseSalary: "$3,800.00",
    overtime: "$0.00",
    bonus: "$0.00",
    deductions: "$760.00",
    netPay: "$3,040.00",
    status: "Processed",
  },
  {
    id: 4,
    employee: {
      id: 104,
      name: "Sarah Williams",
      avatar: "/placeholder.svg",
      department: "Marketing",
    },
    employeeId: "EMP-2024-0078",
    baseSalary: "$3,600.00",
    overtime: "$0.00",
    bonus: "$0.00",
    deductions: "$720.00",
    netPay: "$2,880.00",
    status: "Processed",
  },
  {
    id: 5,
    employee: {
      id: 105,
      name: "Michael Brown",
      avatar: "/placeholder.svg",
      department: "IT",
    },
    employeeId: "EMP-2024-0056",
    baseSalary: "$4,500.00",
    overtime: "$225.00",
    bonus: "$0.00",
    deductions: "$945.00",
    netPay: "$3,780.00",
    status: "Processed",
  },
]

export function PayrollList() {
  const [records] = useState(payrollRecords)

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

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="border-b bg-gray-50 p-4 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Payroll Records</CardTitle>
            <CardDescription>Employee payroll for May 2024</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/payroll/records">View All Records</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Base Salary</TableHead>
                <TableHead>Overtime</TableHead>
                <TableHead>Bonus</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={record.employee.avatar || "/placeholder.svg"} alt={record.employee.name} />
                        <AvatarFallback className="bg-teal-100 text-teal-800">
                          {getInitials(record.employee.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{record.employee.name}</div>
                        <div className="text-xs text-gray-500">{record.employeeId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{record.baseSalary}</TableCell>
                  <TableCell>{record.overtime}</TableCell>
                  <TableCell>{record.bonus}</TableCell>
                  <TableCell>{record.deductions}</TableCell>
                  <TableCell className="font-medium">{record.netPay}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/payroll/${record.id}/payslip`}>
                            <FileText className="mr-2 h-4 w-4" />
                            View Payslip
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/payroll/${record.id}/download`}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Payslip
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/employees/${record.employee.id}`}>View Employee Profile</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
