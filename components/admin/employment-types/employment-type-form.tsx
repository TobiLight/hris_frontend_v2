"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { fetchEmploymentTypeById, createEmploymentType, updateEmploymentType } from "@/lib/api/employment-type-service"

// Form schema
const employmentTypeFormSchema = z.object({
  name: z.string().min(2, "Employment type name must be at least 2 characters"),
})

type EmploymentTypeFormValues = z.infer<typeof employmentTypeFormSchema>

interface EmploymentTypeFormProps {
  employmentTypeId?: string
}

export function EmploymentTypeForm({ employmentTypeId }: EmploymentTypeFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(!!employmentTypeId)

  // Initialize form
  const form = useForm<EmploymentTypeFormValues>({
    resolver: zodResolver(employmentTypeFormSchema),
    defaultValues: {
      name: "",
    },
  })

  // Fetch employment type data if editing
  useEffect(() => {
    const fetchEmploymentType = async () => {
      if (!employmentTypeId) return

      try {
        setIsFetching(true)
        const employmentType = await fetchEmploymentTypeById(employmentTypeId)
        form.reset({
          name: employmentType.name,
        })
      } catch (error) {
        console.error("Error fetching employment type:", error)
        toast.error("Failed to load employment type data")
      } finally {
        setIsFetching(false)
      }
    }

    fetchEmploymentType()
  }, [employmentTypeId, form])

  // Handle form submission
  const onSubmit = async (data: EmploymentTypeFormValues) => {
    try {
      setIsLoading(true)

      if (employmentTypeId) {
        // Update existing employment type
        await updateEmploymentType(employmentTypeId, data)
        toast.success("Employment type updated successfully")
      } else {
        // Create new employment type
        await createEmploymentType(data)
        toast.success("Employment type created successfully")
      }

      router.push("/admin/employment-types")
    } catch (error) {
      console.error("Error saving employment type:", error)
      toast.error(employmentTypeId ? "Failed to update employment type" : "Failed to create employment type")
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading employment type data...</span>
      </div>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Type Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter employment type name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/employment-types")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {employmentTypeId ? "Updating..." : "Creating..."}
                  </>
                ) : employmentTypeId ? (
                  "Update Employment Type"
                ) : (
                  "Create Employment Type"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
