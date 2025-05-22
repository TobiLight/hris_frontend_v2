"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

interface AttendanceRecord {
  id: number
  employee: {
    id: number
    name: string
  }
  date: string
  status: string
  clockIn: string
  clockOut: string
  location: string
  notes: string
}

export function AttendanceRecordEditForm({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [record, setRecord] = useState<AttendanceRecord | null>(null)

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll simulate loading the data
    const timeout = setTimeout(() => {
      setRecord({
        id: Number.parseInt(id),
        employee: {
          id: 101,
          name: "John Doe",
        },
        date: "2024-05-25",
        status: "Present",
        clockIn: "09:00",
        clockOut: "17:30",
        location: "Main Office",
        notes: "Regular working day",
      })
      setLoading(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // In a real app, this would be an API call
    // For now, we'll simulate submitting the data
    setTimeout(() => {
      setSubmitting(false)
      toast({
        title: "Record updated",
        description: "The attendance record has been updated successfully.",
      })
      router.push(`/admin/attendance/${id}`)
    }, 1000)
  }

  if (loading) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gray-50 p-4">
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!record) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gray-50 p-4">
          <CardTitle>Record Not Found</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p>The attendance record you are looking for does not exist.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gray-50 p-4">
          <CardTitle>Edit Attendance Record</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="employee">Employee</Label>
              <Input id="employee" value={record.employee.name} disabled />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={record.date}
                onChange={(e) => setRecord({ ...record, date: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={record.status} onValueChange={(value) => setRecord({ ...record, status: value })}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Late">Late</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="clockIn">Clock In</Label>
                <Input
                  id="clockIn"
                  type="time"
                  value={record.clockIn}
                  onChange={(e) => setRecord({ ...record, clockIn: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="clockOut">Clock Out</Label>
                <Input
                  id="clockOut"
                  type="time"
                  value={record.clockOut}
                  onChange={(e) => setRecord({ ...record, clockOut: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={record.location}
                onChange={(e) => setRecord({ ...record, location: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={record.notes}
                onChange={(e) => setRecord({ ...record, notes: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t bg-gray-50 p-4">
          <Button variant="outline" type="button" onClick={() => router.push(`/admin/attendance/${id}`)}>
            Cancel
          </Button>
          <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={submitting}>
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
