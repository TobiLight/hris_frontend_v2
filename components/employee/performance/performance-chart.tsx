"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const performanceData = [
  { month: "Jan", rating: 4.2, teamAvg: 4.0 },
  { month: "Feb", rating: 4.3, teamAvg: 4.1 },
  { month: "Mar", rating: 4.5, teamAvg: 4.0 },
  { month: "Apr", rating: 4.8, teamAvg: 4.2 },
  { month: "May", rating: 4.7, teamAvg: 4.3 },
  { month: "Jun", rating: 4.9, teamAvg: 4.3 },
  { month: "Jul", rating: 4.8, teamAvg: 4.4 },
  { month: "Aug", rating: 4.7, teamAvg: 4.3 },
  { month: "Sep", rating: 4.8, teamAvg: 4.4 },
  { month: "Oct", rating: 4.9, teamAvg: 4.5 },
  { month: "Nov", rating: 4.9, teamAvg: 4.5 },
  { month: "Dec", rating: 5.0, teamAvg: 4.6 },
]

export function PerformanceChart() {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="border-b bg-gray-50 p-4 pb-3">
        <CardTitle>Performance Trend</CardTitle>
        <CardDescription>Your performance ratings over time</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="h-60 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={performanceData}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} tickMargin={8} />
              <YAxis domain={[3.5, 5]} tick={{ fontSize: 12 }} tickMargin={8} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: 10,
                  fontSize: "0.75rem",
                }}
              />
              <Line
                type="monotone"
                dataKey="rating"
                name="Your Rating"
                stroke="#0d9488"
                strokeWidth={3}
                dot={{ r: 3, strokeWidth: 2 }}
                activeDot={{ r: 5, strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="teamAvg"
                name="Team Average"
                stroke="#0284c7"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
