import { apiRequest } from "./api-client"

export interface AttendanceRecord {
  id: string
  created_at: string
  updated_at: string
  status: "ACCURATE" | "LATE" | "EARLY" | "ABSENT"
  clock_in_date: string
  clock_in_time: string
  clock_out_time: string | null
  clock_in_status: "EARLY" | "ON_TIME" | "LATE"
  clock_out_status: "EARLY" | "ON_TIME" | "LATE"
  total_hours: number
  user_id: string
  user?: {
    id: string
    first_name: string
    last_name: string
    email: string
    department?: {
      name: string
    }
  }
}

export interface AttendanceStats {
  totalEmployees: number
  presentToday: number
  onLeave: number
  lateArrivals: number
  absent: number
}

/**
 * Service for managing attendance records
 */
class AttendanceService {
  /**
   * Fetch all attendance records
   */
  async fetchAllAttendance(): Promise<AttendanceRecord[]> {
    try {
      return await apiRequest<AttendanceRecord[]>("/api/attendance/all")
    } catch (error) {
      console.error("Error fetching attendance records:", error)
      throw error
    }
  }

  /**
   * Get attendance statistics
   */
  async getAttendanceStats(): Promise<AttendanceStats> {
    try {
      const records = await this.fetchAllAttendance()
      const today = new Date().toISOString().split("T")[0]

      const todayRecords = records.filter((record) => record.clock_in_date === today)

      const presentToday = todayRecords.filter(
        (record) => record.status === "ACCURATE" || record.status === "LATE",
      ).length

      const lateArrivals = todayRecords.filter((record) => record.clock_in_status === "LATE").length

      const onLeave = todayRecords.filter(
        (record) => record.status === "ABSENT", // This might need adjustment based on your leave logic
      ).length

      const totalEmployees = 100 // This should come from employee count API
      const absent = totalEmployees - presentToday - onLeave

      return {
        totalEmployees,
        presentToday,
        onLeave,
        lateArrivals,
        absent,
      }
    } catch (error) {
      console.error("Error calculating attendance stats:", error)
      throw error
    }
  }

  /**
   * Get attendance record by ID
   */
  async getAttendanceById(id: string): Promise<AttendanceRecord> {
    try {
      return await apiRequest<AttendanceRecord>(`/api/attendance/${id}`)
    } catch (error) {
      console.error(`Error fetching attendance record with ID ${id}:`, error)
      throw error
    }
  }

  /**
   * Format time string to readable format
   */
  formatTime(timeString: string): string {
    try {
      const date = new Date(timeString)
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    } catch (error) {
      return "N/A"
    }
  }

  /**
   * Format date string to readable format
   */
  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch (error) {
      return "N/A"
    }
  }

  /**
   * Get CSS class for attendance status
   */
  getStatusColor(status: string): string {
    switch (status) {
      case "ACCURATE":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "LATE":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "EARLY":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "ABSENT":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  /**
   * Get CSS class for clock in/out status
   */
  getClockStatusColor(status: string): string {
    switch (status) {
      case "ON_TIME":
        return "bg-green-100 text-green-800"
      case "LATE":
        return "bg-red-100 text-red-800"
      case "EARLY":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
}

export const attendanceService = new AttendanceService()
