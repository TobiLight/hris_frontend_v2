"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, Search, Edit, Trash2, Eye, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

// Sample department data
const departmentData = {
  1: {
    id: 1,
    name: "Travel Services",
    employees: [
      {
        id: 101,
        name: "Jennifer Parker",
        position: "Department Manager",
        email: "jennifer.parker@btms.com",
        phone: "+1 (212) 555-1001",
        status: "Active",
        avatar: "/placeholder.svg",
        joinDate: "2020-03-15",
      },
      {
        id: 102,
        name: "Michael Scott",
        position: "Senior Travel Agent",
        email: "michael.scott@btms.com",
        phone: "+1 (212) 555-1002",
        status: "Active",
        avatar: "/placeholder.svg",
        joinDate: "2020-04-10",
      },
      {
        id: 103,
        name: "Pam Beesly",
        position: "Travel Agent",
        email: "pam.beesly@btms.com",
        phone: "+1 (212) 555-1003",
        status: "Active",
        avatar: "/placeholder.svg",
        joinDate: "2020-05-20",
      },
      {
        id: 104,
        name: "Jim Halpert",
        position: "Travel Agent",
        email: "jim.halpert@btms.com",
        phone: "+1 (212) 555-1004",
        status: "Active",
        avatar: "/placeholder.svg",
        joinDate: "2020-05-25",
      },
      {
        id: 105,
        name: "Dwight Schrute",
        position: "Corporate Travel Specialist",
        email: "dwight.schrute@btms.com",
        phone: "+1 (212) 555-1005",
        status: "Active",
        avatar: "/placeholder.svg",
        joinDate: "2020-06-15",
      },
      {
        id: 106,
        name: "Angela Martin",
        position: "Travel Accountant",
        email: "angela.martin@btms.com",
        phone: "+1 (212) 555-1006",
        status: "Active",
        avatar: "/placeholder.svg",
        joinDate: "2020-07-10",
      },
      {
        id: 107,
        name: "Kevin Malone",
        position: "Travel Support",
        email: "kevin.malone@btms.com",
        phone: "+1 (212) 555-1007",
        status: "On Leave",
        avatar: "/placeholder.svg",
        joinDate: "2020-08-05",
      },
    ],
  },
  2: {
    id: 2,
    name: "Operations",
    employees: [
      {
        id: 201,
        name: "Michael Rodriguez",
        position: "Operations Manager",
        email: "michael.rodriguez@btms.com",
        phone: "+1 (212) 555-2001",
        status: "Active",
        avatar: "/placeholder.svg",
        joinDate: "2020-03-10",
      },
      {
        id: 202,
        name: "Sarah Williams",
        position: "Operations Supervisor",
        email: "sarah.williams@btms.com",
        phone: "+1 (212) 555-2002",
        status: "Active",
        avatar: "/placeholder.svg",
        joinDate: "2020-04-15",
      },
      {
        id: 203,
        name: "Robert Johnson",
        position: "Quality Control Specialist",
        email: "robert.johnson@btms.com",
        phone: "+1 (212) 555-2003",
        status: "Active",
        avatar: "/placeholder.svg",
        joinDate: "2020-05-10",
      },
      {
        id: 204,
        name: "Emily Davis",
        position: "Process Improvement Analyst",
        email: "emily.davis@btms.com",
        phone: "+1 (212) 555-2004",
        status: "Active",
        avatar: "/placeholder.svg",
        joinDate: "2020-06-20",
      },
      {
        id: 205,
        name: "David Wilson",
        position: "Operations Analyst",
        email: "david.wilson@btms.com",
        phone: "+1 (212) 555-2005",
        status: "Inactive",
        avatar: "/placeholder.svg",
        joinDate: "2020-07-15",
      },
    ],
  },
  // Add more departments as needed
}

export function DepartmentEmployees({ id }: { id: string }) {
  const [department, setDepartment] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate API call
    const fetchDepartment = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setDepartment(departmentData[id as keyof typeof departmentData] || departmentData[1])
      setLoading(false)
    }

    fetchDepartment()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!department) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Department not found</p>
      </div>
    )
  }

  const filteredEmployees = department.employees.filter(
    (employee: any) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="border-b bg-gray-50 p-4 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Employees in {department.name}</CardTitle>
            <CardDescription>Total: {department.employees.length} employees</CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search employees..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No employees found matching your search criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee: any) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                          <AvatarFallback>
                            {employee.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-xs text-gray-500">{employee.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          employee.status === "Active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : employee.status === "On Leave"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(employee.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/employees/${employee.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`mailto:${employee.email}`}>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/employees/${employee.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove from Department
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
