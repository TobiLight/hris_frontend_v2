"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MoreVertical,
  Edit,
  Trash2,
  UserCog,
  Mail,
  Phone,
  Calendar,
  Search,
  Building,
  UserX,
} from "lucide-react";
import Link from "next/link";
import { useEmployeeContext } from "./employee-context";
import { format } from "date-fns";
import { deleteEmployee, type Employee } from "@/lib/api/employee-service";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface EmployeeListProps {
  employees: Employee[];
  handleDeleteEmployee: (employee: Employee) => void
}

export function EmployeeList({ employees, handleDeleteEmployee }: EmployeeListProps) {
  const { viewType } = useEmployeeContext();
  const router = useRouter();

  console.log("EmployeeList rendering with employees:", employees);

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "bg-green-100 text-green-800 hover:bg-green-100"
      : "bg-gray-100 text-gray-800 hover:bg-gray-100";
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  if (!employees) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-gray-100 p-3 mb-4">
          <Search className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium">No employees found</h3>
        <p className="text-sm text-gray-500 mt-1">
          Try adjusting your search or filter to find what you're looking for.
        </p>
        <Button variant="outline" className="mt-4">
          Clear filters
        </Button>
      </div>
    );
  }

  return viewType === "table" ? (
    <Card className="border-none shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      {employee.image_uri && employee.image_uri.length ? (
                        <AvatarImage
                          src={employee.image_uri || "/placeholder.svg"}
                          alt={`${employee.first_name} ${employee.last_name}`}
                        />
                      ) : (
                        <AvatarFallback className="bg-teal-100 text-teal-800 text-lg">
                          {getInitials(employee.first_name, employee.last_name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <div className="font-medium">{`${employee.first_name} ${employee.last_name}`}</div>
                      <div className="text-sm text-gray-500">
                        {employee.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.department?.name || "N/A"}</TableCell>
                <TableCell>{employee.job_title}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getStatusColor(employee.is_active)}
                  >
                    {employee.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(employee.employment_date)}</TableCell>
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
                          <UserCog className="mr-2 h-4 w-4" />
                          View Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {/* <DropdownMenuItem className="text-red-600">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => deleteUser(employee)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </DropdownMenuItem> */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="text-red-600"
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this employee?
                              This action is irreversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteEmployee(employee)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  ) : (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {employees.map((employee) => (
        <Card
          key={employee.id}
          className="border-none shadow-md overflow-hidden"
        >
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    {employee.image_uri && employee.image_uri.length ? (
                      <AvatarImage
                        src={employee.image_uri || "/placeholder.svg"}
                        alt={`${employee.first_name} ${employee.last_name}`}
                      />
                    ) : (
                      <AvatarFallback className="bg-teal-100 text-teal-800 text-lg">
                        {getInitials(employee.first_name, employee.last_name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <div className="font-medium">{`${employee.first_name} ${employee.last_name}`}</div>
                    <div className="text-sm text-gray-500">
                      {employee.job_title}
                    </div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={getStatusColor(employee.is_active)}
                >
                  {employee.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center text-sm">
                <Mail className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-gray-600 truncate">{employee.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{employee.phone || "N/A"}</span>
              </div>
              <div className="flex items-center text-sm">
                <Building className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-gray-600">
                  {employee.department?.name || "N/A"}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-gray-600">
                  Joined: {formatDate(employee.employment_date)}
                </span>
              </div>
            </div>
            <div className="border-t p-3 flex justify-end gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/admin/employees/${employee.id}`}>
                  <UserCog className="mr-2 h-4 w-4" />
                  View
                </Link>
              </Button>
              <Button variant="ghost" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
