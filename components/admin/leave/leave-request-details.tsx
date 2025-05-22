"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calendar, Clock, FileText, User } from "lucide-react"
import Link from "next/link"

interface LeaveRequest {
  id: number
  employee: {
    id: number
    name: string
    avatar: string
    department: string
    position: string
    email: string
  }
  leaveType: string
  startDate: string
  endDate: string
  days: number
  reason: string
  status: string
  appliedOn: string
  approvedBy?: string
  approvedOn?: string
  rejectedBy?: string
  rejectedOn?: string
  comments?: string
}

export function LeaveRequestDetails({ id }: { id: string }) {
  const router = useRouter()
  const [request, setRequest] = useState<LeaveRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [adminComment, setAdminComment] = useState("")

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll simulate loading the data
    const timeout = setTimeout(() => {
      setRequest({
        id: Number.parseInt(id),
        employee: {
          id: 101,
          name: "John Doe",
          avatar: "/placeholder.svg",
          department: "Travel Services",
          position: "Travel Consultant",
          email: "john.doe@example.com",
        },
        leaveType: "Annual Leave",
        startDate: "June 10, 2024",
        endDate: "June 15, 2024",
        days: 5,
        reason: "Family vacation",
        status: "Pending",
        appliedOn: "May 20, 2024",
        comments: "I will be available via email for urgent matters.",
      })
      setLoading(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [id])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-amber-100 text-amber-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleApprove = () => {
    setProcessing(true)
    // Simulate API call
    setTimeout(() => {
      setRequest(
        request
          ? {
              ...request,
              status: "Approved",
              approvedBy: "Admin User",
              approvedOn: new Date().toLocaleDateString(),
              comments: adminComment || request.comments,
            }
          : null,
      )
      setProcessing(false)
      toast({
        title: "Leave request approved",
        description: "The leave request has been approved successfully.",
      })
    }, 1000)
  }

  const handleReject = () => {
    setProcessing(true)
    // Simulate API call
    setTimeout(() => {
      setRequest(
        request
          ? {
              ...request,
              status: "Rejected",
              rejectedBy: "Admin User",
              rejectedOn: new Date().toLocaleDateString(),
              comments: adminComment || request.comments,
            }
          : null,
      )
      setProcessing(false)
      toast({
        title: "Leave request rejected",
        description: "The leave request has been rejected.",
      })
    }, 1000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!request) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg font-medium text-gray-500">Leave request not found</p>
        <Button variant="link" asChild className="mt-2">
          <Link href="/admin/leave">Back to Leave Management</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/leave">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leave Management
          </Link>
        </Button>
        <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Request Details</CardTitle>
          <CardDescription>
            Request #{request.id} submitted on {request.appliedOn}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={request.employee.avatar || "/placeholder.svg"} alt={request.employee.name} />
              <AvatarFallback>{getInitials(request.employee.name)}</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/admin/employees/${request.employee.id}`} className="text-lg font-medium hover:underline">
                {request.employee.name}
              </Link>
              <p className="text-sm text-gray-500">
                {request.employee.position} • {request.employee.department}
              </p>
              <p className="text-sm text-gray-500">{request.employee.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Leave Period
                </h3>
                <p className="mt-1">
                  {request.startDate} to {request.endDate} ({request.days} days)
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Leave Type
                </h3>
                <p className="mt-1">{request.leaveType}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Applied On
                </h3>
                <p className="mt-1">{request.appliedOn}</p>
              </div>
              {request.status === "Approved" && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Approved By
                  </h3>
                  <p className="mt-1">
                    {request.approvedBy} on {request.approvedOn}
                  </p>
                </div>
              )}
              {request.status === "Rejected" && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Rejected By
                  </h3>
                  <p className="mt-1">
                    {request.rejectedBy} on {request.rejectedOn}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Reason for Leave</h3>
            <p className="mt-1 p-3 bg-gray-50 rounded-md">{request.reason}</p>
          </div>

          {request.comments && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Additional Comments</h3>
              <p className="mt-1 p-3 bg-gray-50 rounded-md">{request.comments}</p>
            </div>
          )}

          {request.status === "Pending" && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Admin Comments</h3>
              <Textarea
                placeholder="Add your comments here..."
                className="mt-1"
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
              />
            </div>
          )}
        </CardContent>
        {request.status === "Pending" && (
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleReject} disabled={processing}>
              Reject
            </Button>
            <Button onClick={handleApprove} disabled={processing}>
              Approve
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
