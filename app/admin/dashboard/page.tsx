"use client";

import { useState, useEffect } from "react";
import { AdminDashboardHeader } from "@/components/admin/dashboard-header";
import { AdminStatsOverview } from "@/components/admin/dashboard/stats-overview";
import { AdminRecentActivities } from "@/components/admin/dashboard/recent-activities";
import { PendingApprovals } from "@/components/admin/dashboard/pending-approvals";
import { EmployeeDistribution } from "@/components/admin/dashboard/employee-distribution";
import { AttendanceSummary } from "@/components/admin/dashboard/attendance-summary";
import { UpcomingBirthdays } from "@/components/admin/dashboard/upcoming-birthdays";
import {
  fetchDashboardData,
  fetchAttendanceSummary,
  fetchUpcomingBirthdays,
  type DashboardData,
  type AttendanceSummary as AttendanceSummaryType,
  type UpcomingBirthday,
} from "@/lib/api/dashboard-service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [attendanceData, setAttendanceData] = useState<AttendanceSummaryType[]>(
    []
  );
  const [birthdaysData, setBirthdaysData] = useState<UpcomingBirthday[]>([]);
  const [loading, setLoading] = useState({
    dashboard: true,
    attendance: true,
    birthdays: true,
  });
  const [error, setError] = useState({
    dashboard: null as string | null,
    attendance: null as string | null,
    birthdays: null as string | null,
  });

  const loadDashboardData = async () => {
    try {
      setLoading((prev) => ({ ...prev, dashboard: true }));
      setError((prev) => ({ ...prev, dashboard: null }));
      const data = await fetchDashboardData();
      setDashboardData(data);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError((prev) => ({
        ...prev,
        dashboard: "Failed to load dashboard data. Please try again.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, dashboard: false }));
    }
  };

  const loadAttendanceData = async () => {
    try {
      setLoading((prev) => ({ ...prev, attendance: true }));
      setError((prev) => ({ ...prev, attendance: null }));
      const data = await fetchAttendanceSummary(7);
      setAttendanceData(data);
    } catch (err) {
      console.error("Failed to fetch attendance data:", err);
      setError((prev) => ({
        ...prev,
        attendance: "Failed to load attendance data. Please try again.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, attendance: false }));
    }
  };

  const loadBirthdaysData = async () => {
    try {
      setLoading((prev) => ({ ...prev, birthdays: true }));
      setError((prev) => ({ ...prev, birthdays: null }));
      const data = await fetchUpcomingBirthdays(30);
      setBirthdaysData(data);
    } catch (err) {
      console.error("Failed to fetch birthdays data:", err);
      setError((prev) => ({
        ...prev,
        birthdays: "Failed to load upcoming birthdays. Please try again.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, birthdays: false }));
    }
  };

  useEffect(() => {
    loadDashboardData();
    loadAttendanceData();
    loadBirthdaysData();
  }, []);

  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-500">Welcome to your admin dashboard</p>
        </div>

        {error.dashboard && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex justify-between items-center">
              {error.dashboard}
              <Button
                variant="outline"
                size="sm"
                onClick={loadDashboardData}
                className="ml-2"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6">
          {loading.dashboard ? (
            <>
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </>
          ) : (
            dashboardData && <AdminStatsOverview stats={dashboardData.stats} />
          )}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-1 lg:grid-cols-8">
          <div className="md:col-span-1 lg:col-span-4">
            <AttendanceSummary
              data={attendanceData}
              isLoading={loading.attendance}
              error={error.attendance}
            />
          </div>
          <div className="md:col-span-1 lg:col-span-4">
            {loading.dashboard ? (
              <Skeleton className="h-[400px] w-full" />
            ) : (
              dashboardData && (
                <PendingApprovals approvals={dashboardData.pendingApprovals} />
              )
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-8">
          <div className="md:col-span-1 lg:col-span-4">
            {loading.dashboard ? (
              <Skeleton className="h-[400px] w-full" />
            ) : (
              dashboardData && (
                <AdminRecentActivities
                  activities={dashboardData.recentActivities}
                />
              )
            )}
          </div>
          <div className="md:col-span-1 lg:col-span-4">
            <UpcomingBirthdays
              birthdays={birthdaysData}
              isLoading={loading.birthdays}
              error={error.birthdays}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <div className="md:col-span-1 lg:col-span-6">
            {loading.dashboard ? (
              <Skeleton className="h-[400px] w-full" />
            ) : (
              dashboardData && (
                <EmployeeDistribution
                  distribution={dashboardData.departmentDistribution}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
