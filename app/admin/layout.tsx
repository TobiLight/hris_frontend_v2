import type React from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import "@/app/globals.css";

export const metadata = {
  title: "HRMS - Admin Dashboard",
  description:
    "HR Management System for Business Travel Management Limited - Admin Portal",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en">
    // <body>
    <>
      <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1">
              <main>{children}</main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </ThemeProvider>
    </>
    // </body>
    // </html>
  );
}
