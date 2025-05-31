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
    | "intern"
    | "department_lead"
    | "hr" | "manager";
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
      requiredRole && user &&
      user.role.name === requiredRole
    ) {
      const redirectPath = user.role.name === "super_admin" || user.role.name === "hr" || user.role.name === "manager"
        ? "/admin/dashboard"
        : "/employee/dashboard";
        
      router.push(redirectPath);
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
