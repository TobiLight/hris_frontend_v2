"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import type { Department } from "@/lib/api/department-service"
import { Skeleton } from "@/components/ui/skeleton"
import { useMemo } from "react"

// Define colors for charts
const COLORS = [
  "#0d9488",
  "#0284c7",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#6366f1",
  "#ef4444",
  "#84cc16",
  "#14b8a6",
  "#8b5cf6",
  "#f43f5e",
]

interface DepartmentStructureProps {
  departments: Department[]
  isLoading: boolean
}

export function DepartmentStructure({ departments, isLoading }: DepartmentStructureProps) {
  // Prepare chart data from departments
  const chartData = useMemo(() => {
    return departments.map((dept, index) => ({
      name: dept.name,
      headCount: dept.team_members?.length || 0,
      // Since we don't have budget in the API, we'll simulate it based on team size
      budget: (dept.team_members?.length || 0) * 50000,
      color: COLORS[index % COLORS.length],
    }))
  }, [departments])

  // Prepare location data (simulated since we don't have location in the API)
  const locationData = useMemo(() => {
    const locations: Record<string, number> = {}

    departments.forEach((dept) => {
      dept.team_members?.forEach((member) => {
        const location = member.city || "Unknown"
        locations[location] = (locations[location] || 0) + 1
      })
    })

    return Object.entries(locations).map(([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length],
    }))
  }, [departments])

  // Calculate totals
  const totals = useMemo(() => {
    const totalEmployees = departments.reduce((sum, dept) => sum + (dept.team_members?.length || 0), 0)
    const totalDepartments = departments.length
    const totalBudget = chartData.reduce((sum, dept) => sum + dept.budget, 0)

    return { totalEmployees, totalDepartments, totalBudget }
  }, [departments, chartData])

  const formatBudget = (value: number) => {
    return `N${(value / 1000).toFixed(0)}k`
  }

  if (isLoading) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gray-50 p-4 pb-3">
          <CardTitle>Department Structure</CardTitle>
          <CardDescription>Visualization of department data</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <Skeleton className="h-8 w-full mb-4" />
          <Skeleton className="h-80 w-full mb-4" />
          <div className="mt-4">
            <Skeleton className="h-4 w-40 mb-2" />
            <Skeleton className="h-4 w-36 mb-2" />
            <Skeleton className="h-4 w-44" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="border-b bg-gray-50 p-4 pb-3">
        <CardTitle>Department Structure</CardTitle>
        <CardDescription>Visualization of department data</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="headcount">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="headcount">Headcount</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>

          <TabsContent value="headcount" className="mt-4">
            {chartData.length === 0 ? (
              <div className="h-80 flex items-center justify-center text-muted-foreground">
                No department data available
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 60,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="headCount" name="Employees">
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </TabsContent>

          <TabsContent value="budget" className="mt-4">
            {chartData.length === 0 ? (
              <div className="h-80 flex items-center justify-center text-muted-foreground">
                No budget data available
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 60,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={formatBudget} />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Budget"]} />
                    <Bar dataKey="budget" name="Budget">
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </TabsContent>

          <TabsContent value="location" className="mt-4">
            {locationData.length === 0 ? (
              <div className="h-80 flex items-center justify-center text-muted-foreground">
                No location data available
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={locationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {locationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} employees`, "Count"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-sm text-gray-500">
          <p>Total Employees: {totals.totalEmployees}</p>
          <p>Total Departments: {totals.totalDepartments}</p>
          <p>Total Budget: N{totals.totalBudget.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}
