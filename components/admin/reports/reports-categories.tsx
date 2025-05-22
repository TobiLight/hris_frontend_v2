import { Card, CardContent } from "@/components/ui/card"
import { Users, Clock, Calendar, DollarSign, Award, Building } from "lucide-react"

export function ReportsCategories() {
  return (
    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
      <Card className="border-none shadow-md transition-all duration-200 hover:shadow-lg hover:bg-gray-50 cursor-pointer">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-teal-100 p-3 mb-3">
            <Users className="h-6 w-6 text-teal-600" />
          </div>
          <h3 className="font-medium">Employees</h3>
          <p className="text-xs text-gray-500 mt-1">12 reports</p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md transition-all duration-200 hover:shadow-lg hover:bg-gray-50 cursor-pointer">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-sky-100 p-3 mb-3">
            <Clock className="h-6 w-6 text-sky-600" />
          </div>
          <h3 className="font-medium">Attendance</h3>
          <p className="text-xs text-gray-500 mt-1">8 reports</p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md transition-all duration-200 hover:shadow-lg hover:bg-gray-50 cursor-pointer">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-emerald-100 p-3 mb-3">
            <Calendar className="h-6 w-6 text-emerald-600" />
          </div>
          <h3 className="font-medium">Leave</h3>
          <p className="text-xs text-gray-500 mt-1">6 reports</p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md transition-all duration-200 hover:shadow-lg hover:bg-gray-50 cursor-pointer">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-amber-100 p-3 mb-3">
            <DollarSign className="h-6 w-6 text-amber-600" />
          </div>
          <h3 className="font-medium">Payroll</h3>
          <p className="text-xs text-gray-500 mt-1">10 reports</p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md transition-all duration-200 hover:shadow-lg hover:bg-gray-50 cursor-pointer">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-purple-100 p-3 mb-3">
            <Award className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-medium">Performance</h3>
          <p className="text-xs text-gray-500 mt-1">7 reports</p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md transition-all duration-200 hover:shadow-lg hover:bg-gray-50 cursor-pointer">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-blue-100 p-3 mb-3">
            <Building className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-medium">Departments</h3>
          <p className="text-xs text-gray-500 mt-1">5 reports</p>
        </CardContent>
      </Card>
    </div>
  )
}
