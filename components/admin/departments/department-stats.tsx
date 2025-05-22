import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BriefcaseBusiness, Building, DollarSign } from "lucide-react"

export function DepartmentStats({total, totalEmployees, locations = 2}: {total: number, totalEmployees: number, locations?: number, allocation?: number}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-teal-500 to-teal-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
          <div className="rounded-full bg-teal-100 p-2 text-teal-600">
            <BriefcaseBusiness className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">{total}</div>
          <p className="text-xs text-muted-foreground">None this quarter</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-sky-500 to-sky-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          <div className="rounded-full bg-sky-100 p-2 text-sky-600">
            <Users className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">{totalEmployees}</div>
          <p className="text-xs text-muted-foreground">Across all departments</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Locations</CardTitle>
          <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
            <Building className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">{locations}</div>
          <p className="text-xs text-muted-foreground">Active office locations</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-purple-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          <div className="rounded-full bg-purple-100 p-2 text-purple-600">
            <DollarSign className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">N4.7M</div>
          <p className="text-xs text-muted-foreground">Annual allocation</p>
        </CardContent>
      </Card>
    </div>
  )
}
