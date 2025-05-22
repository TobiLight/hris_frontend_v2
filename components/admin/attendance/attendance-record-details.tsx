"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface AttendanceRecord {
  id: number
  employee: {
    id: number
    name: string
    avatar: string
    department: string
    position: string
    email: string
  }
  date: string
  status: string
  clockIn: string
  clockOut: string
  workHours: string
  overtime: string
  location: string
  notes: string
}

export function AttendanceRecordDetails({ id }: { id: string }) {
  const [record, setRecord] = useState<AttendanceRecord | null>(null)
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
        },
        date: "May 25, 2024",
        status: "Present",
        clockIn: "09:00 AM",
        clockOut: "05:30 PM",
        workHours: "8h 30m",
        overtime: "0h 30m",
        location: "Main Office",
        notes: "Regular working day",
      })
      setLoading(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [id])

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
          <CardTitle>Record Not Found</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p>The attendance record you are looking for does not exist.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gray-50 p-4">
          <CardTitle>Employee Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
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
              <p className="text-gray-500">{record.employee.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gray-50 p-4">
          <CardTitle>Attendance Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p>{record.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <Badge variant="outline" className={getStatusColor(record.status)}>
                  {record.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Clock In</p>
                <p>{record.clockIn}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Clock Out</p>
                <p>{record.clockOut}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Work Hours</p>
                <p>{record.workHours}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Overtime</p>
                <p>{record.overtime}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p>{record.location}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Notes</p>
              <p>{record.notes}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
