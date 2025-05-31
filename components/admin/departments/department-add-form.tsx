"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { createDepartment } from "@/lib/api/department-service"
import { fetchEmployees } from "@/lib/api/employee-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"


// Form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Department name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  team_lead_id: z.string({
    required_error: "Please select a department manager.",
  }),
})

// Type for the form values
type FormValues = z.infer<typeof formSchema>

export function DepartmentAddForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [managers, setManagers] = useState<{ id?: string; name: string; job_title: string }[]>([])
  const [isLoadingManagers, setIsLoadingManagers] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      team_lead_id: ""
    },
  })

  // Load managers (employees who can be team leads)
  useEffect(() => {
    const loadManagers = async () => {
      try {
        setIsLoadingManagers(true)
        setError(null)

        // Fetch all employees
        const employees = await fetchEmployees()

        // Filter employees to only include those with the department_lead role
        const departmentLeads = employees.filter((employee) =>
          employee.role.name.toLowerCase() === "department_lead" ||
              employee.role.name.toLowerCase() === "admin" ||
              employee.role.name.toLowerCase() === "manager"
        )

        console.log(`Found ${departmentLeads.length} department leads out of ${employees.length} employees`)

        // If no department leads are found, use all employees as a fallback
        const managersToUse = departmentLeads.length > 0 ? departmentLeads : employees

        // Transform employees to manager format
        const managersData = managersToUse.map((emp) => ({
          id: emp.id,
          name: `${emp.first_name} ${emp.last_name}`,
          job_title: emp.job_title || "Employee",
        }))

        setManagers(managersData)
      } catch (err) {
        console.error("Failed to load managers:", err)
        setError("Failed to load managers. Please refresh the page and try again.")
      } finally {
        setIsLoadingManagers(false)
      }
    }

    loadManagers()
  }, [])

  // Form submission handler
  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true)
      setError(null)

      // Prepare the payload
      const departmentData = {
        name: values.name,
        description: values.description || null,
        team_lead_id: values.team_lead_id,
      }

      console.log("Creating department with data:", departmentData)

      // Call the API to create the department
      const newDepartment = await createDepartment(departmentData)

      console.log("Department created successfully:", newDepartment)

      // Show success message
      toast({
        title: "Department created",
        description: `${values.name} department has been successfully created.`,
      })

      // Redirect to departments page
      router.push("/admin/departments")
    } catch (err: any) {
      console.error("Error creating department:", err)
      toast({
        title: "Department created",
        description: `Failed to create department. Please try again.`,
        variant: "destructive"
      })
      setError(err.message || "Failed to create department. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4 w-full sm:w-auto">
          <TabsTrigger value="general" className="flex-1 sm:flex-none">
            Department Information
          </TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="general">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Marketing" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="team_lead_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department Manager*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={isLoadingManagers ? "Loading managers..." : "Select a manager"}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {isLoadingManagers ? (
                                <div className="flex items-center justify-center p-2">
                                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                  Loading...
                                </div>
                              ) : managers.length > 0 ? (
                                managers.map((manager) => (
                                  <SelectItem key={manager.id} value={manager.id as string}>
                                    {manager.name} - {manager.job_title}
                                  </SelectItem>
                                ))
                              ) : (
                                <div className="p-2 text-center text-sm text-gray-500">No managers available</div>
                              )}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            {managers.length > 0 && managers.length < 5
                              ? "Only employees with department lead roles are shown"
                              : "This person will be the team lead for the department"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Department Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter a description of the department's purpose and responsibilities"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/departments")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Department"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  )
}
