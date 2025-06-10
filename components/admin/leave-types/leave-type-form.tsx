"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { getLeaveTypeById, updateLeaveType, createLeaveType } from "@/lib/api/leave-type-services"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  default_days: z.coerce.number().min(0, "Default days must be a positive number"),
  is_paid: z.boolean(),
  requires_approval: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

interface LeaveTypeFormProps {
  leaveTypeId?: string
}

export function LeaveTypeForm({ leaveTypeId }: LeaveTypeFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(!!leaveTypeId)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      default_days: 0,
      is_paid: false,
      requires_approval: true,
    },
  })

  useEffect(() => {
    if (leaveTypeId) {
      const fetchLeaveType = async () => {
        try {
          setIsFetching(true)
          const leaveType = await getLeaveTypeById(leaveTypeId)
          form.reset({
            name: leaveType.name,
            description: leaveType.description,
            default_days: leaveType.default_days,
            is_paid: leaveType.is_paid,
            requires_approval: leaveType.requires_approval,
          })
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load leave type details",
            variant: "destructive",
          })
        } finally {
          setIsFetching(false)
        }
      }

      fetchLeaveType()
    }
  }, [leaveTypeId, form, toast])

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true)

      if (leaveTypeId) {
        await updateLeaveType(leaveTypeId, {
          id: leaveTypeId,
          ...data,
        })
        toast({
          title: "Success",
          description: "Leave type updated successfully",
        })
      } else {
        await createLeaveType(data)
        toast({
          title: "Success",
          description: "Leave type created successfully",
        })
      }

      router.push("/admin/leave-types")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: leaveTypeId ? "Failed to update leave type" : "Failed to create leave type",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-60">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading leave type data...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter leave type name" {...field} />
                  </FormControl>
                  <FormDescription>E.g., "Annual Leave", "Sick Leave", "Maternity Leave"</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter leave type description" className="min-h-20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="default_days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Days</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormDescription>Default number of days allocated for this leave type per year</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="is_paid"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Paid Leave</FormLabel>
                      <FormDescription>Check if this leave type is paid</FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requires_approval"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Requires Approval</FormLabel>
                      <FormDescription>Check if this leave type requires manager approval</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/leave-types")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {leaveTypeId ? "Update Leave Type" : "Create Leave Type"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
