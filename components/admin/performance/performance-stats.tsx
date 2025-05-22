import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Target, TrendingUp, Users } from "lucide-react"

export function PerformanceStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-teal-500 to-teal-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <div className="rounded-full bg-teal-100 p-2 text-teal-600">
            <Award className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">4.2/5.0</div>
          <p className="text-xs text-muted-foreground">+0.3 from last quarter</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-sky-500 to-sky-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Goal Completion</CardTitle>
          <div className="rounded-full bg-sky-100 p-2 text-sky-600">
            <Target className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">78%</div>
          <p className="text-xs text-muted-foreground">+5% from last quarter</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Productivity</CardTitle>
          <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
            <TrendingUp className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">92%</div>
          <p className="text-xs text-muted-foreground">+3% from last quarter</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-purple-600"></div>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Reviews</CardTitle>
          <div className="rounded-full bg-purple-100 p-2 text-purple-600">
            <Users className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">15</div>
          <p className="text-xs text-muted-foreground">Next 30 days</p>
        </CardContent>
      </Card>
    </div>
  )
}
