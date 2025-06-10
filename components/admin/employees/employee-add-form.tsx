"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import {
  User,
  Briefcase,
  DollarSign,
  FileText,
  HelpCircle,
  Loader2,
  Calendar,
} from "lucide-react";
import {
  createEmployee,
  fetchDepartments,
  fetchEmploymentTypes,
  fetchPayrollClasses,
  fetchBanks,
  fetchPensions,
  fetchRoles,
  fetchPermissions,
  type Department,
  type EmploymentType,
  type PayrollClass,
  type Bank,
  type Pension,
  type Role,
  type Permission,
  NextOfKin,
} from "@/lib/api/employee-service";

// Form schema for personal information
const personalInfoSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  middle_name: z.string().optional(),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(10, { message: "Please enter a valid phone number" })
    .optional(),
  dob: z.string().min(1, { message: "Date of birth is required" }),
  gender: z.enum(["MALE", "FEMALE"], {
    required_error: "Please select a gender",
  }),
  address: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  personal_email: z
    .string()
    .email({ message: "Please enter a valid personal email" }),
  image_uri: z.string().optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Form schema for employment information
const employmentInfoSchema = z.object({
  job_title: z.string().min(1, { message: "Job title is required" }),
  department_id: z.string().min(1, { message: "Department is required" }),
  employment_type_id: z
    .string()
    .min(1, { message: "Employment type is required" }),
  employment_date: z
    .string()
    .min(1, { message: "Employment date is required" }),
  is_active: z.boolean(),
  user_role: z.string().min(1, { message: "Role is required" }),
  user_permissions: z.array(z.string()).optional(),
});

// Form schema for compensation information
const compensationInfoSchema = z.object({
  payroll_class_id: z.string().min(1, { message: "Payroll class is required" }),
  bank_id: z.string().min(1, { message: "Bank is required" }),
  bank_account_number: z.string().optional(),
  tax_number: z.string().optional(),
  pension_id: z.string().optional(),
  pension_number: z.string().optional(),
});

