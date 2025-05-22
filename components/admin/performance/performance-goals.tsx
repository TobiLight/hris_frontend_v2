import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

// Sample goals data
const companyGoals = [
  {
    id: 1,
    title: "Increase Customer Satisfaction Score to 95%",
    progress: 85,
    status: "On Track",
    dueDate: "December 31, 2024",
  },
  {
    id: 2,
    title: "Reduce Operational Costs by 10%",
    progress: 60,
    status: "At Risk",
    dueDate: "September 30, 2024",
  },
  {
    id: 3,
    title: "Expand Client Base by 15%",
    progress: 40,
    status: "On Track",
    dueDate: "December 31, 2024",
  },
  {
    id: 4,
    title: "Implement New Booking System",
    progress: 75,
    status: "On Track",
    dueDate: "August 15, 2024",
  },
]

export function PerformanceGoals() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "On Track":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "At Risk":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "Behind":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="border-b bg-gray-50 p-4 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Company Goals</CardTitle>
            <CardDescription>Track progress on key objectives</CardDescription>
          </div>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {companyGoals.map((goal) => (
            <div key={goal.id} className="space-y-2 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{goal.title}</h4>
                <Badge variant="outline" className={getStatusColor(goal.status)}>
                  {goal.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Due: {goal.dueDate}</span>
                <span>{goal.progress}% Complete</span>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
