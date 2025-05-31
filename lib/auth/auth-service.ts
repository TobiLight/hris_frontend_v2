import { setAccessToken, setCsrfToken, setUser } from "./storage";

// Types for authentication
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  image_uri: string | null
  role: {id: string, name: string};
}

export interface LoginResponse {
  access_token: string;
  csrf_token: string;
  user: User;
}

// Base API URL
const API_URL = "http://127.0.0.1:8000/api";

/**
 * Login function that sends credentials to the API
 */
export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `Login failed with status: ${response.status}`
      );
    }

    const data = (await response.json()) as {
      access_token: string;
      csrf_token: string;
      user: User;
    };

    // Only run this code on the client side
    if (typeof window !== "undefined") {
      // Store auth data in cookies
      document.cookie = `access_token=${data.access_token}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `csrf_token=${data.csrf_token}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `user_role=${JSON.stringify(data.user.role)}; path=/; max-age=86400; SameSite=Lax`;

      // Also store in localStorage as a backup
      setAccessToken(data.access_token);
      setCsrfToken(data.csrf_token);
      setUser(data.user);
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

/**
 * Logout function that clears auth data
 */
export async function logout(): Promise<void> {
  try {
    // Call logout endpoint if available
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).catch(() => {
      // Ignore errors from logout endpoint
    });
  } finally {
    // Only run this code on the client side
    if (typeof window !== "undefined") {
      // Clear cookies
      document.cookie =
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "csrf_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      // Clear localStorage
      localStorage.removeItem("user");
    }
  }
}

/**
 * Get the current user from localStorage
 */
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  const userJson = localStorage.getItem("user");
  if (userJson) {
    try {
      return JSON.parse(userJson);
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
  }
  return null;
}

/**
 * Check if the user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;

  // Check for access_token cookie
  return document.cookie.includes("access_token=");
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;

  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

/**
 * Get the CSRF token
 */
export function getCsrfToken(): string | null {
  return getCookie("csrf_token");
}

/**
 * Make an authenticated API request
 */
export async function apiRequest(
  endpoint: string,
  method = "GET",
  data?: any
): Promise<any> {
  const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;
  const csrfToken = getCsrfToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (csrfToken) {
    headers["X-CSRF-TOKEN"] = csrfToken;
  }

  const options: RequestInit = {
    method,
    headers,
    credentials: "include",
  };

  if (data && method !== "GET") {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `API request failed with status: ${response.status}`
    );
  }

  return response.json();
}
