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
import { useToast } from "@/components/ui/use-toast"
import { createPayrollClass, getPayrollClassById, updatePayrollClass } from "@/lib/api/payroll-class-service"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  basic_pay: z.coerce.number().min(0, "Basic pay must be a positive number"),
  housing_allowance: z.coerce.number().min(0, "Housing allowance must be a positive number"),
  transport_allowance: z.coerce.number().min(0, "Transport allowance must be a positive number"),
  health_allowance: z.coerce.number().min(0, "Health allowance must be a positive number"),
})

type FormValues = z.infer<typeof formSchema>

interface PayrollClassFormProps {
  payrollClassId?: string
}

export function PayrollClassForm({ payrollClassId }: PayrollClassFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(!!payrollClassId)
  const [totalCompensation, setTotalCompensation] = useState(0)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      basic_pay: 0,
      housing_allowance: 0,
      transport_allowance: 0,
      health_allowance: 0,
    },
  })

  // Watch form values to calculate total compensation
  const watchedValues = form.watch()

  useEffect(() => {
    const { basic_pay, housing_allowance, transport_allowance, health_allowance } = watchedValues
    const total = (basic_pay || 0) + (housing_allowance || 0) + (transport_allowance || 0) + (health_allowance || 0)
    setTotalCompensation(total)
  }, [watchedValues])

  useEffect(() => {
    if (payrollClassId) {
      const fetchPayrollClass = async () => {
        try {
          setIsFetching(true)
          const payrollClass = await getPayrollClassById(payrollClassId)
          form.reset({
            name: payrollClass.name,
            basic_pay: payrollClass.basic_pay,
            housing_allowance: payrollClass.housing_allowance,
            transport_allowance: payrollClass.transport_allowance,
            health_allowance: payrollClass.health_allowance,
          })
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load payroll class details",
            variant: "destructive",
          })
        } finally {
          setIsFetching(false)
        }
      }

      fetchPayrollClass()
    }
  }, [payrollClassId, form, toast])

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true)

      if (payrollClassId) {
        await updatePayrollClass(payrollClassId, {
          id: payrollClassId,
          ...data,
        })
        toast({
          title: "Success",
          description: "Payroll class updated successfully",
        })
      } else {
        await createPayrollClass(data)
        toast({
          title: "Success",
          description: "Payroll class created successfully",
        })
      }

      router.push("/admin/payroll-classes")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: payrollClassId ? "Failed to update payroll class" : "Failed to create payroll class",
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
            <span className="ml-2">Loading payroll class data...</span>
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
                    <Input placeholder="Enter payroll class name" {...field} />
                  </FormControl>
                  <FormDescription>E.g., "Junior Staff", "Mid-Level", "Senior Management"</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="basic_pay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Basic Pay</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormDescription>Base salary amount</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="housing_allowance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Housing Allowance</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transport_allowance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transport Allowance</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="health_allowance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Health Allowance</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-muted p-4 rounded-md">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Compensation:</span>
                <span className="font-bold text-lg">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(totalCompensation)}
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/payroll-classes")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {payrollClassId ? "Update Payroll Class" : "Create Payroll Class"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
