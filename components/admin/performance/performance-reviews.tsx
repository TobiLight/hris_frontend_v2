import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, FileText, Calendar } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample performance review data
const performanceReviews = [
  {
    id: 1,
    employee: {
      name: "John Doe",
      avatar: "/placeholder.svg",
      department: "Travel Services",
    },
    reviewType: "Quarterly Review",
    dueDate: "June 15, 2024",
    reviewer: "Jennifer Parker",
    status: "Scheduled",
  },
  {
    id: 2,
    employee: {
      name: "Jane Smith",
      avatar: "/placeholder.svg",
      department: "Operations",
    },
    reviewType: "Annual Review",
    dueDate: "June 10, 2024",
    reviewer: "Michael Rodriguez",
    status: "Scheduled",
  },
  {
    id: 3,
    employee: {
      name: "Robert Johnson",
      avatar: "/placeholder.svg",
      department: "Finance",
    },
    reviewType: "Quarterly Review",
    dueDate: "June 20, 2024",
    reviewer: "David Chen",
    status: "Scheduled",
  },
  {
    id: 4,
    employee: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg",
      department: "Marketing",
    },
    reviewType: "Probation Review",
    dueDate: "May 30, 2024",
    reviewer: "Emily Davis",
    status: "Overdue",
  },
  {
    id: 5,
    employee: {
      name: "Michael Brown",
      avatar: "/placeholder.svg",
      department: "IT",
    },
    reviewType: "Quarterly Review",
    dueDate: "May 15, 2024",
    reviewer: "Robert Wilson",
    status: "Completed",
  },
]

export function PerformanceReviews() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Scheduled":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Overdue":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "In Progress":
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
            <CardTitle>Upcoming Performance Reviews</CardTitle>
            <CardDescription>Scheduled employee evaluations</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Review Type</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performanceReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={review.employee.avatar} alt={review.employee.name} />
                        <AvatarFallback className="bg-teal-100 text-teal-800">
                          {getInitials(review.employee.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.employee.name}</div>
                        <div className="text-sm text-gray-500">{review.employee.department}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{review.reviewType}</TableCell>
                  <TableCell>{review.dueDate}</TableCell>
                  <TableCell>{review.reviewer}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(review.status)}>
                      {review.status}
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
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Start Review
                        </DropdownMenuItem>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem>View Employee Profile</DropdownMenuItem>
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
