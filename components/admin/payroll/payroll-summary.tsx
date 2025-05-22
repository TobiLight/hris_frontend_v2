"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const payrollDistribution = [
  { name: "Base Salary", value: 350000, color: "#0d9488" },
  { name: "Bonuses", value: 45000, color: "#0284c7" },
  { name: "Overtime", value: 22800, color: "#f59e0b" },
  { name: "Benefits", value: 10000, color: "#8b5cf6" },
]

export function PayrollSummary() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="border-b bg-gray-50 p-4 pb-3">
        <CardTitle>Payroll Distribution</CardTitle>
        <CardDescription>Breakdown of monthly payroll expenses</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={payrollDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {payrollDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`$${Number(value).toLocaleString()}`, "Amount"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>Total Payroll: $427,800</p>
          <p>Average Salary: $3,450</p>
          <p>Next Payroll: May 30, 2024</p>
        </div>
      </CardContent>
    </Card>
  )
}