// Form schema for next of kin
const nextOfKinSchema = z.object({
  next_of_kin: z
    .object({
      name: z.string().min(1, { message: "Next of kin name is required" }),
      relationship: z.string().min(1, { message: "Relationship is required" }),
      phone: z
        .string()
        .min(10, { message: "Please enter a valid phone number" }),
      email: z
        .string()
        .email({ message: "Please enter a valid email address" })
        .optional(),
    })
    .optional(),
  // password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Combined schema
const employeeSchema = z.object({
  personalInfo: personalInfoSchema,
  employmentInfo: employmentInfoSchema,
  compensationInfo: compensationInfoSchema,
  nextOfKinInfo: nextOfKinSchema,
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

// Local storage key
const EMPLOYEE_FORM_STORAGE_KEY = "employee_add_form_data";

export function EmployeeAddForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for dropdown options
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<EmploymentType[]>([]);
  const [payrollClasses, setPayrollClasses] = useState<PayrollClass[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [pensions, setPensions] = useState<Pension[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [nextofkin, setNextOfKin] = useState<NextOfKin>();

  // Loading states
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);
  const [isLoadingEmploymentTypes, setIsLoadingEmploymentTypes] =
    useState(false);
  const [isLoadingPayrollClasses, setIsLoadingPayrollClasses] = useState(false);
  const [isLoadingBanks, setIsLoadingBanks] = useState(false);
  const [isLoadingPensions, setIsLoadingPensions] = useState(false);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);
  const [isLoadingPermissions, setIsLoadingPermissions] = useState(false);

  // Error states
  const [departmentsError, setDepartmentsError] = useState<string | null>(null);
  const [employmentTypesError, setEmploymentTypesError] = useState<
    string | null
  >(null);
  const [payrollClassesError, setPayrollClassesError] = useState<string | null>(
    null
  );
  const [banksError, setBanksError] = useState<string | null>(null);
  const [pensionsError, setPensionsError] = useState<string | null>(null);
  const [rolesError, setRolesError] = useState<string | null>(null);
  const [permissionsError, setPermissionsError] = useState<string | null>(null);

  // Default values for the form
  const defaultValues: Partial<EmployeeFormValues> = {
    personalInfo: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      phone: "",
      dob: "",
      gender: "MALE",
      address: "",
      city: "",
      state: "",
      country: "Nigeria",
      personal_email: "",
      password: "",
      image_uri: "",
    },
    employmentInfo: {
      job_title: "",
      department_id: "",
      employment_type_id: "",
      employment_date: "",
      is_active: true,
      user_role: "",
      user_permissions: [],
    },
    compensationInfo: {
      payroll_class_id: "",
      bank_id: "",
      bank_account_number: "",
      tax_number: "",
      pension_id: "",
      pension_number: "",
    },
    nextOfKinInfo: {
      next_of_kin: {
        name: "",
        relationship: "",
        phone: "",
        email: "",
      },
    },
  };

  // Initialize the form
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
    mode: "onChange",
  });

  // Load data from local storage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(EMPLOYEE_FORM_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as Partial<EmployeeFormValues>;
        form.reset(parsedData);
      } catch (error) {
        console.error("Error parsing saved form data:", error);
        localStorage.removeItem(EMPLOYEE_FORM_STORAGE_KEY);
      }
    }
  }, [form]);

  // Save form data to local storage when it changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(EMPLOYEE_FORM_STORAGE_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Fetch departments
  useEffect(() => {
    const loadDepartments = async () => {
      setIsLoadingDepartments(true);
      setDepartmentsError(null);
      try {
        const data = await fetchDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Error loading departments:", error);
        setDepartmentsError("Failed to load departments. Please try again.");
      } finally {
        setIsLoadingDepartments(false);
      }
    };

    loadDepartments();
  }, []);

  // Fetch employment types
  useEffect(() => {
    const loadEmploymentTypes = async () => {
      setIsLoadingEmploymentTypes(true);
      setEmploymentTypesError(null);
      try {
        const data = await fetchEmploymentTypes();
        setEmploymentTypes(data);
      } catch (error) {
        console.error("Error loading employment types:", error);
        setEmploymentTypesError(
          "Failed to load employment types. Please try again."
        );
      } finally {
        setIsLoadingEmploymentTypes(false);
      }
    };

    loadEmploymentTypes();
  }, []);

  // Fetch payroll classes
  useEffect(() => {
    const loadPayrollClasses = async () => {
      setIsLoadingPayrollClasses(true);
      setPayrollClassesError(null);
      try {
        const data = await fetchPayrollClasses();
        setPayrollClasses(data);
      } catch (error) {
        console.error("Error loading payroll classes:", error);
        setPayrollClassesError(
          "Failed to load payroll classes. Please try again."
        );
      } finally {
        setIsLoadingPayrollClasses(false);
      }
    };

    loadPayrollClasses();
  }, []);

  // Fetch banks
  useEffect(() => {
    const loadBanks = async () => {
      setIsLoadingBanks(true);
      setBanksError(null);
      try {
        const data = await fetchBanks();
        setBanks(data);
      } catch (error) {
        console.error("Error loading banks:", error);
        setBanksError("Failed to load banks. Please try again.");
      } finally {
        setIsLoadingBanks(false);
      }
    };

    loadBanks();
  }, []);

  // Fetch pensions
  useEffect(() => {
    const loadPensions = async () => {
      setIsLoadingPensions(true);
      setPensionsError(null);
      try {
        const data = await fetchPensions();
        setPensions(data);
      } catch (error) {
        console.error("Error loading pensions:", error);
        setPensionsError("Failed to load pensions. Please try again.");
      } finally {
        setIsLoadingPensions(false);
      }
    };

    loadPensions();
  }, []);

  // Fetch roles
  useEffect(() => {
    const loadRoles = async () => {
      setIsLoadingRoles(true);
      setRolesError(null);
      try {
        const data = await fetchRoles();
        setRoles(data);
      } catch (error) {
        console.error("Error loading roles:", error);
        setRolesError("Failed to load roles. Please try again.");
      } finally {
        setIsLoadingRoles(false);
      }
    };

    loadRoles();
  }, []);

  // Fetch permissions
  useEffect(() => {
    const loadPermissions = async () => {
      setIsLoadingPermissions(true);
      setPermissionsError(null);
      try {
        const data = await fetchPermissions();
        setPermissions(data);
      } catch (error) {
        console.error("Error loading permissions:", error);
        setPermissionsError("Failed to load permissions. Please try again.");
      } finally {
        setIsLoadingPermissions(false);
      }
    };

    loadPermissions();
  }, []);

  // Handle form submission
  async function onSubmit(data: EmployeeFormValues) {
    setIsSubmitting(true);

    try {
      // Prepare the payload according to the API requirements
      const payload = {
        first_name: data.personalInfo.first_name,
        middle_name: data.personalInfo.middle_name || null,
        last_name: data.personalInfo.last_name,
        gender: data.personalInfo.gender,
        image_uri: data.personalInfo.image_uri || null,
        dob: data.personalInfo.dob,
        job_title: data.employmentInfo.job_title,
        email: data.personalInfo.email,
        phone: data.personalInfo.phone || null,
        address: data.personalInfo.address || null,
        city: data.personalInfo.city,
        state: data.personalInfo.state,
        country: data.personalInfo.country,
        next_of_kin: data.nextOfKinInfo.next_of_kin,
        department_id: data.employmentInfo.department_id,
        personal_email: data.personalInfo.personal_email,
        employment_date: data.employmentInfo.employment_date,
        employment_type_id: data.employmentInfo.employment_type_id,
        payroll_class_id: data.compensationInfo.payroll_class_id,
        bank_id: data.compensationInfo.bank_id,
        bank_account_number: data.compensationInfo.bank_account_number || null,
        tax_number: data.compensationInfo.tax_number || null,
        pension_id: data.compensationInfo.pension_id || null,
        pension_number: data.compensationInfo.pension_number || null,
        is_active: data.employmentInfo.is_active,
        password: data.personalInfo.password,
        user_role: data.employmentInfo.user_role,
        user_permissions: data.employmentInfo.user_permissions || [],
      };

      console.log("Submitting employee data:", payload);

      // Call the API to create the employee
      const response = await createEmployee(payload);

      console.log("Employee created successfully:", response);

      // Clear local storage
      localStorage.removeItem(EMPLOYEE_FORM_STORAGE_KEY);

      // Show success toast
      toast({
        title: "Employee Added Successfully",
        description: `${response.first_name} ${response.last_name} has been added to the system with ID: ${response.id}`,
      });

      localStorage.removeItem("employee_add_form_data");
      form.reset()
      // Redirect to employees page
      router.push("/admin/employees");
    } catch (error) {
      console.error("Error adding employee:", error);

      // Show error toast
      toast({
        title: "Error Adding Employee",
        description:
          error instanceof Error
            ? error.message
            : "An unknown error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle tab navigation
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };


  const handleNext = async () => {
    if (activeTab === "personal") {
      const personalInfoValid = await form.trigger("personalInfo", {
        shouldFocus: true,
      });
      if (personalInfoValid) {
        setActiveTab("employment");
      } else {
        toast({
          title: "Validation Error",
          description:
            "Please fill in all required fields in the Personal Information section.",
          variant: "destructive",
        });
      }
    } else if (activeTab === "employment") {
      const employmentInfoValid = await form.trigger("employmentInfo", {
        shouldFocus: true,
      });
      if (employmentInfoValid) {
        setActiveTab("compensation");
      } else {
        toast({
          title: "Validation Error",
          description:
            "Please fill in all required fields in the Employment Information section.",
          variant: "destructive",
        });
      }
    } else if (activeTab === "compensation") {
      const compensationInfoValid = await form.trigger("compensationInfo", {
        shouldFocus: true,
      });
      if (compensationInfoValid) {
        setActiveTab("nextOfKin");
      } else {
        toast({
          title: "Validation Error",
          description:
            "Please fill in all required fields in the Compensation section.",
          variant: "destructive",
        });
      }
    } else if (activeTab === "nextOfKin") {
      const nextOfKinInfoValid = await form.trigger("nextOfKinInfo", {
        shouldFocus: true,
      });

      if (!nextOfKinInfoValid) {
        toast({
          title: "Validation Error",
          description:
            "Please fill in all required fields in the Compensation section.",
          variant: "destructive",
        });
      }
    }
  };
  // Navigate to previous tab
  const handlePrevious = () => {
    if (activeTab === "employment") {
      setActiveTab("personal");
    } else if (activeTab === "compensation") {
      setActiveTab("employment");
    } else if (activeTab === "nextOfKin") {
      setActiveTab("compensation");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger
                  value="personal"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Personal Info</span>
                </TabsTrigger>
                <TabsTrigger
                  value="employment"
                  className="flex items-center gap-2"
                >
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Employment</span>
                </TabsTrigger>
                <TabsTrigger
                  value="compensation"
                  className="flex items-center gap-2"
                >
                  <DollarSign className="h-4 w-4" />
                  <span className="hidden sm:inline">Compensation</span>
                </TabsTrigger>
                <TabsTrigger
                  value="nextOfKin"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Next of Kin</span>
                </TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Personal Information
                    </h2>
                    <p className="text-sm text-gray-500">
                      Enter the employee's basic personal details
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="personalInfo.first_name"
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
                      name="personalInfo.middle_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Middle Name (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="David" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.last_name"
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
                          <FormLabel>Work Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="john.doe@example.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.personal_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Personal Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="john.doe@gmail.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="personalInfo.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+234 800 123 4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.dob"
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
                  </div>

                  <FormField
                    control={form.control}
                    name="personalInfo.gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
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
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="personalInfo.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="123 Main St, Apt 4B"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="personalInfo.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Lagos" {...field} />
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
                            <Input placeholder="Lagos" {...field} />
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
                            <Input placeholder="Nigeria" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="personalInfo.image_uri"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Image URL (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/profile.jpg"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter a URL for the employee's profile image
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border-t pt-4">
                    <h3 className="text-md font-medium mb-4">Account Setup</h3>
                    <FormField
                      control={form.control}
                      name="personalInfo.password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Initial Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The employee will be prompted to change this
                            password on first login
                          </FormDescription>
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
                    <h2 className="text-xl font-semibold">
                      Employment Information
                    </h2>
                    <p className="text-sm text-gray-500">
                      Enter the employee's job and position details
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="employmentInfo.job_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Senior Travel Consultant"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="employmentInfo.department_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
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
                              {isLoadingDepartments ? (
                                <SelectItem value="loading" disabled>
                                  Loading departments...
                                </SelectItem>
                              ) : departmentsError ? (
                                <SelectItem value="error" disabled>
                                  Error: {departmentsError}
                                </SelectItem>
                              ) : departments.length === 0 ? (
                                <SelectItem value="none" disabled>
                                  No departments available
                                </SelectItem>
                              ) : (
                                departments.map((dept) => (
                                  <SelectItem key={dept.id} value={dept.id}>
                                    {dept.name}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="employmentInfo.employment_type_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employment Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {isLoadingEmploymentTypes ? (
                                <SelectItem value="loading" disabled>
                                  Loading employment types...
                                </SelectItem>
                              ) : employmentTypesError ? (
                                <SelectItem value="error" disabled>
                                  Error: {employmentTypesError}
                                </SelectItem>
                              ) : employmentTypes.length === 0 ? (
                                <SelectItem value="none" disabled>
                                  No employment types available
                                </SelectItem>
                              ) : (
                                employmentTypes.map((type) => (
                                  <SelectItem key={type.id} value={type.id}>
                                    {type.name}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="employmentInfo.employment_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Date</FormLabel>
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
                    name="employmentInfo.is_active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Active Employee</FormLabel>
                          <FormDescription>
                            Is this employee currently active in the
                            organization?
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employmentInfo.user_role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
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
                            {isLoadingRoles ? (
                              <SelectItem value="loading" disabled>
                                Loading roles...
                              </SelectItem>
                            ) : rolesError ? (
                              <SelectItem value="error" disabled>
                                Error: {rolesError}
                              </SelectItem>
                            ) : roles.length === 0 ? (
                              <SelectItem value="none" disabled>
                                No roles available
                              </SelectItem>
                            ) : (
                              roles.map((role) => (
                                <SelectItem key={role.id} value={role.name}>
                                  {role.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employmentInfo.user_permissions"
                    render={({ field }) => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">
                            Permissions
                          </FormLabel>
                          <FormDescription>
                            Select the permissions this employee will have
                          </FormDescription>
                        </div>
                        {isLoadingPermissions ? (
                          <div className="text-sm text-gray-500">
                            Loading permissions...
                          </div>
                        ) : permissionsError ? (
                          <div className="text-sm text-red-500">
                            Error: {permissionsError}
                          </div>
                        ) : permissions.length === 0 ? (
                          <div className="text-sm text-gray-500">
                            No permissions available
                          </div>
                        ) : (
                          <div className="grid gap-2 sm:grid-cols-2">
                            {permissions.map((permission) => (
                              <FormField
                                key={permission.id}
                                control={form.control}
                                name="employmentInfo.user_permissions"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={permission.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(
                                            permission.name
                                          )}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...(field.value || []),
                                                  permission.name,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) =>
                                                      value !== permission.name
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {permission.name}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Compensation Information Tab */}
              <TabsContent value="compensation" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">
                        Compensation & Benefits
                      </h2>
                      <p className="text-sm text-gray-500">
                        Enter the employee's salary and benefits information
                      </p>
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
                            This information is confidential and only accessible
                            to HR and Finance departments
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <FormField
                    control={form.control}
                    name="compensationInfo.payroll_class_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payroll Class</FormLabel>
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
                            {isLoadingPayrollClasses ? (
                              <SelectItem value="loading" disabled>
                                Loading payroll classes...
                              </SelectItem>
                            ) : payrollClassesError ? (
                              <SelectItem value="error" disabled>
                                Error: {payrollClassesError}
                              </SelectItem>
                            ) : payrollClasses.length === 0 ? (
                              <SelectItem value="none" disabled>
                                No payroll classes available
                              </SelectItem>
                            ) : (
                              payrollClasses.map((payrollClass) => (
                                <SelectItem
                                  key={payrollClass.id}
                                  value={payrollClass.id}
                                >
                                  {payrollClass.name} - ₦
                                  {payrollClass.basic_pay.toLocaleString()}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border-t pt-4">
                    <h3 className="text-md font-medium mb-4">
                      Banking Information
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="compensationInfo.bank_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bank</FormLabel>
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
                                {isLoadingBanks ? (
                                  <SelectItem value="loading" disabled>
                                    Loading banks...
                                  </SelectItem>
                                ) : banksError ? (
                                  <SelectItem value="error" disabled>
                                    Error: {banksError}
                                  </SelectItem>
                                ) : banks.length === 0 ? (
                                  <SelectItem value="none" disabled>
                                    No banks available
                                  </SelectItem>
                                ) : (
                                  banks.map((bank) => (
                                    <SelectItem key={bank.id} value={bank.id}>
                                      {bank.name}
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="compensationInfo.bank_account_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Number (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="0123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="compensationInfo.tax_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Number (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tax Identification Number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border-t pt-4">
                    <h3 className="text-md font-medium mb-4">
                      Pension Information
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="compensationInfo.pension_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pension Provider (Optional)</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select pension provider" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {isLoadingPensions ? (
                                  <SelectItem value="loading" disabled>
                                    Loading pension providers...
                                  </SelectItem>
                                ) : pensionsError ? (
                                  <SelectItem value="error" disabled>
                                    Error: {pensionsError}
                                  </SelectItem>
                                ) : pensions.length === 0 ? (
                                  <SelectItem value="none" disabled>
                                    No pension providers available
                                  </SelectItem>
                                ) : (
                                  pensions.map((pension) => (
                                    <SelectItem
                                      key={pension.id}
                                      value={pension.id}
                                    >
                                      {pension.name}
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="compensationInfo.pension_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pension Number (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="PEN123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Next of Kin Tab */}
              <TabsContent value="nextOfKin" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Next of Kin & Account Setup
                    </h2>
                    <p className="text-sm text-gray-500">
                      Enter emergency contact information and set up the
                      employee's account
                    </p>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="text-md font-medium mb-4">
                      Next of Kin Information
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="nextOfKinInfo.next_of_kin.name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nextOfKinInfo.next_of_kin.relationship"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relationship</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Spouse, Parent, etc."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <FormField
                        control={form.control}
                        name="nextOfKinInfo.next_of_kin.phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+234 800 987 6543"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nextOfKinInfo.next_of_kin.email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="jane.doe@example.com"
                                type="email"
                                {...field}
                              />
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

              {activeTab !== "nextOfKin" ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700"
                  disabled={isSubmitting}
                >
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
  );
}
