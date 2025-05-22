import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { MoreVertical, Edit, Trash2, Users, Eye } from "lucide-react"
import Link from "next/link"
import { Department } from "@/lib/api/department-service"

// Sample department data
// const departments = [
//   {
//     id: 1,
//     name: "Travel Services",
//     headCount: 45,
//     manager: "Jennifer Parker",
//     location: "New York HQ",
//     budget: "$1,250,000",
//   },
//   {
//     id: 2,
//     name: "Operations",
//     headCount: 25,
//     manager: "Michael Rodriguez",
//     location: "New York HQ",
//     budget: "$850,000",
//   },
//   {
//     id: 3,
//     name: "Finance",
//     headCount: 15,
//     manager: "David Chen",
//     location: "New York HQ",
//     budget: "$650,000",
//   },
//   {
//     id: 4,
//     name: "Marketing",
//     headCount: 12,
//     manager: "Sarah Johnson",
//     location: "Chicago Office",
//     budget: "$550,000",
//   },
//   {
//     id: 5,
//     name: "HR",
//     headCount: 8,
//     manager: "Emily Davis",
//     location: "New York HQ",
//     budget: "$350,000",
//   },
//   {
//     id: 6,
//     name: "IT",
//     headCount: 10,
//     manager: "Michael Brown",
//     location: "New York HQ",
//     budget: "$750,000",
//   },
//   {
//     id: 7,
//     name: "Admin",
//     headCount: 9,
//     manager: "Robert Wilson",
//     location: "New York HQ",
//     budget: "$300,000",
//   },
// ]

export function DepartmentList({departments}: {departments: Department[]}) {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="border-b bg-gray-50 p-4 pb-3">
        <CardTitle>Department List</CardTitle>
        <CardDescription>Overview of all departments</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          {departments && departments.length ? 
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Head Count</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell className="font-medium">{department.name}</TableCell>
                  <TableCell>{department.team_members.length}</TableCell>
                  <TableCell>{department.team_lead ? department.team_lead.first_name + " " + department.team_lead.last_name : ""}</TableCell>
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
                          <Link href={`/admin/departments/${department.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/departments/${department.id}/employees`}>
                            <Users className="mr-2 h-4 w-4" />
                            View Employees
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/departments/${department.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> : <p className="text-center my-5">There are currently no departments to display.</p> }
        </div>
      </CardContent>
    </Card>
  )
}
