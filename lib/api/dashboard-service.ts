import { apiRequest } from "./api-client";
import { Employee } from "./employee-service";

// Types for dashboard data
export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  departmentsCount: number;
  pendingLeaveRequests: number;
  attendanceRate: number;
  newHires: number;
}

export interface RecentActivity {
  id: string;
  type: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  timestamp: string;
}

export interface PendingApproval {
  id: string;
  type: string;
  employee: {
    id: string;
    name: string;
    avatar: string;
    department: string;
  };
  status: string;
  requestDate: string;
  description: string;
}

export interface DepartmentDistribution {
  name: string;
  count: number;
  color: string;
}

export interface DashboardData {
  stats: DashboardStats
  recentActivities: RecentActivity[]
  pendingApprovals: PendingApproval[]
  departmentDistribution: DepartmentDistribution[]
}

export interface AttendanceSummary {
  date: string
  present: number
  absent: number
  late: number
  total: number
  presentPercentage: number
}

export interface UpcomingBirthday {
  id: string
  name: string
  avatar: string | null
  department: string
  birthDate: string
  daysUntil: number
}

// Dashboard data service
export async function fetchDashboardData() {
  try {
    // In a real app, these would be separate API calls
    // For now, we'll simulate the API responses
    const totalEmployees = (await apiRequest("/admin/users/all")) as Employee[];
    console.log("total_employees", totalEmployees);
    // Mock data - in a real app, this would come from the API
    const stats: DashboardStats = {
      totalEmployees: totalEmployees.length,
      activeEmployees: 34,
      departmentsCount: 8,
      pendingLeaveRequests: 0,
      attendanceRate: 94.7,
      newHires: 2,
    };

    // const recentActivities: RecentActivity[] = [
    //   {
    //     id: "1",
    //     type: "leave",
    //     user: {
    //       name: "John Doe",
    //       avatar: "/placeholder.svg",
    //     },
    //     action: "requested leave",
    //     target: "May 15-18, 2023",
    //     timestamp: "2 hours ago",
    //   },
    //   {
    //     id: "2",
    //     type: "attendance",
    //     user: {
    //       name: "Jane Smith",
    //       avatar: "/placeholder.svg",
    //     },
    //     action: "clocked in",
    //     target: "",
    //     timestamp: "3 hours ago",
    //   },
    //   {
    //     id: "3",
    //     type: "profile",
    //     user: {
    //       name: "Robert Johnson",
    //       avatar: "/placeholder.svg",
    //     },
    //     action: "updated profile",
    //     target: "contact information",
    //     timestamp: "5 hours ago",
    //   },
    //   {
    //     id: "4",
    //     type: "payroll",
    //     user: {
    //       name: "Lisa Anderson",
    //       avatar: "/placeholder.svg",
    //     },
    //     action: "approved payroll",
    //     target: "April 2023",
    //     timestamp: "1 day ago",
    //   },
    //   {
    //     id: "5",
    //     type: "department",
    //     user: {
    //       name: "Michael Wilson",
    //       avatar: "/placeholder.svg",
    //     },
    //     action: "created department",
    //     target: "Product Design",
    //     timestamp: "2 days ago",
    //   },
    // ]

    const recentActivities: RecentActivity[] = [];

    // const pendingApprovals: PendingApproval[] = [
    //   {
    //     id: "1",
    //     type: "leave",
    //     employee: {
    //       id: "101",
    //       name: "John Doe",
    //       avatar: "/placeholder.svg",
    //       department: "Engineering",
    //     },
    //     status: "pending",
    //     requestDate: "2023-05-10",
    //     description: "Annual leave request for 3 days",
    //   },
    //   {
    //     id: "2",
    //     type: "expense",
    //     employee: {
    //       id: "102",
    //       name: "Jane Smith",
    //       avatar: "/placeholder.svg",
    //       department: "Marketing",
    //     },
    //     status: "pending",
    //     requestDate: "2023-05-11",
    //     description: "Conference travel expenses",
    //   },
    //   {
    //     id: "3",
    //     type: "timesheet",
    //     employee: {
    //       id: "103",
    //       name: "Robert Johnson",
    //       avatar: "/placeholder.svg",
    //       department: "Finance",
    //     },
    //     status: "pending",
    //     requestDate: "2023-05-12",
    //     description: "Overtime hours approval",
    //   },
    //   {
    //     id: "4",
    //     type: "leave",
    //     employee: {
    //       id: "104",
    //       name: "Lisa Anderson",
    //       avatar: "/placeholder.svg",
    //       department: "Customer Support",
    //     },
    //     status: "pending",
    //     requestDate: "2023-05-09",
    //     description: "Sick leave request",
    //   },
    // ]

    const pendingApprovals: PendingApproval[] = [];

    const departmentDistribution: DepartmentDistribution[] = [
      { name: "Information Technology & MIS", count: 4, color: "#3b82f6" },
      { name: "Marketing", count: 3, color: "#10b981" },
      { name: "Account", count: 8, color: "#f59e0b" },
      { name: "Human Resources & Admin", count: 6, color: "#8b5cf6" },
      { name: "Corporate Sales", count: 2, color: "#ef4444" },
      { name: "Operations", count: 6, color: "#6366f1" },
      { name: "Retail", count: 5, color: "#ec4899" },
      { name: "Channel", count: 3, color: "#14b8a6" },
      { name: "Sourcing", count: 1, color: "#14b8a6" },
    ];

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      stats,
      recentActivities,
      pendingApprovals,
      departmentDistribution,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}

/**
 * Fetch attendance summary data from the API
 */
export async function fetchAttendanceSummary(days = 7): Promise<AttendanceSummary[]> {
  try {
    // Make API request to get attendance summary
    const data = await apiRequest<AttendanceSummary[]>(`/dashboard/attendance-summary?days=${days}`)
    return data
  } catch (error) {
    console.error("Error fetching attendance summary:", error)
    throw error
  }
}

/**
 * Fetch upcoming birthdays from the API
 */
export async function fetchUpcomingBirthdays(days = 30): Promise<UpcomingBirthday[]> {
  try {
    // Make API request to get upcoming birthdays
    const data = await apiRequest<UpcomingBirthday[]>(`/dashboard/upcoming-birthdays?days=${days}`)
    return data
  } catch (error) {
    console.error("Error fetching upcoming birthdays:", error)
    throw error
  }
}
