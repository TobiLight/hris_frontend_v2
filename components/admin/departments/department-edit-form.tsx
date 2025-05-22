"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// Sample department data - same as in department-details.tsx
const departmentData = {
  1: {
    id: 1,
    name: "Travel Services",
    code: "TRVL-001",
    description:
      "Handles all travel arrangements and bookings for corporate clients, including flights, accommodations, and ground transportation.",
    manager: {
      id: 101,
      name: "Jennifer Parker",
      email: "jennifer.parker@btms.com",
      avatar: "/placeholder.svg",
    },
    headCount: 45,
    location: "New York HQ",
    budget: "1250000",
    email: "travel.services@btms.com",
    phone: "+1 (212) 555-1234",
    parentDepartment: null,
    createdAt: "2020-03-15",
    // Other fields omitted for brevity
  },
  2: {
    id: 2,
    name: "Operations",
    code: "OPS-002",
    description:
      "Oversees day-to-day business operations, logistics, and service delivery to ensure efficient functioning of the company.",
    manager: {
      id: 102,
      name: "Michael Rodriguez",
      email: "michael.rodriguez@btms.com",
      avatar: "/placeholder.svg",
    },
    headCount: 25,
    location: "New York HQ",
    budget: "850000",
    email: "operations@btms.com",
    phone: "+1 (212) 555-2345",
    parentDepartment: null,
    createdAt: "2020-04-10",
    // Other fields omitted for brevity
  },
  // Add more departments as needed
}

// Sample managers data
const managers = [
  { id: 101, name: "Jennifer Parker" },
  { id: 102, name: "Michael Rodriguez" },
  { id: 103, name: "David Chen" },
  { id: 104, name: "Sarah Johnson" },
  { id: 105, name: "Emily Davis" },
  { id: 106, name: "Michael Brown" },
  { id: 107, name: "Robert Wilson" },
]

// Sample locations
const locations = ["New York HQ", "Chicago Office", "Los Angeles Office", "Miami Office", "Remote"]

// Sample departments for parent department selection
const parentDepartments = [
  { id: 1, name: "Travel Services" },
  { id: 2, name: "Operations" },
  { id: 3, name: "Finance" },
  { id: 4, name: "Marketing" },
  { id: 5, name: "HR" },
  { id: 6, name: "IT" },
  { id: 7, name: "Admin" },
]

export function DepartmentEditForm({ id }: { id: string }) {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    manager: "",
    location: "",
    budget: "",
    parentDepartment: "none",
    email: "",
    phone: "",
  })

  useEffect(() => {
    // Simulate API call to fetch department data
    const fetchDepartment = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      const dept = departmentData[id as keyof typeof departmentData] || departmentData[1]

      setFormData({
        name: dept.name,
        code: dept.code,
        description: dept.description,
        manager: dept.manager.id.toString(),
        location: dept.location,
        budget: dept.budget,
        parentDepartment: dept.parentDepartment ? dept.parentDepartment.toString() : "none",
        email: dept.email,
        phone: dept.phone,
      })

      setLoading(false)
    }

    fetchDepartment()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Department updated",
        description: "Department has been updated successfully.",
      })

      // Redirect to department details page
      router.push(`/admin/departments/${id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update department. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General Information</TabsTrigger>
          <TabsTrigger value="additional">Additional Details</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Department Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code">
                    Department Code <span className="text-red-500">*</span>
                  </Label>
                  <Input id="code" name="code" value={formData.code} onChange={handleChange} required />
                  <p className="text-xs text-gray-500">Unique identifier for the department</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manager">
                    Department Manager <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    name="manager"
                    value={formData.manager}
                    onValueChange={(value) => handleSelectChange("manager", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a manager" />
                    </SelectTrigger>
                    <SelectContent>
                      {managers.map((manager) => (
                        <SelectItem key={manager.id} value={manager.id.toString()}>
                          {manager.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    name="location"
                    value={formData.location}
                    onValueChange={(value) => handleSelectChange("location", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">
                    Budget (USD) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentDepartment">Parent Department</Label>
                  <Select
                    name="parentDepartment"
                    value={formData.parentDepartment}
                    onValueChange={(value) => handleSelectChange("parentDepartment", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a parent department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None (Top-level Department)</SelectItem>
                      {parentDepartments
                        .filter((dept) => dept.id.toString() !== id) // Filter out current department
                        .map((dept) => (
                          <SelectItem key={dept.id} value={dept.id.toString()}>
                            {dept.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Leave empty if this is a top-level department</p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="additional">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Department Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Department Phone</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/admin/departments/${id}`)}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  )
}
