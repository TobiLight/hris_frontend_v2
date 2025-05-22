import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const goals = [
  {
    id: 1,
    title: "Complete Customer Service Excellence Training",
    dueDate: "June 30, 2024",
    progress: 75,
    status: "In Progress",
  },
  {
    id: 2,
    title: "Achieve 95% Client Satisfaction Rating",
    dueDate: "December 31, 2024",
    progress: 90,
    status: "On Track",
  },
  {
    id: 3,
    title: "Reduce Booking Processing Time by 15%",
    dueDate: "September 30, 2024",
    progress: 60,
    status: "In Progress",
  },
  {
    id: 4,
    title: "Complete Advanced Travel Management Certification",
    dueDate: "August 15, 2024",
    progress: 30,
    status: "In Progress",
  },
]

export function PerformanceGoals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Goals</CardTitle>
        <CardDescription>Your current goals and objectives</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="space-y-2 rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <h4 className="font-medium">{goal.title}</h4>
                <Badge
                  variant="outline"
                  className={
                    goal.status === "Completed"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : goal.status === "On Track"
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  }
                >
                  {goal.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">Due: {goal.dueDate}</p>
              <div className="flex items-center gap-2">
                <Progress value={goal.progress} className="h-2" />
                <span className="text-sm text-gray-500">{goal.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
