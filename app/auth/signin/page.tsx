import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { SignInForm } from "@/components/auth/sign-in-form"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-teal-50 to-sky-50">
      <header className="flex h-16 items-center border-b bg-white px-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Image src="/placeholder.svg?height=32&width=32" width={32} height={32} alt="BTMS Logo" className="rounded" />
          <span className="text-lg font-semibold text-teal-700">Business Travel Management</span>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center p-4 md:p-8">
        <div className="grid w-full max-w-6xl gap-8 rounded-xl bg-white p-4 shadow-lg md:grid-cols-2 md:p-8">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Welcome back</h1>
              <p className="text-gray-500">Sign in to access your HR Management System dashboard</p>
            </div>
            <Suspense fallback={<div className="p-4 text-center">Loading sign-in form...</div>}>
              <SignInForm />
            </Suspense>
            <div className="text-center text-sm text-gray-500">
              Need help?{" "}
              <Link href="/contact" className="font-medium text-teal-600 hover:text-teal-500">
                Contact support
              </Link>
            </div>
          </div>
          <div className="hidden rounded-lg bg-gradient-to-br from-teal-600 to-sky-600 p-8 text-white md:flex md:flex-col md:justify-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">HR Management System</h2>
              <p className="text-teal-50">
                Streamline your HR processes with our comprehensive management system designed for Business Travel
                Management Limited.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-200"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Employee management</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-200"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Payroll processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-200"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Leave management</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-200"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Performance tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-white py-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Business Travel Management Limited. All rights reserved.</p>
      </footer>
    </div>
  )
}
