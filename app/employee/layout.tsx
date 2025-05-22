import type React from "react"
import { EmployeeSidebar } from "@/components/employee/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider } from "@/components/ui/sidebar"
import "@/app/globals.css"

export const metadata = {
  title: "HRMS - Employee Dashboard",
  description: "HR Management System for Business Travel Management Limited",
}

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
          <SidebarProvider defaultOpen={true}>
            <div className="flex min-h-screen bg-gray-50">
              <EmployeeSidebar />
              <div className="flex-1">
                <main>{children}</main>
              </div>
            </div>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
