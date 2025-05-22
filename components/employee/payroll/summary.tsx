import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CreditCard, Calendar } from "lucide-react"

export function PayrollSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Current Salary</CardTitle>
          <DollarSign className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$3,450.00</div>
          <p className="text-xs text-muted-foreground">Monthly gross salary</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
          <CreditCard className="h-4 w-4 text-sky-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Direct Deposit</div>
          <p className="text-xs text-muted-foreground">Bank of America ****4567</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
          <Calendar className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">May 30, 2024</div>
          <p className="text-xs text-muted-foreground">10 days remaining</p>
        </CardContent>
      </Card>
    </div>
  )
}
