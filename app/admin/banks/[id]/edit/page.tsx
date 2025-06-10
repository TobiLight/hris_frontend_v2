import { Suspense } from "react"
import { AdminDashboardHeader } from "@/components/admin/dashboard-header"
import { Skeleton } from "@/components/ui/skeleton"
import {  ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BankForm } from "@/components/admin/banks/bank-form"
import Link from "next/link"

export default function EditBankPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-5 p-8">
      <AdminDashboardHeader />
      <Suspense fallback={<BankFormSkeleton />}>
      <div className="p-4 sm:p-6">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-1">
              <Link
                href={`/admin/banks/`}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to banks
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Edit Bank
            </h1>
            <p className="text-gray-500">Update bank information</p>
          </div>

        <BankForm bankId={params.id} />
        </div>
      </Suspense>
    </div>
  )
}

function BankFormSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-1/4" />
    </div>
  )
}
