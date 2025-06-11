"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format, addDays } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, CalendarIcon, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { Employee, fetchEmployees } from "@/lib/api/employee-service"
import { getLeaveTypeById } from "@/lib/api/leave-type-services"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const formSchema = z
  .object({
    leave_type: z.enum(["Annual", "Sick", "Compassionate", "Maternity"], {
      required_error: "Please select a leave type",
    }),
    description: z.string().optional(),
    outstanding_days: z.coerce.number().min(0, "Outstanding days must be a positive number"),
    start_date: z.date({
      required_error: "Start date is required",
    }),
    end_date: z.date({
      required_error: "End date is required",
    }),
    resumption_date: z.date({
      required_error: "Resumption date is required",
    }),
    relieving_staff_id: z.string({
      required_error: "Relieving staff is required",
    }),
    address_during_leave: z.string().min(1, "Address during leave is required"),
    contact_phone: z.string().min(1, "Contact phone is required"),
    handover_document: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, `File size should be less than 5MB`)
      .optional(),
  })
  .refine((data) => data.end_date >= data.start_date, {
    message: "End date must be after start date",
    path: ["end_date"],
  })

type FormValues = z.infer<typeof formSchema>

interface LeaveTypeFormProps {
  leaveTypeId?: string
}

export function LeaveTypeForm({ leaveTypeId }: LeaveTypeFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(!!leaveTypeId)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [supervisor, setSupervisor] = useState<string>()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leave_type: "Annual",
      description: "",
      outstanding_days: 0,
      address_during_leave: "",
      contact_phone: "",
    },
  })

  // Watch start and end dates to calculate resumption date
  const startDate = form.watch("start_date")
  const endDate = form.watch("end_date")

  // Auto-calculate resumption date when end date changes
  useEffect(() => {
    if (endDate) {
      const resumptionDate = addDays(new Date(endDate), 1)
      form.setValue("resumption_date", resumptionDate)
    }
  }, [endDate, form])

  // Fetch employees for staff selection
  useEffect(() => {
    const fetchEmployeesData = async () => {
      try {
        const data = await fetchEmployees()
        setEmployees(data)
      } catch (error) {
        console.error("Failed to fetch employees:", error)
        toast({
          title: "Error",
          description: "Failed to load employee data",
          variant: "destructive",
        })
      }
    }

    fetchEmployeesData()
  }, [toast])

  // Fetch leave type data if editing
  useEffect(() => {
    if (leaveTypeId) {
      const fetchLeaveType = async () => {
        try {
          setIsFetching(true)
          const leaveType = await getLeaveTypeById(leaveTypeId)

          // Convert string dates to Date objects
          const startDate = new Date(leaveType.start_date || new Date())
          const endDate = new Date(leaveType.end_date || new Date())
          const resumptionDate = new Date(leaveType.resumption_date || new Date())

          form.reset({
            leave_type: leaveType.name as any,
            description: leaveType.description,
            outstanding_days: leaveType.outstanding_days || 0,
            start_date: startDate,
            end_date: endDate,
            resumption_date: resumptionDate,
            relieving_staff_id: leaveType.relieving_staff_id || "",
            address_during_leave: leaveType.address_during_leave || "",
            contact_phone: leaveType.contact_phone || "",
          })

          // Set supervisor if available
          if (leaveType.supervisor_id) {
            setSupervisor(leaveType.supervisor_id)
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load leave request details",
            variant: "destructive",
          })
        } finally {
          setIsFetching(false)
        }
      }

      fetchLeaveType()
    }
  }, [leaveTypeId, form, toast])

  // Auto-set supervisor when relieving staff changes
  const onRelievingStaffChange = (staffId: string) => {
    const staff = employees.find((emp) => emp.id === staffId)
    if (staff && staff.role.name === "department_lead") {
      setSupervisor(staff.id)

      // Find supervisor name for display
      const supervisorEmployee = employees.find((emp) => emp.id === staff.team_lead_id)
      if (supervisorEmployee) {
        toast({
          title: "Supervisor Assigned",
          description: `${supervisorEmployee.first_name} ${supervisorEmployee.last_name} has been automatically assigned as supervisor.`,
        })
      }
    } else {
      setSupervisor(null)
    }
  }

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true)

      // Create FormData for file upload
      const formData = new FormData()
      formData.append("leave_type", data.leave_type)
      if (data.description) formData.append("description", data.description)
      formData.append("outstanding_days", data.outstanding_days.toString())
      formData.append("start_date", format(data.start_date, "yyyy-MM-dd"))
      formData.append("end_date", format(data.end_date, "yyyy-MM-dd"))
      formData.append("resumption_date", format(data.resumption_date, "yyyy-MM-dd"))
      formData.append("relieving_staff_id", data.relieving_staff_id)
      if (supervisor) formData.append("supervisor_id", supervisor)
      formData.append("address_during_leave", data.address_during_leave)
      formData.append("contact_phone", data.contact_phone)

      if (data.handover_document) {
        formData.append("handover_document", data.handover_document)
      }

      if (leaveTypeId) {
        // Update existing leave request
        await updateLeaveType(leaveTypeId, formData as any)
        toast({
          title: "Success",
          description: "Leave request updated successfully",
        })
      } else {
        // Create new leave request
        await createLeaveType(formData as any)
        toast({
          title: "Success",
          description: "Leave request submitted successfully",
        })
      }

      router.push("/admin/leave-types")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: leaveTypeId ? "Failed to update leave request" : "Failed to submit leave request",
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
            <span className="ml-2">Loading leave request data...</span>
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
            {/* Leave Type Dropdown */}
            <FormField
              control={form.control}
              name="leave_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Annual">Annual Leave</SelectItem>
                      <SelectItem value="Sick">Sick Leave</SelectItem>
                      <SelectItem value="Compassionate">Compassionate Leave</SelectItem>
                      <SelectItem value="Maternity">Maternity Leave</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter reason for leave (optional)" className="min-h-20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Outstanding Days */}
            <FormField
              control={form.control}
              name="outstanding_days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outstanding Days</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormDescription>Number of leave days available</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Range - Start Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Date */}
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date() || (startDate ? date < startDate : false)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Resumption Date - Auto-calculated */}
            <FormField
              control={form.control}
              name="resumption_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Resumption Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Auto-calculated</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date() || (endDate ? date <= endDate : false)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Automatically calculated as the day after your end date</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Relieving Staff */}
            <FormField
              control={form.control}
              name="relieving_staff_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relieving Staff</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      onRelievingStaffChange(value)
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select relieving staff" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.first_name} {employee.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Staff who will handle your responsibilities during leave</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Supervisor - Auto-populated */}
            <FormItem>
              <FormLabel>Supervisor</FormLabel>
              <Input
                value={
                  supervisor
                    ? employees.find((emp) => emp.id === supervisor)
                      ? `${employees.find((emp) => emp.id === supervisor)?.first_name} ${employees.find((emp) => emp.id === supervisor)?.last_name}`
                      : "Loading supervisor..."
                    : "Will be auto-assigned based on relieving staff"
                }
                disabled
              />
              <FormDescription>Automatically assigned based on your team lead</FormDescription>
            </FormItem>

            {/* Address During Leave */}
            <FormField
              control={form.control}
              name="address_during_leave"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address During Leave</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your address during leave" className="min-h-20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Phone */}
            <FormField
              control={form.control}
              name="contact_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact phone number" {...field} />
                  </FormControl>
                  <FormDescription>Phone number where you can be reached during leave</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Handover Document Upload */}
            <FormField
              control={form.control}
              name="handover_document"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Upload Handover Document</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="handover-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PDF, DOCX or other document (max 5MB)</p>
                        </div>
                        <input
                          id="handover-upload"
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              onChange(file)
                            }
                          }}
                          {...fieldProps}
                        />
                      </label>
                    </div>
                  </FormControl>
                  {value && (
                    <p className="text-sm text-green-600 mt-2">
                      File selected: {value instanceof File ? value.name : "Document uploaded"}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

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
                {leaveTypeId ? "Update Leave Request" : "Submit Leave Request"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
