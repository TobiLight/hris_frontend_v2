"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  fetchEmployeeById,
  updateEmployee,
  fetchDepartments,
  fetchEmploymentTypes,
  fetchPayrollClasses,
  fetchBanks,
  fetchPensions,
  fetchRoles,
  Pension,
  PayrollClass,
  EmploymentType,
  Role,
  Department,
} from "@/lib/api/employee-service";
import { Bank } from "@/lib/api/bank-service";
import { toast } from "@/hooks/use-toast";

// Form schema
const employeeFormSchema = z.object({
  // Personal Information
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  middle_name: z.string().optional(),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  gender: z.enum(["MALE", "FEMALE"]),
  dob: z.string(),
  job_title: z.string().min(2, "Job title must be at least 2 characters"),
  staff_id: z.number().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  personal_email: z.string().email("Invalid personal email address"),

  // Next of Kin
  next_of_kin_name: z
    .string()
    .min(2, "Next of kin name must be at least 2 characters"),
  next_of_kin_phone: z
    .string()
    .min(5, "Next of kin phone must be at least 5 characters"),
  next_of_kin_email: z.string().email("Invalid next of kin email").optional(),
  next_of_kin_relationship: z
    .string()
    .min(2, "Relationship must be at least 2 characters"),

  // Employment Details
  department_id: z.string().min(1, "Department is required"),
  employment_date: z.string(),
  employment_type_id: z.string().min(1, "Employment type is required"),
  payroll_class_id: z.string().min(1, "Payroll class is required"),
  bank_id: z.string().min(1, "Bank is required"),
  bank_account_number: z.string().optional(),
  tax_number: z.string().optional(),
  pension_id: z.string().optional(),
  pension_number: z.string().optional(),
  role_id: z.string().min(1, "Role is required"),
  is_active: z.boolean(),
});

type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

