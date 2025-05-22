"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample performance data
const performanceData = [
  { month: "Jan", avgRating: 4.0, goalCompletion: 70, productivity: 88 },
  { month: "Feb", avgRating: 4.1, goalCompletion: 72, productivity: 89 },
  { month: "Mar", avgRating: 4.0, goalCompletion: 73, productivity: 87 },
  { month: "Apr", avgRating: 4.2, goalCompletion: 75, productivity: 90 },
  { month: "May", avgRating: 4.2, goalCompletion: 78, productivity: 92 },
  { month: "Jun", avgRating: 4.3, goalCompletion: 80, productivity: 93 },
  { month: "Jul", avgRating: 4.3, goalCompletion: 82, productivity: 94 },
  { month: "Aug", avgRating: 4.4, goalCompletion: 83, productivity: 94 },
  { month: "Sep", avgRating: 4.3, goalCompletion: 81, productivity: 93 },
  { month: "Oct", avgRating: 4.4, goalCompletion: 84, productivity: 95 },
  { month: "Nov", avgRating: 4.5, goalCompletion: 85, productivity: 96 },
  { month: "Dec", avgRating: 4.6, goalCompletion: 87, productivity: 97 },
]

export function PerformanceOverview() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="border-b bg-gray-50 p-4 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Performance metrics over time</CardDescription>
          </div>
          <Select defaultValue="year">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="half">Last 6 Months</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={performanceData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" domain={[0, 5]} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="avgRating"
                name="Avg. Rating"
                stroke="#0d9488"
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="goalCompletion"
                name="Goal Completion %"
                stroke="#0284c7"
              />
              <Line yAxisId="right" type="monotone" dataKey="productivity" name="Productivity %" stroke="#8b5cf6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
