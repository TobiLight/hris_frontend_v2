"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?:
    | "super_admin"
    | "employee"
    | "admin"
    | "department_admin"
    | "hr_admin";
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true on client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only run this effect on the client side
    if (!mounted) return;

    // Skip if still loading
    if (loading) return;

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    // If role is required and user doesn't have it, redirect to appropriate dashboard
    if (
      requiredRole &&
      user?.roles &&
      user.roles.some(
        (role) =>
          // ["super_admin", "department_admin", "admin"].includes(role.name)
          role.name !== requiredRole
      )
    ) {
      const redirectPath = user.roles.some(
        (role) =>
          // ["super_admin", "department_admin", "admin"].includes(role.name)
          role.name === "super_admin" ||
          role.name === "department_admin" ||
          role.name === "admin"
      )
        ? "/admin/dashboard"
        : "/employee/dashboard";
      router.push("/admin/dashboard");
    }
  }, [
    isAuthenticated,
    loading,
    mounted,
    pathname,
    requiredRole,
    router,
    user?.roles,
  ]);

  // Don't render anything on the server side or while not mounted
  if (!mounted) {
    return null;
  }

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-teal-600"></div>
      </div>
    );
  }

  // If not authenticated or wrong role, don't render children
  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return null;
  }

  // Otherwise, render children
  return <>{children}</>;
}
