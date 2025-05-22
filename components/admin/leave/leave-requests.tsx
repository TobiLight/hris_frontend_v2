"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Check, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

// Sample leave request data
const initialLeaveRequests = [
  {
    id: 1,
    employee: {
      id: 101,
      name: "John Doe",
      avatar: "/placeholder.svg",
      department: "Travel Services",
    },
    leaveType: "Annual Leave",
    startDate: "June 10, 2024",
    endDate: "June 15, 2024",
    days: 5,
    reason: "Family vacation",
    status: "Pending",
    appliedOn: "May 20, 2024",
  },
  {
    id: 2,
    employee: {
      id: 102,
      name: "Jane Smith",
      avatar: "/placeholder.svg",
      department: "Operations",
    },
    leaveType: "Sick Leave",
    startDate: "May 28, 2024",
    endDate: "May 29, 2024",
    days: 2,
    reason: "Medical appointment",
    status: "Approved",
    appliedOn: "May 22, 2024",
  },
  {
    id: 3,
    employee: {
      id: 103,
      name: "Robert Johnson",
      avatar: "/placeholder.svg",
      department: "Finance",
    },
    leaveType: "Personal Leave",
    startDate: "June 5, 2024",
    endDate: "June 5, 2024",
    days: 1,
    reason: "Personal matters",
    status: "Pending",
    appliedOn: "May 23, 2024",
  },
  {
    id: 4,
    employee: {
      id: 104,
      name: "Sarah Williams",
      avatar: "/placeholder.svg",
      department: "Marketing",
    },
    leaveType: "Annual Leave",
    startDate: "July 1, 2024",
    endDate: "July 5, 2024",
    days: 5,
    reason: "Summer vacation",
    status: "Pending",
    appliedOn: "May 24, 2024",
  },
  {
    id: 5,
    employee: {
      id: 105,
      name: "Michael Brown",
      avatar: "/placeholder.svg",
      department: "IT",
    },
    leaveType: "Bereavement Leave",
    startDate: "May 30, 2024",
    endDate: "June 2, 2024",
    days: 4,
    reason: "Family emergency",
    status: "Approved",
    appliedOn: "May 25, 2024",
  },
]

export function LeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests)
  const [processing, setProcessing] = useState<number | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Pending":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "Rejected":
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

  const handleApprove = (id: number) => {
    setProcessing(id)
    // Simulate API call
    setTimeout(() => {
      setLeaveRequests(
        leaveRequests.map((request) => (request.id === id ? { ...request, status: "Approved" } : request)),
      )
      setProcessing(null)
      toast({
        title: "Leave request approved",
        description: "The leave request has been approved successfully.",
      })
    }, 500)
  }

  const handleReject = (id: number) => {
    setProcessing(id)
    // Simulate API call
    setTimeout(() => {
      setLeaveRequests(
        leaveRequests.map((request) => (request.id === id ? { ...request, status: "Rejected" } : request)),
      )
      setProcessing(null)
      toast({
        title: "Leave request rejected",
        description: "The leave request has been rejected.",
      })
    }, 500)
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="border-b bg-gray-50 p-4 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Leave Requests</CardTitle>
            <CardDescription>Manage employee leave applications</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/leave/requests">View All Requests</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={request.employee.avatar || "/placeholder.svg"} alt={request.employee.name} />
                        <AvatarFallback className="bg-teal-100 text-teal-800">
                          {getInitials(request.employee.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{request.employee.name}</div>
                        <div className="text-sm text-gray-500">{request.employee.department}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{request.leaveType}</TableCell>
                  <TableCell>
                    <div>{request.startDate}</div>
                    {request.startDate !== request.endDate && <div>{request.endDate}</div>}
                  </TableCell>
                  <TableCell>{request.days}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {request.status === "Pending" ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
                          onClick={() => handleApprove(request.id)}
                          disabled={processing === request.id}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => handleReject(request.id)}
                          disabled={processing === request.id}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/leave/${request.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/employees/${request.employee.id}`}>View Employee Profile</Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ) : (
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
                            <Link href={`/admin/leave/${request.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/employees/${request.employee.id}`}>View Employee Profile</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
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
