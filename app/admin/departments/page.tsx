"use client";

import { useState, useEffect } from "react";
import { AdminDashboardHeader } from "@/components/admin/dashboard-header";
import { DepartmentStats } from "@/components/admin/departments/department-stats";
import { DepartmentList } from "@/components/admin/departments/department-list";
import { DepartmentStructure } from "@/components/admin/departments/department-structure";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import {
  fetchDepartments,
  type Department,
} from "@/lib/api/department-service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchDepartments();
      setDepartments(data);
    } catch (err) {
      console.error("Failed to fetch departments:", err);
      setError("Failed to load departments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Departments
            </h1>
            <p className="text-gray-500">
              Manage your organization's departments
            </p>
          </div>
          <Button
            className="mt-4 bg-teal-600 hover:bg-teal-700 sm:mt-0"
            asChild
          >
            <Link href="/admin/departments-add">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Department
            </Link>
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex justify-between items-center">
              {error}
              <Button
                variant="outline"
                size="sm"
                onClick={loadDepartments}
                className="ml-2"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6">
          {loading ? (
            <>
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[400px] w-full" />
            </>
          ) : (
            <>
              <DepartmentStats
                total={departments.length}
                totalEmployees={departments.reduce(
                  (a, b) => a + b.team_members.length,
                  0
                )}
                allocation={0}
              />
              <DepartmentList departments={departments} />
              <DepartmentStructure departments={departments} isLoading={loading} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
