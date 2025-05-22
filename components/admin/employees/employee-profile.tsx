"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
} from "@/components/ui/alert-dialog"
import { Mail, Phone, MapPin, Award, Edit, MoreHorizontal, UserX, Send, Download, Printer, FileUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface EmployeeProfileProps {
  employee: any // In a real app, we would define a proper type
}

export function EmployeeProfile({ employee }: EmployeeProfileProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Inactive":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      case "Onboarding":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "On Leave":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const handleDeactivateEmployee = () => {
    toast({
      title: "Employee Deactivated",
      description: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName} has been deactivated.`,
    })
  }

  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: `An email has been sent to ${employee.personalInfo.email}.`,
    })
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
                  src={employee.personalInfo.avatar}
                  alt={`${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`}
                />
                <AvatarFallback className="bg-teal-600 text-white text-2xl">
                  {getInitials(employee.personalInfo.firstName, employee.personalInfo.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="mt-4 sm:mt-0 sm:ml-6">
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold">
                    {employee.personalInfo.firstName} {employee.personalInfo.lastName}
                  </h2>
                  <Badge variant="outline" className={`ml-3 ${getStatusColor(employee.employmentInfo.status)}`}>
                    {employee.employmentInfo.status}
                  </Badge>
                </div>
                <p className="text-gray-500">{employee.employmentInfo.position}</p>
                <p className="text-sm text-gray-500">Employee ID: {employee.employmentInfo.employeeId}</p>
              </div>
            </div>

            <div className="mt-4 sm:mt-0 flex gap-2">
              <Button variant="outline" size="sm" className="h-9" asChild>
                <a href={`/admin/employees/${employee.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </a>
              </Button>

              <DropdownMenu>
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                        <UserX className="mr-2 h-4 w-4" />
                        Deactivate Employee
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Deactivate Employee</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to deactivate this employee? They will no longer have access to the
                          system.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeactivateEmployee} className="bg-red-600 hover:bg-red-700">
                          Deactivate
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{employee.personalInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{employee.personalInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{employee.employmentInfo.workLocation}</p>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="payroll">Payroll</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Employment Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Department</dt>
                        <dd className="text-sm">{employee.employmentInfo.department}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Position</dt>
                        <dd className="text-sm">{employee.employmentInfo.position}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Employment Type</dt>
                        <dd className="text-sm">{employee.employmentInfo.employmentType}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                        <dd className="text-sm">{new Date(employee.employmentInfo.startDate).toLocaleDateString()}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Manager</dt>
                        <dd className="text-sm">{employee.employmentInfo.manager}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-500">Current Rating</span>
                          <span className="text-sm font-medium">{employee.performance.currentRating}/5.0</span>
                        </div>
                        <Progress value={employee.performance.currentRating * 20} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          Last reviewed on {new Date(employee.performance.lastReviewDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="pt-2">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Current Goals</h4>
                        {employee.performance.goals.slice(0, 2).map((goal: any) => (
                          <div key={goal.id} className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">{goal.title}</span>
                              <span className="text-xs font-medium">{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className="h-2" />
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-gray-500">
                                Due: {new Date(goal.dueDate).toLocaleDateString()}
                              </span>
                              <Badge
                                variant="outline"
                                className={
                                  goal.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : goal.status === "On Track"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-amber-100 text-amber-800"
                                }
                              >
                                {goal.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Leave Balance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Annual Leave</span>
                          <span className="text-sm">
                            {employee.leave.balance.annual.remaining}/{employee.leave.balance.annual.total} days
                          </span>
                        </div>
                        <Progress
                          value={(employee.leave.balance.annual.remaining / employee.leave.balance.annual.total) * 100}
                          className="h-2"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Sick Leave</span>
                          <span className="text-sm">
                            {employee.leave.balance.sick.remaining}/{employee.leave.balance.sick.total} days
                          </span>
                        </div>
                        <Progress
                          value={(employee.leave.balance.sick.remaining / employee.leave.balance.sick.total) * 100}
                          className="h-2"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Personal Leave</span>
                          <span className="text-sm">
                            {employee.leave.balance.personal.remaining}/{employee.leave.balance.personal.total} days
                          </span>
                        </div>
                        <Progress
                          value={
                            (employee.leave.balance.personal.remaining / employee.leave.balance.personal.total) * 100
                          }
                          className="h-2"
                        />
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Recent Leave</h4>
                      {employee.leave.history.slice(0, 2).map((leave: any) => (
                        <div key={leave.id} className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm">{leave.type}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(leave.startDate).toLocaleDateString()} -{" "}
                              {new Date(leave.endDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              leave.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : leave.status === "Pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {leave.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Attendance This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-green-600">{employee.attendance.currentMonth.present}</p>
                        <p className="text-sm text-gray-500">Present</p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-red-600">{employee.attendance.currentMonth.absent}</p>
                        <p className="text-sm text-gray-500">Absent</p>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-amber-600">{employee.attendance.currentMonth.leave}</p>
                        <p className="text-sm text-gray-500">Leave</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-blue-600">{employee.attendance.currentMonth.late}</p>
                        <p className="text-sm text-gray-500">Late</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Recent Attendance</h4>
                      {employee.attendance.history.slice(0, 3).map((record: any, index: number) => (
                        <div key={index} className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm">{new Date(record.date).toLocaleDateString()}</p>
                            <p className="text-xs text-gray-500">
                              {record.status === "Present"
                                ? `${record.clockIn} - ${record.clockOut}`
                                : record.reason || "Not Available"}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              record.status === "Present"
                                ? "bg-green-100 text-green-800"
                                : record.status === "Leave"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {record.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
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
                          <dt className="text-sm font-medium text-gray-500">First Name</dt>
                          <dd className="mt-1">{employee.personalInfo.firstName}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                          <dd className="mt-1">{employee.personalInfo.lastName}</dd>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Email</dt>
                          <dd className="mt-1">{employee.personalInfo.email}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Phone</dt>
                          <dd className="mt-1">{employee.personalInfo.phone}</dd>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                          <dd className="mt-1">{new Date(employee.personalInfo.dateOfBirth).toLocaleDateString()}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Gender</dt>
                          <dd className="mt-1">{employee.personalInfo.gender}</dd>
                        </div>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500">Address</dt>
                        <dd className="mt-1">
                          {employee.personalInfo.address}, {employee.personalInfo.city}, {employee.personalInfo.state}{" "}
                          {employee.personalInfo.zipCode}, {employee.personalInfo.country}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                        <dd className="mt-1">{employee.documents.emergencyContact.name}</dd>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500">Relationship</dt>
                        <dd className="mt-1">{employee.documents.emergencyContact.relationship}</dd>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500">Phone</dt>
                        <dd className="mt-1">{employee.documents.emergencyContact.phone}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span className="text-sm">Resume/CV</span>
                        <Badge
                          variant="outline"
                          className={
                            employee.documents.resume ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {employee.documents.resume ? "Submitted" : "Missing"}
                        </Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm">ID Proof</span>
                        <Badge
                          variant="outline"
                          className={
                            employee.documents.idProof ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {employee.documents.idProof ? "Submitted" : "Missing"}
                        </Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm">Address Proof</span>
                        <Badge
                          variant="outline"
                          className={
                            employee.documents.addressProof
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {employee.documents.addressProof ? "Submitted" : "Missing"}
                        </Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm">Education Certificates</span>
                        <Badge
                          variant="outline"
                          className={
                            employee.documents.educationCertificates
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {employee.documents.educationCertificates ? "Submitted" : "Missing"}
                        </Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm">Offer Letter</span>
                        <Badge
                          variant="outline"
                          className={
                            employee.documents.offerLetter ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {employee.documents.offerLetter ? "Submitted" : "Missing"}
                        </Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm">Contract Agreement</span>
                        <Badge
                          variant="outline"
                          className={
                            employee.documents.contractAgreement
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {employee.documents.contractAgreement ? "Submitted" : "Missing"}
                        </Badge>
                      </li>
                    </ul>

                    <Button variant="outline" className="w-full mt-4">
                      <FileUp className="mr-2 h-4 w-4" />
                      Upload Documents
                    </Button>
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
                          <dt className="text-sm font-medium text-gray-500">Employee ID</dt>
                          <dd className="mt-1">{employee.employmentInfo.employeeId}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Status</dt>
                          <dd className="mt-1">
                            <Badge variant="outline" className={getStatusColor(employee.employmentInfo.status)}>
                              {employee.employmentInfo.status}
                            </Badge>
                          </dd>
                        </div>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500">Department</dt>
                        <dd className="mt-1">{employee.employmentInfo.department}</dd>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500">Position</dt>
                        <dd className="mt-1">{employee.employmentInfo.position}</dd>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Employment Type</dt>
                          <dd className="mt-1">{employee.employmentInfo.employmentType}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                          <dd className="mt-1">{new Date(employee.employmentInfo.startDate).toLocaleDateString()}</dd>
                        </div>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500">Manager</dt>
                        <dd className="mt-1">{employee.employmentInfo.manager}</dd>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500">Work Location</dt>
                        <dd className="mt-1">{employee.employmentInfo.workLocation}</dd>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Work Email</dt>
                          <dd className="mt-1">{employee.employmentInfo.workEmail}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Work Phone</dt>
                          <dd className="mt-1">{employee.employmentInfo.workPhone}</dd>
                        </div>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Compensation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Salary Type</dt>
                          <dd className="mt-1">{employee.compensationInfo.salaryType}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Salary Amount</dt>
                          <dd className="mt-1">{employee.compensationInfo.salaryAmount}</dd>
                        </div>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500">Pay Frequency</dt>
                        <dd className="mt-1">{employee.compensationInfo.payFrequency}</dd>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Bank Name</dt>
                          <dd className="mt-1">{employee.compensationInfo.bankName}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Account Number</dt>
                          <dd className="mt-1">{employee.compensationInfo.accountNumber}</dd>
                        </div>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500">Benefits</dt>
                        <dd className="mt-1">
                          <div className="flex flex-wrap gap-2">
                            {employee.compensationInfo.benefits.map((benefit: string, index: number) => (
                              <Badge key={index} variant="outline" className="bg-teal-50 text-teal-700">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </dd>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Last Review</dt>
                          <dd className="mt-1">
                            {new Date(employee.compensationInfo.lastReview).toLocaleDateString()}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Next Review</dt>
                          <dd className="mt-1">
                            {new Date(employee.compensationInfo.nextReview).toLocaleDateString()}
                          </dd>
                        </div>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Overall Rating</span>
                          <span className="text-sm font-medium">{employee.performance.currentRating}/5.0</span>
                        </div>
                        <Progress value={employee.performance.currentRating * 20} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          Last reviewed on {new Date(employee.performance.lastReviewDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Review Comments</h4>
                        <p className="text-sm text-gray-700">{employee.performance.reviewComments}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {employee.performance.skills.map((skill: string, index: number) => (
                            <Badge key={index} variant="outline" className="bg-sky-50 text-sky-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Certifications</h4>
                        <div className="flex flex-wrap gap-2">
                          {employee.performance.certifications.map((cert: string, index: number) => (
                            <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Goals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {employee.performance.goals.map((goal: any) => (
                        <div key={goal.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">{goal.title}</h4>
                            <Badge
                              variant="outline"
                              className={
                                goal.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : goal.status === "On Track"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-amber-100 text-amber-800"
                              }
                            >
                              {goal.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              Due: {new Date(goal.dueDate).toLocaleDateString()}
                            </span>
                            <span className="text-xs font-medium">{goal.progress}% Complete</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>
                      ))}

                      <Button variant="outline" className="w-full">
                        <Award className="mr-2 h-4 w-4" />
                        Add New Goal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Attendance Tab */}
            <TabsContent value="attendance" className="mt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Monthly Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-green-600">{employee.attendance.currentMonth.present}</p>
                        <p className="text-sm text-gray-500">Present</p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-red-600">{employee.attendance.currentMonth.absent}</p>
                        <p className="text-sm text-gray-500">Absent</p>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-amber-600">{employee.attendance.currentMonth.leave}</p>
                        <p className="text-sm text-gray-500">Leave</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-blue-600">{employee.attendance.currentMonth.late}</p>
                        <p className="text-sm text-gray-500">Late</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Attendance History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="px-4 py-2 text-left font-medium">Date</th>
                            <th className="px-4 py-2 text-left font-medium">Status</th>
                            <th className="px-4 py-2 text-left font-medium">Clock In</th>
                            <th className="px-4 py-2 text-left font-medium">Clock Out</th>
                            <th className="px-4 py-2 text-left font-medium">Hours</th>
                            <th className="px-4 py-2 text-left font-medium">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employee.attendance.history.map((record: any, index: number) => {
                            // Calculate hours if present
                            let hours = "-"
                            if (record.status === "Present" && record.clockIn !== "-" && record.clockOut !== "-") {
                              // This is simplified - in a real app you'd parse the times properly
                              hours = "8h 30m"
                            }

                            return (
                              <tr key={index} className="border-b">
                                <td className="px-4 py-2">{new Date(record.date).toLocaleDateString()}</td>
                                <td className="px-4 py-2">
                                  <Badge
                                    variant="outline"
                                    className={
                                      record.status === "Present"
                                        ? "bg-green-100 text-green-800"
                                        : record.status === "Leave"
                                          ? "bg-amber-100 text-amber-800"
                                          : "bg-red-100 text-red-800"
                                    }
                                  >
                                    {record.status}
                                  </Badge>
                                </td>
                                <td className="px-4 py-2">{record.clockIn}</td>
                                <td className="px-4 py-2">{record.clockOut}</td>
                                <td className="px-4 py-2">{hours}</td>
                                <td className="px-4 py-2">{record.reason || "-"}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Payroll Tab */}
            <TabsContent value="payroll" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payroll History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left font-medium">Period</th>
                          <th className="px-4 py-2 text-left font-medium">Pay Date</th>
                          <th className="px-4 py-2 text-left font-medium">Gross Amount</th>
                          <th className="px-4 py-2 text-left font-medium">Net Amount</th>
                          <th className="px-4 py-2 text-left font-medium">Status</th>
                          <th className="px-4 py-2 text-left font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employee.payroll.history.map((record: any) => (
                          <tr key={record.id} className="border-b">
                            <td className="px-4 py-2">{record.period}</td>
                            <td className="px-4 py-2">{new Date(record.payDate).toLocaleDateString()}</td>
                            <td className="px-4 py-2">{record.grossAmount}</td>
                            <td className="px-4 py-2">{record.netAmount}</td>
                            <td className="px-4 py-2">
                              <Badge variant="outline" className="bg-green-100 text-green-800">
                                {record.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-2">
                              <Button variant="ghost" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Payslip
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
