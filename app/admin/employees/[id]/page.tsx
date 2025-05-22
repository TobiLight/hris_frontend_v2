import { AdminDashboardHeader } from "@/components/admin/dashboard-header"
import { EmployeeProfile } from "@/components/admin/employees/employee-profile"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

// This would normally come from a database
const getEmployeeData = (id: string) => {
  // Mock data for demonstration
  return {
    id: 1,
    personalInfo: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@btms.com",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "1985-06-15",
      gender: "Male",
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      avatar: "/placeholder.svg",
    },
    employmentInfo: {
      employeeId: "EMP-2024-0042",
      department: "Travel Services",
      position: "Senior Travel Consultant",
      employmentType: "Full-time",
      startDate: "2020-01-15",
      manager: "Jennifer Parker",
      workLocation: "New York HQ",
      workEmail: "john.doe@btms.com",
      workPhone: "+1 (555) 987-6543",
      status: "Active",
    },
    compensationInfo: {
      salaryType: "Annual",
      salaryAmount: "$75,000",
      payFrequency: "Bi-weekly",
      bankName: "Bank of America",
      accountNumber: "****4567",
      benefits: ["Health Insurance", "Dental Insurance", "401(k) Retirement Plan", "Paid Time Off"],
      lastReview: "2023-12-10",
      nextReview: "2024-12-10",
    },
    documents: {
      resume: true,
      idProof: true,
      addressProof: true,
      educationCertificates: true,
      offerLetter: true,
      contractAgreement: true,
      emergencyContact: {
        name: "Jane Doe",
        relationship: "Spouse",
        phone: "+1 (555) 765-4321",
      },
    },
    performance: {
      currentRating: 4.8,
      lastReviewDate: "2023-12-10",
      reviewComments:
        "Excellent performance across all areas. Consistently exceeds expectations in customer service and sales targets.",
      goals: [
        {
          id: 1,
          title: "Complete Customer Service Excellence Training",
          dueDate: "2024-06-30",
          progress: 75,
          status: "In Progress",
        },
        {
          id: 2,
          title: "Achieve 95% Client Satisfaction Rating",
          dueDate: "2024-12-31",
          progress: 90,
          status: "On Track",
        },
        {
          id: 3,
          title: "Reduce Booking Processing Time by 15%",
          dueDate: "2024-09-30",
          progress: 60,
          status: "In Progress",
        },
      ],
      skills: [
        "Travel Planning",
        "Corporate Bookings",
        "Itinerary Management",
        "Client Relations",
        "Travel Insurance",
        "Visa Processing",
      ],
      certifications: [
        "Certified Travel Associate (CTA)",
        "Amadeus Certification",
        "Sabre GDS Expert",
        "Customer Service Excellence",
      ],
    },
    attendance: {
      currentMonth: {
        present: 18,
        absent: 0,
        leave: 2,
        late: 1,
      },
      history: [
        {
          date: "2024-05-20",
          status: "Present",
          clockIn: "09:00 AM",
          clockOut: "05:30 PM",
        },
        {
          date: "2024-05-19",
          status: "Present",
          clockIn: "08:45 AM",
          clockOut: "05:15 PM",
        },
        {
          date: "2024-05-18",
          status: "Present",
          clockIn: "09:15 AM",
          clockOut: "05:45 PM",
        },
        {
          date: "2024-05-17",
          status: "Leave",
          clockIn: "-",
          clockOut: "-",
          reason: "Annual Leave",
        },
        {
          date: "2024-05-16",
          status: "Present",
          clockIn: "08:55 AM",
          clockOut: "05:25 PM",
        },
      ],
    },
    leave: {
      balance: {
        annual: {
          total: 18,
          used: 3,
          remaining: 15,
        },
        sick: {
          total: 10,
          used: 2,
          remaining: 8,
        },
        personal: {
          total: 5,
          used: 0,
          remaining: 5,
        },
      },
      history: [
        {
          id: 1,
          type: "Annual Leave",
          startDate: "2024-06-10",
          endDate: "2024-06-15",
          days: 5,
          status: "Approved",
          approvedBy: "Jennifer Parker",
          approvedOn: "2024-05-20",
        },
        {
          id: 2,
          type: "Sick Leave",
          startDate: "2024-05-17",
          endDate: "2024-05-17",
          days: 1,
          status: "Approved",
          approvedBy: "Jennifer Parker",
          approvedOn: "2024-05-17",
        },
        {
          id: 3,
          type: "Annual Leave",
          startDate: "2024-03-15",
          endDate: "2024-03-17",
          days: 3,
          status: "Approved",
          approvedBy: "Jennifer Parker",
          approvedOn: "2024-03-01",
        },
      ],
    },
    payroll: {
      history: [
        {
          id: 1,
          period: "April 2024",
          payDate: "2024-04-30",
          grossAmount: "$6,250.00",
          netAmount: "$4,687.50",
          status: "Paid",
        },
        {
          id: 2,
          period: "March 2024",
          payDate: "2024-03-31",
          grossAmount: "$6,250.00",
          netAmount: "$4,687.50",
          status: "Paid",
        },
        {
          id: 3,
          period: "February 2024",
          payDate: "2024-02-29",
          grossAmount: "$6,250.00",
          netAmount: "$4,687.50",
          status: "Paid",
        },
      ],
    },
  }
}

export default function EmployeeProfilePage({ params }: { params: { id: string } }) {
  const employeeData = getEmployeeData(params.id)

  return (
    <div className="flex flex-col">
      <AdminDashboardHeader />
      <div className="p-4 sm:p-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/admin/employees" className="flex items-center text-gray-500 hover:text-gray-700">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Employees
          </Link>
        </Button>

        <EmployeeProfile employee={employeeData} />
      </div>
    </div>
  )
}
