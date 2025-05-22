import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Calendar, DollarSign, Award } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-teal-400 to-teal-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Hours This Week</CardTitle>
          <div className="rounded-full bg-teal-100 p-2 text-teal-600">
            <Clock className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">32.5 / 40</div>
          <p className="text-xs text-muted-foreground">7.5 hours remaining</p>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-600"
              style={{ width: "81.25%" }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-sky-400 to-sky-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
          <div className="rounded-full bg-sky-100 p-2 text-sky-600">
            <Calendar className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">15 days</div>
          <p className="text-xs text-muted-foreground">3 days used this year</p>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
            <div className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-sky-600" style={{ width: "83.3%" }}></div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Next Payroll</CardTitle>
          <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
            <DollarSign className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">May 30, 2024</div>
          <p className="text-xs text-muted-foreground">Estimated: $3,450.00</p>
          <div className="mt-2 flex items-center">
            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
            <div className="ml-2 text-xs text-emerald-600">On schedule</div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-amber-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Performance</CardTitle>
          <div className="rounded-full bg-amber-100 p-2 text-amber-600">
            <Award className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">Excellent</div>
          <p className="text-xs text-muted-foreground">Last review: April 15, 2024</p>
          <div className="mt-2 flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3 w-3 text-amber-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <div className="ml-2 text-xs text-amber-600">5.0/5.0</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
