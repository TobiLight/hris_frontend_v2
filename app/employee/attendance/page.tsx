import { AttendanceClockInOut } from "@/components/employee/attendance/clock-in-out"
import { AttendanceHistory } from "@/components/employee/attendance/history"
import { DashboardHeader } from "@/components/employee/dashboard-header"

export default function AttendancePage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="p-4 sm:p-6">
        <h1 className="mb-6 text-xl font-bold tracking-tight sm:text-2xl">Attendance</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <AttendanceClockInOut />
          <AttendanceHistory />
        </div>
      </div>
    </div>
  )
}
