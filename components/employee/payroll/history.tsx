import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

const payrollHistory = [
  {
    id: 1,
    period: "April 2024",
    payDate: "April 30, 2024",
    grossAmount: "$3,450.00",
    netAmount: "$2,760.00",
    status: "Paid",
  },
  {
    id: 2,
    period: "March 2024",
    payDate: "March 31, 2024",
    grossAmount: "$3,450.00",
    netAmount: "$2,760.00",
    status: "Paid",
  },
  {
    id: 3,
    period: "February 2024",
    payDate: "February 29, 2024",
    grossAmount: "$3,450.00",
    netAmount: "$2,760.00",
    status: "Paid",
  },
  {
    id: 4,
    period: "January 2024",
    payDate: "January 31, 2024",
    grossAmount: "$3,450.00",
    netAmount: "$2,760.00",
    status: "Paid",
  },
]

export function PayrollHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payroll History</CardTitle>
        <CardDescription>Your payment records for the past months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left font-medium">Period</th>
                <th className="px-4 py-2 text-left font-medium">Pay Date</th>
                <th className="px-4 py-2 text-left font-medium">Gross Amount</th>
                <th className="px-4 py-2 text-left font-medium">Net Amount</th>
                <th className="px-4 py-2 text-left font-medium">Status</th>
                <th className="px-4 py-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payrollHistory.map((record) => (
                <tr key={record.id} className="border-b">
                  <td className="px-4 py-2">{record.period}</td>
                  <td className="px-4 py-2">{record.payDate}</td>
                  <td className="px-4 py-2">{record.grossAmount}</td>
                  <td className="px-4 py-2">{record.netAmount}</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {record.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <Button variant="ghost" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
