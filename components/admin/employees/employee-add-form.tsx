"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { User, Briefcase, DollarSign, FileText, HelpCircle, Loader2, Calendar, Upload } from "lucide-react"

// Form schema for personal information
const personalInfoSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"], {
    required_error: "Please select a gender",
  }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(1, { message: "Zip code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
})

// Form schema for employment information
const employmentInfoSchema = z.object({
  employeeId: z.string().min(1, { message: "Employee ID is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  employmentType: z.enum(["full-time", "part-time", "contract", "intern"], {
    required_error: "Please select employment type",
  }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  manager: z.string().optional(),
  workLocation: z.string().min(1, { message: "Work location is required" }),
  workEmail: z.string().email({ message: "Please enter a valid work email" }).optional(),
  workPhone: z.string().optional(),
})

// Form schema for compensation information
const compensationInfoSchema = z.object({
  salaryType: z.enum(["hourly", "monthly", "annual"], {
    required_error: "Please select salary type",
  }),
  salaryAmount: z.string().min(1, { message: "Salary amount is required" }),
  payFrequency: z.enum(["weekly", "bi-weekly", "monthly"], {
    required_error: "Please select pay frequency",
  }),
  bankName: z.string().min(1, { message: "Bank name is required" }),
  accountNumber: z.string().min(1, { message: "Account number is required" }),
  routingNumber: z.string().min(1, { message: "Routing number is required" }),
  taxWithholding: z.string().optional(),
  benefits: z.array(z.string()).optional(),
})

// Form schema for documents
const documentsSchema = z.object({
  resume: z.boolean().optional(),
  idProof: z.boolean().optional(),
  addressProof: z.boolean().optional(),
  educationCertificates: z.boolean().optional(),
  offerLetter: z.boolean().optional(),
  contractAgreement: z.boolean().optional(),
  emergencyContact: z.object({
    name: z.string().min(1, { message: "Emergency contact name is required" }),
    relationship: z.string().min(1, { message: "Relationship is required" }),
    phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  }),
})

// Combined schema
const employeeSchema = z.object({
  personalInfo: personalInfoSchema,
  employmentInfo: employmentInfoSchema,
  compensationInfo: compensationInfoSchema,
  documents: documentsSchema,
})

type EmployeeFormValues = z.infer<typeof employeeSchema>

export function EmployeeAddForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Default values for the form
  const defaultValues: Partial<EmployeeFormValues> = {
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "prefer-not-to-say",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    },
    employmentInfo: {
      employeeId: "",
      department: "",
      position: "",
      employmentType: "full-time",
      startDate: "",
      manager: "",
      workLocation: "",
      workEmail: "",
      workPhone: "",
    },
    compensationInfo: {
      salaryType: "annual",
      salaryAmount: "",
      payFrequency: "bi-weekly",
      bankName: "",
      accountNumber: "",
      routingNumber: "",
      taxWithholding: "",
      benefits: [],
    },
    documents: {
      resume: false,
      idProof: false,
      addressProof: false,
      educationCertificates: false,
      offerLetter: false,
      contractAgreement: false,
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
      },
    },
  }

  // Initialize the form
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
    mode: "onChange",
  })

  // Handle form submission
  async function onSubmit(data: EmployeeFormValues) {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log(data)

      toast({
        title: "Employee Added Successfully",
        description: `${data.personalInfo.firstName} ${data.personalInfo.lastName} has been added to the system.`,
      })

      router.push("/admin/employees")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding the employee. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle tab navigation
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Navigate to next tab
  const handleNext = () => {
    if (activeTab === "personal") {
      const personalInfoValid = form.trigger("personalInfo", { shouldFocus: true })
      if (personalInfoValid) {
        setActiveTab("employment")
      }
    } else if (activeTab === "employment") {
      const employmentInfoValid = form.trigger("employmentInfo", { shouldFocus: true })
      if (employmentInfoValid) {
        setActiveTab("compensation")
      }
    } else if (activeTab === "compensation") {
      const compensationInfoValid = form.trigger("compensationInfo", { shouldFocus: true })
      if (compensationInfoValid) {
        setActiveTab("documents")
      }
    }
  }

  // Navigate to previous tab
  const handlePrevious = () => {
    if (activeTab === "employment") {
      setActiveTab("personal")
    } else if (activeTab === "compensation") {
      setActiveTab("employment")
    } else if (activeTab === "documents") {
      setActiveTab("compensation")
    }
  }

  // Available benefits options
  const benefitsOptions = [
    { id: "health-insurance", label: "Health Insurance" },
    { id: "dental-insurance", label: "Dental Insurance" },
    { id: "vision-insurance", label: "Vision Insurance" },
    { id: "401k", label: "401(k) Retirement Plan" },
    { id: "life-insurance", label: "Life Insurance" },
    { id: "paid-time-off", label: "Paid Time Off" },
    { id: "flexible-spending", label: "Flexible Spending Account" },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Personal Info</span>
                </TabsTrigger>
                <TabsTrigger value="employment" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Employment</span>
                </TabsTrigger>
                <TabsTrigger value="compensation" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span className="hidden sm:inline">Compensation</span>
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Documents</span>
                </TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <p className="text-sm text-gray-500">Enter the employee's basic personal details</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="personalInfo.firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="personalInfo.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Personal Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="personalInfo.dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                              <Input type="date" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="personalInfo.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="123 Main St, Apt 4B" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="personalInfo.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province</FormLabel>
                          <FormControl>
                            <Input placeholder="NY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="personalInfo.zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip/Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="United States" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Employment Information Tab */}
              <TabsContent value="employment" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">Employment Information</h2>
                    <p className="text-sm text-gray-500">Enter the employee's job and position details</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="employmentInfo.employeeId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employee ID</FormLabel>
                          <FormControl>
                            <Input placeholder="EMP-2024-0001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="employmentInfo.startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                              <Input type="date" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="employmentInfo.department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="travel-services">Travel Services</SelectItem>
                              <SelectItem value="operations">Operations</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="marketing">Marketing</SelectItem>
                              <SelectItem value="hr">HR</SelectItem>
                              <SelectItem value="it">IT</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="employmentInfo.position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position/Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Senior Travel Consultant" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="employmentInfo.employmentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employment Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="full-time">Full-time</SelectItem>
                              <SelectItem value="part-time">Part-time</SelectItem>
                              <SelectItem value="contract">Contract</SelectItem>
                              <SelectItem value="intern">Intern</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="employmentInfo.manager"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Manager/Supervisor</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select manager" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="jennifer-parker">Jennifer Parker</SelectItem>
                              <SelectItem value="michael-rodriguez">Michael Rodriguez</SelectItem>
                              <SelectItem value="david-chen">David Chen</SelectItem>
                              <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                              <SelectItem value="emily-davis">Emily Davis</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="employmentInfo.workLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Location</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="new-york-hq">New York HQ</SelectItem>
                            <SelectItem value="chicago-office">Chicago Office</SelectItem>
                            <SelectItem value="remote">Remote</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="employmentInfo.workEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Work Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@btms.com" type="email" {...field} />
                          </FormControl>
                          <FormDescription>Will be created automatically if left blank</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="employmentInfo.workPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Work Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 987-6543" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Compensation Information Tab */}
              <TabsContent value="compensation" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">Compensation & Benefits</h2>
                      <p className="text-sm text-gray-500">Enter the employee's salary and benefits information</p>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            This information is confidential and only accessible to HR and Finance departments
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="compensationInfo.salaryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="annual">Annual</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="compensationInfo.salaryAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary Amount</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <DollarSign className="mr-2 h-4 w-4 text-gray-400" />
                              <Input placeholder="50000" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="compensationInfo.payFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pay Frequency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border-t pt-4">
                    <h3 className="text-md font-medium mb-4">Direct Deposit Information</h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="compensationInfo.bankName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bank Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Bank of America" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="compensationInfo.accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Number</FormLabel>
                            <FormControl>
                              <Input placeholder="123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="compensationInfo.routingNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Routing Number</FormLabel>
                            <FormControl>
                              <Input placeholder="987654321" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="compensationInfo.taxWithholding"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Withholding (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="W-4 Information" {...field} />
                        </FormControl>
                        <FormDescription>Enter any specific tax withholding information</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border-t pt-4">
                    <FormField
                      control={form.control}
                      name="compensationInfo.benefits"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">Benefits</FormLabel>
                            <FormDescription>Select the benefits this employee will receive</FormDescription>
                          </div>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {benefitsOptions.map((benefit) => (
                              <FormField
                                key={benefit.id}
                                control={form.control}
                                name="compensationInfo.benefits"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={benefit.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(benefit.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...(field.value || []), benefit.id])
                                              : field.onChange(field.value?.filter((value) => value !== benefit.id))
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">{benefit.label}</FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">Documents & Emergency Contact</h2>
                    <p className="text-sm text-gray-500">
                      Upload required documents and provide emergency contact information
                    </p>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="text-md font-medium mb-4">Required Documents</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="documents.resume"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Resume/CV</FormLabel>
                                <FormDescription>Employee's resume or curriculum vitae</FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="documents.idProof"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>ID Proof</FormLabel>
                                <FormDescription>Government-issued ID (passport, driver's license)</FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="documents.addressProof"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Address Proof</FormLabel>
                                <FormDescription>Utility bill or other proof of address</FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="documents.educationCertificates"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Education Certificates</FormLabel>
                                <FormDescription>Degrees, diplomas, and certifications</FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="documents.offerLetter"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Offer Letter</FormLabel>
                                <FormDescription>Signed offer letter from the employee</FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="documents.contractAgreement"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Contract Agreement</FormLabel>
                                <FormDescription>Employment contract or agreement</FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button type="button" variant="outline" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Documents
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">
                        You can upload documents later if they are not available now
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-md font-medium mb-4">Emergency Contact Information</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="documents.emergencyContact.name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="documents.emergencyContact.relationship"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relationship</FormLabel>
                            <FormControl>
                              <Input placeholder="Spouse, Parent, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name="documents.emergencyContact.phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 987-6543" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={activeTab === "personal" || isSubmitting}
              >
                Previous
              </Button>

              {activeTab !== "documents" ? (
                <Button type="button" onClick={handleNext} disabled={isSubmitting}>
                  Next
                </Button>
              ) : (
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Add Employee"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
