"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { attendanceService, type AttendanceRecord } from "@/lib/api/attendance-service"

export function AttendanceList() {
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true)
        const data = await attendanceService.fetchAllAttendance()
        setRecords(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch attendance records")
      } finally {
        setLoading(false)
      }
    }

    fetchAttendance()
  }, [])

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase()
  }

  const today = new Date().toISOString().split("T")[0]

  const todayRecords = records.filter((record) => record.clock_in_date === today)
  const presentToday = todayRecords.filter((record) => record.status === "ACCURATE" || record.status === "LATE")
  const lateArrivals = todayRecords.filter((record) => record.clock_in_status === "LATE")
  const onLeave = todayRecords.filter(
    (record) => record.status === "ABSENT", // Adjust based on your leave logic
  )

  const renderAttendanceTable = (data: AttendanceRecord[]) => {
    if (loading) {
      return (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      )
    }

    if (data.length === 0) {
      return <div className="text-center py-8 text-gray-500">No attendance records found for this category.</div>
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Clock In</TableHead>
            <TableHead>Clock Out</TableHead>
            <TableHead>Total Hours</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt={`${record.user?.first_name} ${record.user?.last_name}`} />
                    <AvatarFallback className="bg-teal-100 text-teal-800">
                      {getInitials(record.user?.first_name || "", record.user?.last_name || "")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {record.user?.first_name} {record.user?.last_name}
                    </div>
                    <div className="text-sm text-gray-500">{record.user?.department?.name || "No Department"}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{attendanceService.formatDate(record.clock_in_date)}</TableCell>
              <TableCell>
                <Badge variant="outline" className={attendanceService.getStatusColor(record.status)}>
                  {record.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div>{attendanceService.formatTime(record.clock_in_time)}</div>
                  <Badge
                    variant="outline"
                    className={attendanceService.getClockStatusColor(record.clock_in_status)}
                    size="sm"
                  >
                    {record.clock_in_status}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                {record.clock_out_time ? (
                  <div className="space-y-1">
                    <div>{attendanceService.formatTime(record.clock_out_time)}</div>
                    <Badge
                      variant="outline"
                      className={attendanceService.getClockStatusColor(record.clock_out_status)}
                      size="sm"
                    >
                      {record.clock_out_status}
                    </Badge>
                  </div>
                ) : (
                  <span className="text-gray-400">Not clocked out</span>
                )}
              </TableCell>
              <TableCell>{record.total_hours}h</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/attendance/${record.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/attendance/${record.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Record
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/employees/${record.user_id}/view`}>View Employee Profile</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <p className="text-red-600">Error loading attendance records: {error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Today's Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="present" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="present">Present Today ({presentToday.length})</TabsTrigger>
            <TabsTrigger value="late">Late Arrivals ({lateArrivals.length})</TabsTrigger>
            <TabsTrigger value="leave">On Leave ({onLeave.length})</TabsTrigger>
            <TabsTrigger value="all">All Records ({records.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="present" className="mt-4">
            {renderAttendanceTable(presentToday)}
          </TabsContent>

          <TabsContent value="late" className="mt-4">
            {renderAttendanceTable(lateArrivals)}
          </TabsContent>

          <TabsContent value="leave" className="mt-4">
            {renderAttendanceTable(onLeave)}
          </TabsContent>

          <TabsContent value="all" className="mt-4">
            {renderAttendanceTable(records)}
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-center">
          <Button asChild className="bg-teal-600 hover:bg-teal-700">
            <Link href="/admin/attendance/records">View All Attendance Records</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
