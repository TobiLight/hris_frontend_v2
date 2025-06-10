"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Building2,
  Users,
  DollarSign,
  MapPin,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Department, fetchDepartmentById } from "@/lib/api/department-service";
import { getInitials } from "@/lib/utils";

// Sample department data

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

export function DepartmentDetails({ id }: { id: string }) {
  const [department, setDepartment] = useState<Department | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDepartment() {
      const data = await fetchDepartmentById(id);
      setDepartment(data);
      setLoading(false);
    }

    getDepartment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Department not found</p>
      </div>
    );
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
              <Badge className="ml-3 bg-teal-600">XXX</Badge>
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
                          {department.team_lead?.image_uri ? (
                            <AvatarImage
                              src={
                                department.team_lead.image_uri ??
                                "/placeholder.svg"
                              }
                              alt={department.team_lead.first_name}
                            />
                          ) : (
                            <AvatarFallback>
                              {department.team_lead
                                ? getInitials(
                                    `${department.team_lead.first_name} ${department.team_lead.last_name}`,
                                    2
                                  )
                                : null}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {department.team_lead
                              ? department.team_lead.first_name +
                                " " +
                                department.team_lead.last_name
                              : "Not yet appointed"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {department.team_lead
                              ? department.team_lead.email
                              : null}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">{department.location}</p>
                    </div>
                  </div> */}

                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Budget</p>
                      <p className="text-gray-600">N100,000,000</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Headcount</p>
                    <p className="text-gray-600">
                      {department.team_members.length < 2
                        ? `${department.team_members.length} employee`
                        : `${department.team_members.length} employees`}
                    </p>
                  </div>
                </div>

                {/* <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{department.email}</p>
                  </div>
                </div> */}

                {/* <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">{department.phone}</p>
                  </div>
                </div> */}

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Created</p>
                    <p className="text-gray-600">
                      {new Date(department.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
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
                    data={department.team_members}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {department.team_members.map(
                      (entry: any, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      )
                    )}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* <Card>
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
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {department.budgetAllocation.map(
                      (entry: any, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      )
                    )}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `$${value.toLocaleString()}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card> */}
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
                  {/* {department.subDepartments.map(
                    (subDept: any, index: number) => (
                      <Card key={index} className="border border-gray-200">
                        <CardContent className="p-4">
                          <h4 className="font-medium">{subDept.name}</h4>
                          <p className="text-sm text-gray-500">
                            {subDept.headCount} employees
                          </p>
                        </CardContent>
                      </Card>
                    )
                  )} */}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Reporting Structure
                </h3>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 mr-3">
                      {department?.team_lead?.image_uri !== null ? (
                        <AvatarImage
                          src={
                            department?.team_lead?.image_uri ??
                            "/placeholder.svg"
                          }
                          alt={department?.team_lead?.first_name}
                        />
                      ) : (
                        <AvatarFallback>
                          {getInitials(
                            `${department?.team_lead?.first_name} ${department?.team_lead?.last_name}`,
                            2
                          )}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {department?.team_lead?.first_name}{" "}
                        {department?.team_lead?.last_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Department Manager
                      </p>
                    </div>
                  </div>

                  <div className="ml-6 pl-6 border-l-2 border-gray-300">
                    <div className="space-y-4">
                      {/* {department.subDepartments.map(
                        (subDept: any, index: number) => (
                          <div key={index} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-gray-400 mr-3"></div>
                            <div>
                              <p className="font-medium">{subDept.name} Lead</p>
                              <p className="text-sm text-gray-500">
                                {subDept.name}
                              </p>
                            </div>
                          </div>
                        )
                      )} */}
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
                <h3 className="text-lg font-medium mb-2">
                  Total Budget: N100,000,000
                </h3>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-600 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  65% of budget utilized
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Budget Allocation
                  </h3>
                  <div className="space-y-3">
                    {/* {department.budgetAllocation.map(
                      (item: any, index: number) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              {item.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              ${item.value.toLocaleString()}
                            </span>
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
                      )
                    )} */}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Budget Utilization
                  </h3>
                  {/* <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={department.monthlyPerformance}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => `$${value.toLocaleString()}`}
                      />
                      <Legend />
                      <Bar dataKey="expenses" fill="#FF8042" name="Expenses" />
                      {department.monthlyPerformance[0].revenue > 0 && (
                        <Bar dataKey="revenue" fill="#0088FE" name="Revenue" />
                      )}
                    </BarChart>
                  </ResponsiveContainer> */}
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
                    <p className="text-xs text-green-600">
                      ↑ 3% from last quarter
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500">Project Completion</p>
                    <p className="text-2xl font-bold">87%</p>
                    <p className="text-xs text-green-600">
                      ↑ 5% from last quarter
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500">
                      Employee Satisfaction
                    </p>
                    <p className="text-2xl font-bold">4.2/5</p>
                    <p className="text-xs text-gray-500">
                      No change from last quarter
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">
                  Monthly Performance
                </h3>
                {/* <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={department.monthlyPerformance}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Legend />
                    <Bar dataKey="expenses" fill="#FF8042" name="Expenses" />
                    {department.monthlyPerformance[0].revenue > 0 && (
                      <Bar dataKey="revenue" fill="#0088FE" name="Revenue" />
                    )}
                  </BarChart>
                </ResponsiveContainer> */}
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">
                  Key Performance Indicators
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Productivity</span>
                      <span className="text-sm text-gray-500">85%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-600 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Quality</span>
                      <span className="text-sm text-gray-500">92%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-600 rounded-full"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Timeliness</span>
                      <span className="text-sm text-gray-500">78%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-600 rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
