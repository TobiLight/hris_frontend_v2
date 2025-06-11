import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {jwtDecode} from "jwt-decode";

function getTokenExpiry(token: string): number | null {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp as number * 1000; // convert to ms
  } catch (e) {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  const expiry = getTokenExpiry(token);
  if (!expiry) return true;
  return Date.now() >= expiry;
}

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has("access_token");
  const token = request.cookies.get("access_token");

  // Get the pathname of the request
  const pathname = request.nextUrl.pathname;

  // Define protected routes
  const isAdminRoute = pathname.startsWith("/admin");
  const isEmployeeRoute = pathname.startsWith("/employee");
  const isAuthRoute = pathname.startsWith("/auth");

  // If the user is not authenticated and trying to access a protected route
  if (!isAuthenticated && (isAdminRoute || isEmployeeRoute)) {
    const url = new URL("/auth/signin", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // If the user is authenticated and trying to access auth routes
  if (isAuthenticated && isAuthRoute) {
    // Redirect to dashboard (this is simplified - in a real app you'd check the user role)
    // Get user role from cookies to determine where to redirect
    const userRole =
      request.cookies.get("user_role")?.value ??
      JSON.stringify({ id: "", name: "employee" });
    console.log("user role", userRole);
    const userRoleJSON =
      JSON.parse(userRole) ??
      ({ id: "", name: "employee" } as { id: string; name: string });

    console.log("super_admin", userRoleJSON);

    const redirectPath =
      userRoleJSON.name.toLowerCase() === "super_admin" ||
      userRoleJSON.name.toLowerCase() === "manager" ||
      userRoleJSON.name.toLowerCase() === "hr"
        ? "/admin/dashboard"
        : "/employee/dashboard";

    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/employee/:path*", "/auth/:path*"],
};
