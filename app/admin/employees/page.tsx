"use client";

import { useState, useEffect } from "react";
import { EmployeeList } from "@/components/admin/employees/employee-list";
import { EmployeeFilters } from "@/components/admin/employees/employee-filters";
import { EmployeeProvider } from "@/components/admin/employees/employee-context";
import { Button } from "@/components/ui/button";
import { UserPlus, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteEmployee, Employee, fetchEmployees } from "@/lib/api/employee-service";
import { AdminDashboardHeader } from "@/components/admin/dashboard-header";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function EmployeesPage() {
  const router = useRouter()
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    department: "all",
    status: "all",
    search: "",
  });

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchEmployees(filters);
      // Ensure data is an array before setting state
      if (Array.isArray(data)) {
        setEmployees(data);
        console.log("Employees state set with data length:", data.length);
      } else {
        console.error("API did not return an array:", data);
        setError("Invalid data format received from server");
        setEmployees([]);
      }
    } catch (err) {
      console.error("Failed to fetch employees:", err);
      setError("Failed to load employees. Please try again.");
    } finally {
      setLoading(false);
    }
  };

   const handleDeleteEmployee = (employee: Employee) => {
      async function deleteUser() {
        try {
          let user = await deleteEmployee(employee.id as string);
          if (user) {
            toast({
              title: "Employee deleted",
              description: `${employee.first_name} ${employee.last_name}'s data has been deleted successfully`,
            });
            router.refresh();
            return;
          }
          toast({
            title: "Can't perform action",
            description: `User has been deleted or does not exist`,
            variant: "destructive",
          });
        } catch (error) {
          console.error("Error updating employee:", error);
          toast({
            title: "Error updating Employee data",
            description:
              error instanceof Error
                ? error.message
                : "An unknown error occurred. Please try again.",
            variant: "destructive",
          });
        } finally {
            router.refresh();
          router.push("/admin/employees");
          // window.location.replace("/admin/employees")
        }
      }
      deleteUser();
    };
  

  useEffect(() => {
    loadEmployees();
  }, [filters]);


  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Employees
            </h1>
            <p className="text-gray-500">
              Manage your organization's employees
            </p>
          </div>
          <Button asChild className="mt-4 sm:mt-0">
            <Link href="/admin/employees-add">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
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
                onClick={loadEmployees}
                className="ml-2"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <EmployeeProvider>
          <EmployeeFilters
            onFilterChange={(newFilters) =>
              setFilters({ ...filters, ...newFilters })
            }
            currentFilters={filters}
          />

          <div className="mt-6">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : (
              <EmployeeList employees={employees} handleDeleteEmployee={handleDeleteEmployee} />
            )}
          </div>
        </EmployeeProvider>
      </div>
    </div>
  );
}
