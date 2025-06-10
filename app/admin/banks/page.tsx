import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { BankList } from "@/components/admin/banks/bank-list";
import { AdminDashboardHeader } from "@/components/admin/dashboard-header";

export default function BanksPage() {
  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <Suspense fallback={<BankListSkeleton />}>
        <BankList />
      </Suspense>
    </div>
  );
}

function BankListSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}
