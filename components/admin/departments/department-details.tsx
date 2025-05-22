"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Building2, Users, DollarSign, MapPin, Mail, Phone, Calendar } from "lucide-react"
import { useEffect, useState } from "react"

// Sample department data
const departmentData = {
  1: {
    id: 1,
    name: "Travel Services",
    code: "TRVL-001",
    description:
      "Handles all travel arrangements and bookings for corporate clients, including flights, accommodations, and ground transportation.",
    manager: {
      id: 101,
      name: "Jennifer Parker",
      email: "jennifer.parker@btms.com",
      avatar: "/placeholder.svg",
    },
    headCount: 45,
    location: "New York HQ",
    budget: "$1,250,000",
    email: "travel.services@btms.com",
    phone: "+1 (212) 555-1234",
    parentDepartment: null,
    createdAt: "2020-03-15",
    subDepartments: [
      { name: "Corporate Travel", headCount: 18 },
      { name: "Leisure Travel", headCount: 15 },
      { name: "Travel Support", headCount: 12 },
    ],
    budgetAllocation: [
      { name: "Salaries", value: 750000 },
      { name: "Operations", value: 250000 },
      { name: "Technology", value: 150000 },
      { name: "Marketing", value: 100000 },
    ],
    employeeDistribution: [
      { name: "Travel Agents", value: 25 },
      { name: "Support Staff", value: 10 },
      { name: "Management", value: 5 },
      { name: "IT Support", value: 5 },
    ],
    monthlyPerformance: [
      { month: "Jan", revenue: 95000, expenses: 85000 },
      { month: "Feb", revenue: 100000, expenses: 82000 },
      { month: "Mar", revenue: 110000, expenses: 90000 },
      { month: "Apr", revenue: 120000, expenses: 95000 },
      { month: "May", revenue: 130000, expenses: 100000 },
      { month: "Jun", revenue: 125000, expenses: 105000 },
    ],
  },
  2: {
    id: 2,
    name: "Operations",
    code: "OPS-002",
    description:
      "Oversees day-to-day business operations, logistics, and service delivery to ensure efficient functioning of the company.",
    manager: {
      id: 102,
      name: "Michael Rodriguez",
      email: "michael.rodriguez@btms.com",
      avatar: "/placeholder.svg",
    },
    headCount: 25,
    location: "New York HQ",
    budget: "$850,000",
    email: "operations@btms.com",
    phone: "+1 (212) 555-2345",
    parentDepartment: null,
    createdAt: "2020-04-10",
    subDepartments: [
      { name: "Service Delivery", headCount: 12 },
      { name: "Quality Control", headCount: 8 },
      { name: "Process Improvement", headCount: 5 },
    ],
    budgetAllocation: [
      { name: "Salaries", value: 500000 },
      { name: "Operations", value: 200000 },
      { name: "Technology", value: 100000 },
      { name: "Training", value: 50000 },
    ],
    employeeDistribution: [
      { name: "Operations Staff", value: 15 },
      { name: "Quality Analysts", value: 5 },
      { name: "Management", value: 5 },
    ],
    monthlyPerformance: [
      { month: "Jan", revenue: 0, expenses: 65000 },
      { month: "Feb", revenue: 0, expenses: 68000 },
      { month: "Mar", revenue: 0, expenses: 70000 },
      { month: "Apr", revenue: 0, expenses: 72000 },
      { month: "May", revenue: 0, expenses: 75000 },
      { month: "Jun", revenue: 0, expenses: 73000 },
    ],
  },
  // Add more departments as needed
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export function DepartmentDetails({ id }: { id: string }) {
  const [department, setDepartment] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="structure">Structure</TabsTrigger>
        <TabsTrigger value="budget">Budget</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold flex items-center">
              <Building2 className="mr-2 h-5 w-5 text-teal-600" />
              {department.name}
              <Badge className="ml-3 bg-teal-600">{department.code}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 mb-4">{department.description}</p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Department Manager</p>
                      <div className="flex items-center mt-1">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage
                            src={department.manager.avatar || "/placeholder.svg"}
                            alt={department.manager.name}
                          />
                          <AvatarFallback>
                            {department.manager.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{department.manager.name}</p>
                          <p className="text-xs text-gray-500">{department.manager.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">{department.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Budget</p>
                      <p className="text-gray-600">{department.budget}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Headcount</p>
                    <p className="text-gray-600">{department.headCount} employees</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{department.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">{department.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Created</p>
                    <p className="text-gray-600">
                      {new Date(department.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Employee Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={department.employeeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {department.employeeDistribution.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Budget Allocation</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={department.budgetAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {department.budgetAllocation.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="structure" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Department Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Sub-Departments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {department.subDepartments.map((subDept: any, index: number) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4">
                        <h4 className="font-medium">{subDept.name}</h4>
                        <p className="text-sm text-gray-500">{subDept.headCount} employees</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Reporting Structure</h3>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage
                        src={department.manager.avatar || "/placeholder.svg"}
                        alt={department.manager.name}
                      />
                      <AvatarFallback>
                        {department.manager.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{department.manager.name}</p>
                      <p className="text-sm text-gray-500">Department Manager</p>
                    </div>
                  </div>

                  <div className="ml-6 pl-6 border-l-2 border-gray-300">
                    <div className="space-y-4">
                      {department.subDepartments.map((subDept: any, index: number) => (
                        <div key={index} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-gray-400 mr-3"></div>
                          <div>
                            <p className="font-medium">{subDept.name} Lead</p>
                            <p className="text-sm text-gray-500">{subDept.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="budget" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Total Budget: {department.budget}</h3>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">65% of budget utilized</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Budget Allocation</h3>
                  <div className="space-y-3">
                    {department.budgetAllocation.map((item: any, index: number) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-sm text-gray-500">${item.value.toLocaleString()}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(item.value / department.budgetAllocation.reduce((acc: number, curr: any) => acc + curr.value, 0)) * 100}%`,
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Budget Utilization</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={department.monthlyPerformance}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Bar dataKey="expenses" fill="#FF8042" name="Expenses" />
                      {department.monthlyPerformance[0].revenue > 0 && (
                        <Bar dataKey="revenue" fill="#0088FE" name="Revenue" />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="performance" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500">Efficiency Rating</p>
                    <p className="text-2xl font-bold">92%</p>
                    <p className="text-xs text-green-600">↑ 3% from last quarter</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500">Project Completion</p>
                    <p className="text-2xl font-bold">87%</p>
                    <p className="text-xs text-green-600">↑ 5% from last quarter</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500">Employee Satisfaction</p>
                    <p className="text-2xl font-bold">4.2/5</p>
                    <p className="text-xs text-gray-500">No change from last quarter</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Monthly Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={department.monthlyPerformance}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="expenses" fill="#FF8042" name="Expenses" />
                    {department.monthlyPerformance[0].revenue > 0 && (
                      <Bar dataKey="revenue" fill="#0088FE" name="Revenue" />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Key Performance Indicators</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Productivity</span>
                      <span className="text-sm text-gray-500">85%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-600 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Quality</span>
                      <span className="text-sm text-gray-500">92%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-600 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Timeliness</span>
                      <span className="text-sm text-gray-500">78%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-600 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
