"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Download, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

// Mock activity data
const activityData = [
  {
    id: 1,
    action: "Login",
    ip: "192.168.1.1",
    location: "New York, USA",
    device: "Chrome on Windows",
    timestamp: new Date(2023, 4, 15, 9, 30),
    status: "success",
  },
  {
    id: 2,
    action: "Password Change",
    ip: "192.168.1.1",
    location: "New York, USA",
    device: "Chrome on Windows",
    timestamp: new Date(2023, 4, 14, 14, 45),
    status: "success",
  },
  {
    id: 3,
    action: "Profile Update",
    ip: "192.168.1.1",
    location: "New York, USA",
    device: "Chrome on Windows",
    timestamp: new Date(2023, 4, 12, 11, 20),
    status: "success",
  },
  {
    id: 4,
    action: "Login Attempt",
    ip: "203.0.113.1",
    location: "Unknown",
    device: "Unknown Device",
    timestamp: new Date(2023, 4, 10, 3, 15),
    status: "failed",
  },
  {
    id: 5,
    action: "Login",
    ip: "192.168.1.1",
    location: "New York, USA",
    device: "Safari on macOS",
    timestamp: new Date(2023, 4, 9, 8, 0),
    status: "success",
  },
  {
    id: 6,
    action: "Settings Change",
    ip: "192.168.1.1",
    location: "New York, USA",
    device: "Safari on macOS",
    timestamp: new Date(2023, 4, 9, 8, 15),
    status: "success",
  },
  {
    id: 7,
    action: "Login",
    ip: "192.168.1.1",
    location: "New York, USA",
    device: "Mobile App on iOS",
    timestamp: new Date(2023, 4, 5, 12, 30),
    status: "success",
  },
]

export default function ActivityLog() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter activities based on search query and filters
  const filteredActivities = activityData.filter((activity) => {
    // Search filter
    const matchesSearch =
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.device.toLowerCase().includes(searchQuery.toLowerCase())

    // Action filter
    const matchesAction = actionFilter === "all" || activity.action.toLowerCase().includes(actionFilter.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "all" || activity.status === statusFilter

    // Date filter
    const matchesDate = !date || format(activity.timestamp, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")

    return matchesSearch && matchesAction && matchesStatus && matchesDate
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
        <CardDescription>View your account activity and security events.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="password">Password</SelectItem>
                <SelectItem value="profile">Profile</SelectItem>
                <SelectItem value="settings">Settings</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full sm:w-[180px] justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>

            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead className="hidden md:table-cell">Device</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.action}</TableCell>
                    <TableCell>{activity.ip}</TableCell>
                    <TableCell className="hidden md:table-cell">{activity.location}</TableCell>
                    <TableCell className="hidden md:table-cell">{activity.device}</TableCell>
                    <TableCell>{format(activity.timestamp, "MMM d, yyyy h:mm a")}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          activity.status === "success"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
                        )}
                      >
                        {activity.status === "success" ? "Success" : "Failed"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No activities found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