export function EmployeeEditForm({ employeeId }: { employeeId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<EmploymentType[]>([]);
  const [payrollClasses, setPayrollClasses] = useState<PayrollClass[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [pensions, setPensions] = useState<Pension[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  // Initialize form
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      gender: "MALE",
      dob: "",
      job_title: "",
      staff_id: undefined,
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      country: "",
      personal_email: "",
      next_of_kin_name: "",
      next_of_kin_phone: "",
      next_of_kin_email: "",
      next_of_kin_relationship: "",
      department_id: "",
      employment_date: "",
      employment_type_id: "",
      payroll_class_id: "",
      bank_id: "",
      bank_account_number: "",
      tax_number: "",
      pension_id: "",
      pension_number: "",
      role_id: "",
      is_active: true,
    },
  });

  // Fetch employee data and populate form
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);

        // Fetch employee data
        const employeeData = await fetchEmployeeById(employeeId);

        // Fetch reference data
        const [
          departmentsData,
          employmentTypesData,
          payrollClassesData,
          banksData,
          pensionsData,
          rolesData,
        ] = await Promise.all([
          fetchDepartments(),
          fetchEmploymentTypes(),
          fetchPayrollClasses(),
          fetchBanks(),
          fetchPensions(),
          fetchRoles(),
        ]);

        setDepartments(departmentsData);
        setEmploymentTypes(employmentTypesData);
        setPayrollClasses(payrollClassesData);
        setBanks(banksData);
        setPensions(pensionsData);
        setRoles(rolesData);

        // Format dates
        const formattedDob = employeeData.dob ? employeeData.dob : "";
        const formattedEmploymentDate = employeeData.employment_date
          ? employeeData.employment_date.split("T")[0]
          : "";

        // Populate form with employee data
        form.reset({
          first_name: employeeData.first_name,
          middle_name: employeeData.middle_name || "",
          last_name: employeeData.last_name,
          gender: employeeData.gender as "MALE" | "FEMALE",
          dob: formattedDob,
          job_title: employeeData.job_title,
          staff_id: employeeData.staff_id,
          email: employeeData.email,
          phone: employeeData.phone || "",
          address: employeeData.address || "",
          city: employeeData.city,
          state: employeeData.state,
          country: employeeData.country,
          personal_email: employeeData.personal_email,
          next_of_kin_name: employeeData.next_of_kin?.name || "",
          next_of_kin_phone: employeeData.next_of_kin?.phone || "",
          next_of_kin_email: employeeData.next_of_kin?.email || "",
          next_of_kin_relationship:
            employeeData.next_of_kin?.relationship || "",
          department_id: employeeData.department_id,
          employment_date: formattedEmploymentDate,
          employment_type_id: employeeData.employment_type_id,
          payroll_class_id: employeeData.payroll_class_id,
          bank_id: employeeData.bank_id,
          bank_account_number: employeeData.bank_account_number || "",
          tax_number: employeeData.tax_number || "",
          pension_id: employeeData.pension_id || "",
          pension_number: employeeData.pension_number || "",
          role_id: employeeData.role_id || "",
          is_active: employeeData.is_active,
        });
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [employeeId, form]);

  // Handle form submission
  const onSubmit = async (data: EmployeeFormValues) => {
    try {
      setIsLoading(true);

      // Prepare payload
      const payload = {
        first_name: data.first_name,
        middle_name: data.middle_name || null,
        last_name: data.last_name,
        gender: data.gender,
        dob: data.dob,
        job_title: data.job_title,
        staff_id: data.staff_id,
        email: data.email,
        phone: data.phone || null,
        address: data.address || null,
        city: data.city,
        state: data.state,
        country: data.country,
        personal_email: data.personal_email,
        next_of_kin: {
          name: data.next_of_kin_name,
          phone: data.next_of_kin_phone,
          email: data.next_of_kin_email || null,
          relationship: data.next_of_kin_relationship,
        },
        department_id: data.department_id,
        employment_date: data.employment_date,
        employment_type_id: data.employment_type_id,
        payroll_class_id: data.payroll_class_id,
        bank_id: data.bank_id,
        bank_account_number: data.bank_account_number || null,
        tax_number: data.tax_number || null,
        pension_id: data.pension_id || null,
        pension_number: data.pension_number || null,
        role_id: data.role_id,
        is_active: data.is_active,
      };

      // Send update request
      let employee = await updateEmployee(employeeId, payload);

      toast({
        title: "Employee data updated successfully",
        description: `You have successfully updated ${employee.first_name} ${employee.last_name}'s data`,
      });
      router.push(`/admin/employees/${employeeId}`);
    } catch (error) {
      console.error("Error updating employee:", error);
      toast({
        title: "Error updating Employee data",
        description:
          error instanceof Error
            ? error.message
            : "An unknown error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Tab navigation functions
  const goToNextTab = async () => {
    if (activeTab === "personal") {
      if (await validatePersonalInfo()) {
        setActiveTab("employment");
      }
    } else if (activeTab === "employment") {
      if (await validateEmploymentInfo()) {
        setActiveTab("compensation");
      }
    } else if (activeTab === "compensation") {
      if (await validateCompensationInfo()) {
        setActiveTab("nextOfKin");
      }
    }
  };

  const goToPreviousTab = () => {
    if (activeTab === "employment") {
      setActiveTab("personal");
    } else if (activeTab === "compensation") {
      setActiveTab("employment");
    } else if (activeTab === "nextOfKin") {
      setActiveTab("compensation");
    }
  };

  // Validation functions for each tab
  const validatePersonalInfo = async () => {
    const result = await form.trigger(
      [
        "first_name",
        "last_name",
        "gender",
        "dob",
        "job_title",
        "email",
        "address",
        "city",
        "state",
        "country",
        "personal_email",
      ],
      { shouldFocus: true }
    );
    return result;
  };

  const validateEmploymentInfo = async () => {
    const result = await form.trigger(
      ["department_id", "employment_date", "employment_type_id", "role_id"],
      { shouldFocus: true }
    );
    return result;
  };

  const validateCompensationInfo = async () => {
    const result = await form.trigger(
      ["payroll_class_id", "bank_id", "bank_account_number"],
      { shouldFocus: true }
    );
    return result;
  };

  const validateNextOfKinInfo = async () => {
    const result = await form.trigger(
      ["next_of_kin_name", "next_of_kin_phone", "next_of_kin_relationship"],
      { shouldFocus: true }
    );
    return result;
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading employee data...</span>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="employment">Employment Details</TabsTrigger>
                <TabsTrigger value="compensation">Compensation</TabsTrigger>
                <TabsTrigger value="nextOfKin">Next of Kin</TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="middle_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Middle Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Middle name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MALE">Male</SelectItem>
                            <SelectItem value="FEMALE">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth*</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(new Date(field.value), "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) =>
                                field.onChange(
                                  date ? format(date, "yyyy-MM-dd") : ""
                                )
                              }
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="job_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title*</FormLabel>
                        <FormControl>
                          <Input placeholder="Job title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="staff_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Staff ID</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Staff ID"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? Number.parseInt(e.target.value)
                                  : undefined
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Email*</FormLabel>
                        <FormControl>
                          <Input placeholder="Work email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="personal_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Personal Email*</FormLabel>
                        <FormControl>
                          <Input placeholder="Personal email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City*</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State*</FormLabel>
                        <FormControl>
                          <Input placeholder="State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country*</FormLabel>
                        <FormControl>
                          <Input placeholder="Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={goToNextTab}>
                    Next
                  </Button>
                </div>
              </TabsContent>

              {/* Employment Details Tab */}
              <TabsContent value="employment" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="department_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept.id} value={dept.id}>
                                {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employment_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Employment Date*</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(new Date(field.value), "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) =>
                                field.onChange(
                                  date ? format(date, "yyyy-MM-dd") : ""
                                )
                              }
                              disabled={(date) => date > new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employment_type_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Type*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {employmentTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={role.id}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                          defaultValue={field.value ? "true" : "false"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="true">Active</SelectItem>
                            <SelectItem value="false">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToPreviousTab}
                  >
                    Previous
                  </Button>
                  <Button type="button" onClick={goToNextTab}>
                    Next
                  </Button>
                </div>
              </TabsContent>

              {/* Compensation Tab */}
              <TabsContent value="compensation" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="payroll_class_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payroll Class*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payroll class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {payrollClasses.map((payrollClass) => (
                              <SelectItem
                                key={payrollClass.id}
                                value={payrollClass.id}
                              >
                                {payrollClass.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bank_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select bank" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {banks.map((bank) => (
                              <SelectItem key={bank.id} value={bank.id}>
                                {bank.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bank_account_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Account Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Bank account number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tax_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Tax number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pension_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pension Provider</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || "none"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pension provider" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {pensions.map((pension) => (
                              <SelectItem key={pension.id} value={pension.id}>
                                {pension.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pension_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pension Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Pension number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToPreviousTab}
                  >
                    Previous
                  </Button>
                  <Button type="button" onClick={goToNextTab}>
                    Next
                  </Button>
                </div>
              </TabsContent>

              {/* Next of Kin Tab */}
              <TabsContent value="nextOfKin" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="next_of_kin_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Next of Kin Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Next of kin name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="next_of_kin_relationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship*</FormLabel>
                        <FormControl>
                          <Input placeholder="Relationship" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="next_of_kin_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone*</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="next_of_kin_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToPreviousTab}
                  >
                    Previous
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Employee"
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
