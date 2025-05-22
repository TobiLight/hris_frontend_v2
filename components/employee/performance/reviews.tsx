import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

const reviews = [
  {
    id: 1,
    period: "Q1 2024",
    date: "April 15, 2024",
    rating: "4.8/5.0",
    reviewer: "Jane Smith",
    status: "Completed",
  },
  {
    id: 2,
    period: "Q4 2023",
    date: "January 10, 2024",
    rating: "4.7/5.0",
    reviewer: "Jane Smith",
    status: "Completed",
  },
  {
    id: 3,
    period: "Q3 2023",
    date: "October 12, 2023",
    rating: "4.6/5.0",
    reviewer: "Robert Johnson",
    status: "Completed",
  },
  {
    id: 4,
    period: "Q2 2023",
    date: "July 15, 2023",
    rating: "4.5/5.0",
    reviewer: "Robert Johnson",
    status: "Completed",
  },
]

export function PerformanceReviews() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Reviews</CardTitle>
        <CardDescription>Your past performance evaluations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="flex items-start justify-between rounded-lg border p-4">
              <div>
                <h4 className="font-medium">{review.period} Review</h4>
                <p className="text-sm text-gray-500">Date: {review.date}</p>
                <p className="text-sm text-gray-500">Rating: {review.rating}</p>
                <p className="text-sm text-gray-500">Reviewer: {review.reviewer}</p>
              </div>
              <Button variant="ghost" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                View
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
