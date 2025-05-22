"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  login as loginApi,
  logout as logoutApi,
  getCurrentUser,
  isAuthenticated,
} from "@/lib/auth/auth-service";
import type { User } from "@/lib/auth/auth-service";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = () => {
      if (isAuthenticated()) {
        const currentUser = getCurrentUser();
        setUser(currentUser);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log("logging in...");
      const response = await loginApi(email, password);
      setUser(response.user);

      // // Redirect based on user role
      // for (let role of response.user.roles) {
      //   console.log("bhbdshjbdshj");
      //   if (
      //     role.name === "super_admin" ||
      //     role.name === "department_admin" ||
      //     role.name === "admin"
      //   ) {
      //     router.push("/admin/dashboard");
      //   } else {
      //     router.push("/employee/dashboard");
      //   }
      // }
      // if (response.user.roles === "admin") {
      // } else {
      //   router.push("/employee/dashboard");
      // }

      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutApi();
    setUser(null);
    router.push("/auth/signin");
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
