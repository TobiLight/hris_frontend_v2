"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

// Sample attendance data
const attendanceRecords = [
  {
    id: 1,
    employee: {
      id: 101,
      name: "John Doe",
      avatar: "/placeholder.svg",
      department: "Travel Services",
    },
    date: "May 25, 2024",
    status: "Present",
    clockIn: "09:00 AM",
    clockOut: "05:30 PM",
    workHours: "8h 30m",
    overtime: "0h 30m",
  },
  {
    id: 2,
    employee: {
      id: 102,
      name: "Jane Smith",
      avatar: "/placeholder.svg",
      department: "Operations",
    },
    date: "May 25, 2024",
    status: "Present",
    clockIn: "08:45 AM",
    clockOut: "05:15 PM",
    workHours: "8h 30m",
    overtime: "0h 30m",
  },
  {
    id: 3,
    employee: {
      id: 103,
      name: "Robert Johnson",
      avatar: "/placeholder.svg",
      department: "Finance",
    },
    date: "May 25, 2024",
    status: "Present",
    clockIn: "09:15 AM",
    clockOut: "05:45 PM",
    workHours: "8h 30m",
    overtime: "0h 30m",
  },
  {
    id: 4,
    employee: {
      id: 104,
      name: "Sarah Williams",
      avatar: "/placeholder.svg",
      department: "Marketing",
    },
    date: "May 25, 2024",
    status: "On Leave",
    clockIn: "-",
    clockOut: "-",
    workHours: "-",
    overtime: "-",
  },
  {
    id: 5,
    employee: {
      id: 105,
      name: "Michael Brown",
      avatar: "/placeholder.svg",
      department: "IT",
    },
    date: "May 25, 2024",
    status: "Present",
    clockIn: "08:55 AM",
    clockOut: "05:25 PM",
    workHours: "8h 30m",
    overtime: "0h 30m",
  },
  {
    id: 6,
    employee: {
      id: 106,
      name: "Emily Davis",
      avatar: "/placeholder.svg",
      department: "HR",
    },
    date: "May 25, 2024",
    status: "Late",
    clockIn: "09:30 AM",
    clockOut: "06:00 PM",
    workHours: "8h 30m",
    overtime: "0h 30m",
  },
  {
    id: 7,
    employee: {
      id: 107,
      name: "David Miller",
      avatar: "/placeholder.svg",
      department: "Travel Services",
    },
    date: "May 25, 2024",
    status: "Late",
    clockIn: "09:45 AM",
    clockOut: "06:15 PM",
    workHours: "8h 30m",
    overtime: "0h 30m",
  },
]

export function AttendanceList() {
  const router = useRouter()
  const [records] = useState(attendanceRecords)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Absent":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "On Leave":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Late":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
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
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>Employee attendance for May 25, 2024</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/attendance/records">View All Records</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Work Hours</TableHead>
                <TableHead>Overtime</TableHead>
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
                        <div className="text-sm text-gray-500">{record.employee.department}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.clockIn}</TableCell>
                  <TableCell>{record.clockOut}</TableCell>
                  <TableCell>{record.workHours}</TableCell>
                  <TableCell>{record.overtime}</TableCell>
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
                          <Link href={`/admin/attendance/${record.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Record
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/attendance/${record.id}`}>View Details</Link>
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
