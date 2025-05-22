"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"

export function LeaveCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Sample leave data for the calendar
  const leaveData = [
    { date: new Date(2024, 4, 28), count: 2, type: "Sick" },
    { date: new Date(2024, 4, 29), count: 2, type: "Sick" },
    { date: new Date(2024, 4, 30), count: 1, type: "Bereavement" },
    { date: new Date(2024, 5, 1), count: 1, type: "Bereavement" },
    { date: new Date(2024, 5, 2), count: 1, type: "Bereavement" },
    { date: new Date(2024, 5, 5), count: 1, type: "Personal" },
    { date: new Date(2024, 5, 10), count: 1, type: "Annual" },
    { date: new Date(2024, 5, 11), count: 1, type: "Annual" },
    { date: new Date(2024, 5, 12), count: 1, type: "Annual" },
    { date: new Date(2024, 5, 13), count: 1, type: "Annual" },
    { date: new Date(2024, 5, 14), count: 1, type: "Annual" },
    { date: new Date(2024, 5, 15), count: 1, type: "Annual" },
    { date: new Date(2024, 6, 1), count: 1, type: "Annual" },
    { date: new Date(2024, 6, 2), count: 1, type: "Annual" },
    { date: new Date(2024, 6, 3), count: 1, type: "Annual" },
    { date: new Date(2024, 6, 4), count: 1, type: "Annual" },
    { date: new Date(2024, 6, 5), count: 1, type: "Annual" },
  ]

  // Function to get leave data for a specific date
  const getLeaveForDate = (date: Date) => {
    return leaveData.find(
      (leave) =>
        leave.date.getDate() === date.getDate() &&
        leave.date.getMonth() === date.getMonth() &&
        leave.date.getFullYear() === date.getFullYear(),
    )
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="border-b bg-gray-50 p-4 pb-3">
        <CardTitle>Leave Calendar</CardTitle>
        <CardDescription>View scheduled leaves for employees</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          components={{
            DayContent: (props) => {
              const leave = getLeaveForDate(props.date)
              return (
                <div className="relative h-9 w-9 p-0 font-normal aria-selected:opacity-100">
                  <div className="flex h-full w-full items-center justify-center">{props.date.getDate()}</div>
                  {leave && (
                    <div className="absolute -bottom-1 left-0 right-0 flex justify-center">
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${
                          leave.type === "Annual"
                            ? "bg-teal-500"
                            : leave.type === "Sick"
                              ? "bg-red-500"
                              : leave.type === "Personal"
                                ? "bg-blue-500"
                                : "bg-amber-500"
                        }`}
                      />
                    </div>
                  )}
                </div>
              )
            },
          }}
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-teal-100 text-teal-800">
            Annual Leave
          </Badge>
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Sick Leave
          </Badge>
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Personal Leave
          </Badge>
          <Badge variant="outline" className="bg-amber-100 text-amber-800">
            Other Leave
          </Badge>
        </div>

        {date && getLeaveForDate(date) && (
          <div className="mt-4 rounded-md border p-3">
            <h4 className="font-medium">Leave Details for {date.toLocaleDateString()}</h4>
            <p className="text-sm text-gray-500">
              {getLeaveForDate(date)?.count} employee(s) on {getLeaveForDate(date)?.type} leave
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
