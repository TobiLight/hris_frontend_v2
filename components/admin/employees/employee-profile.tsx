"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Mail,
  Phone,
  MapPin,
  Edit,
  MoreHorizontal,
  UserX,
  Send,
  Download,
  Printer,
  FileUp,
  Calendar,
  Clock,
  User,
  UserCheck,
} from "lucide-react";
import {
  activateEmployee,
  deactivateEmployee,
  Employee,
  fetchEmployeeById,
} from "@/lib/api/employee-service";
import { formatDate, getInitials } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

interface EmployeeProfileViewProps {
  employeeId: string;
}

export function EmployeeProfileView({ employeeId }: { employeeId: string }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [employee, setEmployee] = useState<Employee>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    async function loadEmployeeData() {
      try {
        setLoading(true);
        const data = await fetchEmployeeById(employeeId);
        console.log("Employee data:", data);
        setEmployee(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching employee:", err);
        setError("Failed to load employee data. Please try again later.");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load employee data. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    }

    loadEmployeeData();
  }, [employeeId, toast]);

  const getStatusColor = (status: boolean) => {
    return status
      ? "bg-green-100 text-green-800 hover:bg-green-100"
      : "bg-gray-100 text-gray-800 hover:bg-gray-100";
  };

  const getInitialsFromName = (firstName: string, lastName: string) => {
    return getInitials(`${firstName} ${lastName}`);
  };

  const handleDeactivateEmployee = () => {
    async function deactivateUser() {
      let user = await deactivateEmployee(employeeId);

      setEmployee(user);
      if (!user.is_active)
        toast({
          title: "Employee Deactivated",
          description: `${user?.first_name} ${user?.last_name} has been deactivated.`,
        });
      else
        toast({
          title: "Something wrong has happened",
          description: `An error occured while deactivating ${user?.first_name} ${user?.last_name}.`,
        });
    }

    deactivateUser();
    setOpen(false)
  };

  const handleActivateEmployee = () => {
    async function activateUser() {
      let user = await activateEmployee(employeeId);

      setEmployee(user);
      if (user.is_active)
        toast({
          title: "Employee Activated",
          description: `${user?.first_name} ${user?.last_name} has been activated.`,
        });
      else
        toast({
          title: "Something wrong has happened",
          description: `An error occured while activating ${user?.first_name} ${user?.last_name}.`,
        });
    }

    activateUser();
    setOpen(false)
  };

  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: `An email has been sent to ${employee?.email}.`,
    });
  };

  if (loading) {
    return <EmployeeProfileSkeleton />;
  }

  if (error) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="pt-6">
          <div className="text-center p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Error Loading Employee
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!employee) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="pt-6">
          <div className="text-center p-6">
            <h2 className="text-xl font-semibold mb-2">Employee Not Found</h2>
            <p className="text-gray-600 mb-4">
              The requested employee could not be found.
            </p>
            <Button asChild>
              <Link href="/admin/employees">Back to Employees List</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-none shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-teal-600 to-sky-600 h-32 sm:h-40"></div>
        <CardContent className="relative px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-20 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white shadow-xl">
                <AvatarImage
                  src={
                    employee.image_uri ||
                    "/placeholder.svg?height=128&width=128"
                  }
                  alt={`${employee.first_name} ${employee.last_name}`}
                />
                <AvatarFallback className="bg-teal-600 text-white text-2xl">
                  {getInitialsFromName(employee.first_name, employee.last_name)}
                </AvatarFallback>
              </Avatar>
              <div className="mt-4 sm:mt-0 sm:ml-6">
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold">
                    {employee.first_name}{" "}
                    {employee.middle_name ? employee.middle_name + " " : ""}
                    {employee.last_name}
                  </h2>
                  <Badge
                    variant="outline"
                    className={`ml-3 ${getStatusColor(employee.is_active)}`}
                  >
                    {employee.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-gray-500">{employee.job_title}</p>
                <p className="text-sm text-gray-500">
                  Employee ID: {employee.staff_id || "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-4 sm:mt-0 flex gap-2">
              <Button variant="outline" size="sm" className="h-9" asChild>
                <Link href={`/admin/employees/${employee.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>

              <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSendEmail}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload Document
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Printer className="mr-2 h-4 w-4" />
                    Print Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {employee.is_active ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="text-red-600"
                        >
                          <UserX className="mr-2 h-4 w-4" />
                          Deactivate Employee
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Deactivate Employee
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to deactivate this employee?
                            They will no longer have access to the system.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeactivateEmployee}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Deactivate
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="text-blue-600"
                        >
                          <UserCheck className="mr-2 h-4 w-4" />
                          Activate Employee
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Activate Employee</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to re-activate this employee?
                            They will have access to the system.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleActivateEmployee}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Activate
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{employee.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">
                  {employee.phone || "Not provided"}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">
                  {employee.city}, {employee.state}, {employee.country}
                </p>
              </div>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="leave">Leave</TabsTrigger>
              <TabsTrigger value="payroll">Payroll</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Employment Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Department
                        </dt>
                        <dd className="text-sm">
                          {employee.department?.name || "Not assigned"}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Position
                        </dt>
                        <dd className="text-sm">{employee.job_title}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Employment Type
                        </dt>
                        <dd className="text-sm">
                          {employee.employment_type?.name || "Not specified"}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Start Date
                        </dt>
                        <dd className="text-sm">
                          {formatDate(employee.employment_date)}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Status
                        </dt>
                        <dd className="text-sm">
                          <Badge
                            variant="outline"
                            className={getStatusColor(employee.is_active)}
                          >
                            {employee.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Full Name
                        </dt>
                        <dd className="text-sm">
                          {employee.first_name}{" "}
                          {employee.middle_name
                            ? employee.middle_name + " "
                            : ""}
                          {employee.last_name}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Gender
                        </dt>
                        <dd className="text-sm">{employee.gender}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Date of Birth
                        </dt>
                        <dd className="text-sm">{formatDate(employee.dob)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Personal Email
                        </dt>
                        <dd className="text-sm">{employee.personal_email}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Address
                        </dt>
                        <dd className="text-sm">
                          {employee.address || "Not provided"}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Next of Kin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {employee.next_of_kin ? (
                      <dl className="space-y-4">
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">
                            Name
                          </dt>
                          <dd className="text-sm">
                            {employee.next_of_kin.name}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">
                            Relationship
                          </dt>
                          <dd className="text-sm">
                            {employee.next_of_kin.relationship}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">
                            Phone
                          </dt>
                          <dd className="text-sm">
                            {employee.next_of_kin.phone}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">
                            Email
                          </dt>
                          <dd className="text-sm">
                            {employee.next_of_kin.email || "Not provided"}
                          </dd>
                        </div>
                      </dl>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No next of kin information provided.
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Payroll Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Payroll Class
                        </dt>
                        <dd className="text-sm">
                          {employee.payroll_class?.name || "Not assigned"}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Basic Pay
                        </dt>
                        <dd className="text-sm">
                          {employee.payroll_class?.basic_pay
                            ? `₦${employee.payroll_class.basic_pay.toLocaleString()}`
                            : "Not specified"}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Total Allowances
                        </dt>
                        <dd className="text-sm">
                          {employee.payroll_class?.total_allowances
                            ? `₦${employee.payroll_class.total_allowances.toLocaleString()}`
                            : "Not specified"}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Bank
                        </dt>
                        <dd className="text-sm">
                          {employee.bank?.name || "Not specified"}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Account Number
                        </dt>
                        <dd className="text-sm">
                          {employee.bank_account_number || "Not provided"}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            First Name
                          </dt>
                          <dd className="mt-1">{employee.first_name}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Last Name
                          </dt>
                          <dd className="mt-1">{employee.last_name}</dd>
                        </div>
                      </div>

                      {employee.middle_name && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Middle Name
                          </dt>
                          <dd className="mt-1">{employee.middle_name}</dd>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Email
                          </dt>
                          <dd className="mt-1">{employee.email}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Personal Email
                          </dt>
                          <dd className="mt-1">{employee.personal_email}</dd>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Phone
                          </dt>
                          <dd className="mt-1">
                            {employee.phone || "Not provided"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Gender
                          </dt>
                          <dd className="mt-1">{employee.gender}</dd>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Date of Birth
                          </dt>
                          <dd className="mt-1">{formatDate(employee.dob)}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Staff ID
                          </dt>
                          <dd className="mt-1">
                            {employee.staff_id || "Not assigned"}
                          </dd>
                        </div>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Address
                        </dt>
                        <dd className="mt-1">
                          {employee.address ? `${employee.address}, ` : ""}
                          {employee.city}, {employee.state}, {employee.country}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Next of Kin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {employee.next_of_kin ? (
                      <dl className="space-y-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Name
                          </dt>
                          <dd className="mt-1">{employee.next_of_kin.name}</dd>
                        </div>

                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Relationship
                          </dt>
                          <dd className="mt-1">
                            {employee.next_of_kin.relationship}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Phone
                          </dt>
                          <dd className="mt-1">{employee.next_of_kin.phone}</dd>
                        </div>

                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Email
                          </dt>
                          <dd className="mt-1">
                            {employee.next_of_kin.email || "Not provided"}
                          </dd>
                        </div>
                      </dl>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 text-center">
                        <User className="h-10 w-10 text-gray-300 mb-2" />
                        <p className="text-gray-500">
                          No next of kin information provided
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          asChild
                        >
                          <Link href={`/admin/employees/${employee.id}/edit`}>
                            Add Next of Kin
                          </Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Employment Tab */}
            <TabsContent value="employment" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Employment Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Employee ID
                          </dt>
                          <dd className="mt-1">
                            {employee.staff_id || "Not assigned"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Status
                          </dt>
                          <dd className="mt-1">
                            <Badge
                              variant="outline"
                              className={getStatusColor(employee.is_active)}
                            >
                              {employee.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </dd>
                        </div>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Department
                        </dt>
                        <dd className="mt-1">
                          {employee.department?.name || "Not assigned"}
                        </dd>
                      </div>

                      {employee.department?.description && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Department Description
                          </dt>
                          <dd className="mt-1">
                            {employee.department.description}
                          </dd>
                        </div>
                      )}

                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Job Title
                        </dt>
                        <dd className="mt-1">{employee.job_title}</dd>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Employment Type
                          </dt>
                          <dd className="mt-1">
                            {employee.employment_type?.name || "Not specified"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Employment Date
                          </dt>
                          <dd className="mt-1">
                            {formatDate(employee.employment_date)}
                          </dd>
                        </div>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Work Email
                        </dt>
                        <dd className="mt-1">{employee.email}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Roles & Permissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          Roles
                        </h4>
                        {employee.roles && employee.roles.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {employee.roles.map((role: any) => (
                              <Badge
                                key={role.id}
                                variant="outline"
                                className="bg-blue-50 text-blue-700"
                              >
                                {role.name}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">
                            No roles assigned
                          </p>
                        )}
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          Permissions
                        </h4>
                        {employee.permissions &&
                        employee.permissions.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {employee.permissions.map((permission: any) => (
                              <Badge
                                key={permission.id}
                                variant="outline"
                                className="bg-purple-50 text-purple-700"
                              >
                                {permission.name}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">
                            No specific permissions assigned
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Attendance Tab */}
            <TabsContent value="attendance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Records</CardTitle>
                </CardHeader>
                <CardContent>
                  {employee.attendance && employee.attendance.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="px-4 py-2 text-left font-medium">
                              Date
                            </th>
                            <th className="px-4 py-2 text-left font-medium">
                              Status
                            </th>
                            <th className="px-4 py-2 text-left font-medium">
                              Clock In
                            </th>
                            <th className="px-4 py-2 text-left font-medium">
                              Clock Out
                            </th>
                            <th className="px-4 py-2 text-left font-medium">
                              Total Hours
                            </th>
                            <th className="px-4 py-2 text-left font-medium">
                              Notes
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {employee.attendance.map((record: any) => {
                            // Calculate hours if present
                            let hours = "-";
                            if (record.clock_in && record.clock_out) {
                              const clockIn = new Date(record.clock_in);
                              const clockOut = new Date(record.clock_out);
                              const diffMs =
                                clockOut.getTime() - clockIn.getTime();
                              const diffHrs = Math.floor(
                                diffMs / (1000 * 60 * 60)
                              );
                              const diffMins = Math.floor(
                                (diffMs % (1000 * 60 * 60)) / (1000 * 60)
                              );
                              hours = `${diffHrs}h ${diffMins}m`;
                            }

                            return (
                              <tr key={record.id} className="border-b">
                                <td className="px-4 py-2">
                                  {formatDate(record.date)}
                                </td>
                                <td className="px-4 py-2">
                                  <Badge
                                    variant="outline"
                                    className={
                                      record.status === "PRESENT"
                                        ? "bg-green-100 text-green-800"
                                        : record.status === "LEAVE"
                                          ? "bg-amber-100 text-amber-800"
                                          : "bg-red-100 text-red-800"
                                    }
                                  >
                                    {record.status}
                                  </Badge>
                                </td>
                                <td className="px-4 py-2">
                                  {record.clock_in
                                    ? new Date(
                                        record.clock_in
                                      ).toLocaleTimeString()
                                    : "-"}
                                </td>
                                <td className="px-4 py-2">
                                  {record.clock_out
                                    ? new Date(
                                        record.clock_out
                                      ).toLocaleTimeString()
                                    : "-"}
                                </td>
                                <td className="px-4 py-2">{hours}</td>
                                <td className="px-4 py-2">
                                  {record.notes || "-"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                      <Clock className="h-10 w-10 text-gray-300 mb-2" />
                      <p className="text-gray-500">
                        No attendance records found
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Leave Tab */}
            <TabsContent value="leave" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Leave Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  {employee.leave_requests &&
                  employee.leave_requests.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="px-4 py-2 text-left font-medium">
                              Type
                            </th>
                            <th className="px-4 py-2 text-left font-medium">
                              Start Date
                            </th>
                            <th className="px-4 py-2 text-left font-medium">
                              End Date
                            </th>
                            <th className="px-4 py-2 text-left font-medium">
                              Days
                            </th>
                            <th className="px-4 py-2 text-left font-medium">
                              Status
                            </th>
                            <th className="px-4 py-2 text-left font-medium">
                              Reason
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {employee.leave_requests.map((leave: any) => {
                            // Calculate days
                            const startDate = new Date(leave.start_date);
                            const endDate = new Date(leave.end_date);
                            const diffTime = Math.abs(
                              endDate.getTime() - startDate.getTime()
                            );
                            const diffDays =
                              Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days

                            return (
                              <tr key={leave.id} className="border-b">
                                <td className="px-4 py-2">{leave.type}</td>
                                <td className="px-4 py-2">
                                  {formatDate(leave.start_date)}
                                </td>
                                <td className="px-4 py-2">
                                  {formatDate(leave.end_date)}
                                </td>
                                <td className="px-4 py-2">{diffDays}</td>
                                <td className="px-4 py-2">
                                  <Badge
                                    variant="outline"
                                    className={
                                      leave.status === "APPROVED"
                                        ? "bg-green-100 text-green-800"
                                        : leave.status === "PENDING"
                                          ? "bg-amber-100 text-amber-800"
                                          : "bg-red-100 text-red-800"
                                    }
                                  >
                                    {leave.status}
                                  </Badge>
                                </td>
                                <td className="px-4 py-2">
                                  {leave.reason || "-"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                      <Calendar className="h-10 w-10 text-gray-300 mb-2" />
                      <p className="text-gray-500">No leave requests found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payroll Tab */}
            <TabsContent value="payroll" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Payroll Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Payroll Class
                        </dt>
                        <dd className="mt-1">
                          {employee.payroll_class?.name || "Not assigned"}
                        </dd>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Basic Pay
                          </dt>
                          <dd className="mt-1">
                            {employee.payroll_class?.basic_pay
                              ? `₦${employee.payroll_class.basic_pay.toLocaleString()}`
                              : "Not specified"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Total Allowances
                          </dt>
                          <dd className="mt-1">
                            {employee.payroll_class?.total_allowances
                              ? `₦${employee.payroll_class.total_allowances.toLocaleString()}`
                              : "Not specified"}
                          </dd>
                        </div>
                      </div>

                      {employee.payroll_class?.housing_allowance && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Housing Allowance
                          </dt>
                          <dd className="mt-1">
                            ₦
                            {employee.payroll_class.housing_allowance.toLocaleString()}
                          </dd>
                        </div>
                      )}

                      {employee.payroll_class?.transport_allowance && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Transport Allowance
                          </dt>
                          <dd className="mt-1">
                            ₦
                            {employee.payroll_class.transport_allowance.toLocaleString()}
                          </dd>
                        </div>
                      )}

                      {employee.payroll_class?.health_allowance && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Health Allowance
                          </dt>
                          <dd className="mt-1">
                            ₦
                            {employee.payroll_class.health_allowance.toLocaleString()}
                          </dd>
                        </div>
                      )}

                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Tax Number
                        </dt>
                        <dd className="mt-1">
                          {employee.tax_number || "Not provided"}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Bank & Pension Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Bank Name
                        </dt>
                        <dd className="mt-1">
                          {employee.bank?.name || "Not specified"}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Account Number
                        </dt>
                        <dd className="mt-1">
                          {employee.bank_account_number || "Not provided"}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Pension Provider
                        </dt>
                        <dd className="mt-1">
                          {employee.pension?.name || "Not specified"}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Pension Number
                        </dt>
                        <dd className="mt-1">
                          {employee.pension_number || "Not provided"}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function EmployeeProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="border rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-200 h-32 sm:h-40"></div>
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-20 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <Skeleton className="h-24 w-24 sm:h-32 sm:w-32 rounded-full" />
              <div className="mt-4 sm:mt-0 sm:ml-6">
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <div className="grid gap-6 md:grid-cols-2">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
