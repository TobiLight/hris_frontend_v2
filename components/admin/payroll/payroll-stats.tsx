import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CreditCard, Calendar, Users } from "lucide-react"

export function PayrollStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-teal-500 to-teal-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Payroll</CardTitle>
          <div className="rounded-full bg-teal-100 p-2 text-teal-600">
            <DollarSign className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">$427,800</div>
          <p className="text-xs text-muted-foreground">For 124 employees</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-sky-500 to-sky-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
          <div className="rounded-full bg-sky-100 p-2 text-sky-600">
            <CreditCard className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">$3,450</div>
          <p className="text-xs text-muted-foreground">Monthly average</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Next Payroll Date</CardTitle>
          <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
            <Calendar className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">May 30, 2024</div>
          <p className="text-xs text-muted-foreground">5 days remaining</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-purple-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Payroll Processed</CardTitle>
          <div className="rounded-full bg-purple-100 p-2 text-purple-600">
            <Users className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">124</div>
          <p className="text-xs text-muted-foreground">All employees processed</p>
        </CardContent>
      </Card>
    </div>
  )
}
