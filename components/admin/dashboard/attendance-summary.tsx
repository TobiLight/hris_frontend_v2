"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AttendanceSummary as AttendanceSummaryType } from "@/lib/api/dashboard-service"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AttendanceSummaryProps {
  data: AttendanceSummaryType[]
  isLoading: boolean
  error: string | null
}

export function AttendanceSummary({ data, isLoading, error }: AttendanceSummaryProps) {
  const [period, setPeriod] = useState("7days")

  // Format data for the chart
  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    Present: item.present,
    Late: item.late,
    Absent: item.absent,
    "Attendance Rate": Math.round(item.presentPercentage),
  }))

  return (
    <Card className="col-span-7">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Attendance Summary</CardTitle>
          <CardDescription>Daily attendance statistics</CardDescription>
        </div>
        <Tabs defaultValue="7days" value={period} onValueChange={setPeriod} className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="7days">7 Days</TabsTrigger>
            <TabsTrigger value="30days">30 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="px-2">
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : isLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" unit="%" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="Present" stackId="a" fill="#10b981" />
                <Bar yAxisId="left" dataKey="Late" stackId="a" fill="#f59e0b" />
                <Bar yAxisId="left" dataKey="Absent" stackId="a" fill="#ef4444" />
                <Bar yAxisId="right" dataKey="Attendance Rate" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
