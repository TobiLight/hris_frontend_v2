import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PerformanceOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>Your current performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500">Overall Rating</h4>
            <div className="flex items-center">
              <div className="mr-2 text-3xl font-bold">4.8</div>
              <div className="text-sm text-gray-500">/ 5.0</div>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 rounded-full bg-teal-600" style={{ width: "96%" }}></div>
            </div>
            <div className="text-xs text-gray-500">Excellent</div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500">Productivity</h4>
            <div className="flex items-center">
              <div className="mr-2 text-3xl font-bold">92</div>
              <div className="text-sm text-gray-500">%</div>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 rounded-full bg-sky-600" style={{ width: "92%" }}></div>
            </div>
            <div className="text-xs text-gray-500">Above Target</div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500">Quality</h4>
            <div className="flex items-center">
              <div className="mr-2 text-3xl font-bold">95</div>
              <div className="text-sm text-gray-500">%</div>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 rounded-full bg-emerald-600" style={{ width: "95%" }}></div>
            </div>
            <div className="text-xs text-gray-500">Excellent</div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500">Attendance</h4>
            <div className="flex items-center">
              <div className="mr-2 text-3xl font-bold">98</div>
              <div className="text-sm text-gray-500">%</div>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 rounded-full bg-amber-600" style={{ width: "98%" }}></div>
            </div>
            <div className="text-xs text-gray-500">Excellent</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
