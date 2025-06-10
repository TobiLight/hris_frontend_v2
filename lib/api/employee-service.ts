import { apiRequest } from "./api-client";

// Types based on the actual API response
export interface NextOfKin {
  id?: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  phone: string;
  email?: string | null;
  relationship: string;
  user_id?: string | null;
}

export interface Department {
  id: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  description?: string;
  team_lead_id?: string;
}

export interface EmploymentType {
  id: string;
  created_at?: string;
  updated_at?: string;
  name: string;
}

export interface PayrollClass {
  id: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  basic_pay: number;
  housing_allowance?: number;
  transport_allowance?: number;
  health_allowance?: number;
  total_allowances: number;
}

export interface Bank {
  id: string;
  created_at?: string;
  updated_at?: string;
  name: string;
}

export interface Pension {
  id: string;
  created_at?: string;
  updated_at?: string;
  name: string;
}

export interface Role {
  id: string;
  created_at?: string;
  updated_at?: string;
  name: string;
}

export interface Permission {
  id: string;
  created_at?: string;
  updated_at?: string;
  name: string;
}

export interface Employee {
  id?: string;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  gender: "MALE" | "FEMALE";
  image_uri?: string | null;
  dob: string;
  job_title: string;
  staff_id?: number;
  email: string;
  phone?: string | null;
  address?: string | null;
  city: string;
  state: string;
  country: string;
  next_of_kin?: NextOfKin | undefined;
  attendance?: Array<any>;
  leave_requests?: Array<any>;
  department_id: string;
  department?: Department;
  personal_email: string;
  employment_date: string;
  employment_type_id: string;
  employment_type?: EmploymentType;
  payroll_class_id: string;
  payroll_class?: PayrollClass;
  bank_id: string;
  bank?: Bank;
  bank_account_number?: string | null;
  tax_number?: string | null;
  pension_id?: string | null;
  pension?: Pension | null;
  pension_number?: string | null;
  role: Role;
  role_id?: string
  permissions?: Array<Permission>;
  is_active: boolean;
  password?: string;
  user_role?: string;
  user_permissions?: Array<string>;
}

export interface EmployeeFilters {
  department_id?: string;
  is_active?: boolean;
  search?: string;
  role?: string;
}

/**
 * Fetch all employees with optional filtering
 */
export async function fetchEmployees(
  filters: EmployeeFilters = {}
): Promise<Employee[]> {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams();

    if (filters.department_id && filters.department_id !== "all") {
      queryParams.append("department_id", filters.department_id);
    }

    if (filters.is_active !== undefined) {
      queryParams.append("is_active", filters.is_active.toString());
    }

    if (filters.search) {
      queryParams.append("search", filters.search);
    }

    if (filters.role) {
      queryParams.append("role", filters.role);
    }

    // Make the API request
    const queryString = queryParams.toString()
      ? `?${queryParams.toString()}`
      : "";

    // For debugging
    console.log(`Fetching employees with query: /employees${queryString}`);

    const response = await apiRequest<Employee[]>(`/admin/users/all`);

    // For debugging
    console.log("API response:", response);

    // Ensure we have an array
    if (!Array.isArray(response)) {
      console.error("API did not return an array:", response);
      return [];
    }

    return response;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
}

/**
 * Fetch a single employee by ID
 */
export async function fetchEmployeeById(id: string): Promise<Employee> {
  try {
    const employee = await apiRequest<Employee>(`/admin/employee/${id}/view`);
    return employee;
  } catch (error) {
    console.error(`Error fetching employee with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Create a new employee
 */
export async function createEmployee(
  employeeData: Partial<Employee>
): Promise<Employee> {
  try {
    console.log("Creating employee with data:", employeeData);
    const employee = await apiRequest<{message: string, data: Employee}>("/admin/create/employee", {
      method: "POST",
      body: JSON.stringify(employeeData),
    });

    console.log("Employee created successfully:", employee);
    
    return employee.data;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
}

/**
 * Update an existing employee
 */
export async function updateEmployee(
  id: string,
  employeeData: Partial<Employee>
): Promise<Employee> {
  try {
    const employee = await apiRequest<Employee>(`/admin/employee/${id}/edit`, {
      method: "PATCH",
      body: JSON.stringify(employeeData),
    });
    return employee;
  } catch (error) {
    console.error(`Error updating employee with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Delete an employee
 */
export async function deleteEmployee(id: string): Promise<boolean> {
  try {
    return await apiRequest<boolean>(`/admin/employee/${id}/delete`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Activate an employee profile
 */
export async function activateEmployee(id: string): Promise<Employee> {
  try {
    const user = await apiRequest<Employee>(`/admin/employee/${id}/activate`, {
      method: "POST",
    });

    return user
  } catch (error) {
    console.error(`Error deactivating employee with ID ${id}:`, error);
    throw error;
  }
}


/**
 * Deactivate an employee profile
 */
export async function deactivateEmployee(id: string): Promise<Employee> {
  try {
    const user = await apiRequest<Employee>(`/admin/employee/${id}/deactivate`, {
      method: "POST",
    });

    return user
  } catch (error) {
    console.error(`Error deactivating employee with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch all departments
 */
export async function fetchDepartments(): Promise<Department[]> {
  try {
    const departments = await apiRequest<Department[]>("/department/all");
    return departments;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
}

/**
 * Fetch all employment types
 */
export async function fetchEmploymentTypes(): Promise<EmploymentType[]> {
  try {
    const employmentTypes = await apiRequest<EmploymentType[]>(
      "/admin/employment-type/all"
    );
    return employmentTypes;
  } catch (error) {
    console.error("Error fetching employment types:", error);
    throw error;
  }
}

/**
 * Fetch all payroll classes
 */
export async function fetchPayrollClasses(): Promise<PayrollClass[]> {
  try {
    const payrollClasses = await apiRequest<PayrollClass[]>("/payroll/all");
    return payrollClasses;
  } catch (error) {
    console.error("Error fetching payroll classes:", error);
    throw error;
  }
}

/**
 * Fetch all banks
 */
export async function fetchBanks(): Promise<Bank[]> {
  try {
    const banks = await apiRequest<Bank[]>("/bank/all");
    return banks;
  } catch (error) {
    console.error("Error fetching banks:", error);
    throw error;
  }
}

/**
 * Fetch all pensions
 */
export async function fetchPensions(): Promise<Pension[]> {
  try {
    const pensions = await apiRequest<Pension[]>("/pension/all");
    return pensions;
  } catch (error) {
    console.error("Error fetching pensions:", error);
    throw error;
  }
}

/**
 * Fetch all roles
 */
export async function fetchRoles(): Promise<Role[]> {
  try {
    const roles = await apiRequest<Role[]>("/role/all");
    return roles;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
}

/**
 * Fetch all permissions
 */
export async function fetchPermissions(): Promise<Permission[]> {
  try {
    const permissions = await apiRequest<Permission[]>("/permission/all");
    return permissions;
  } catch (error) {
    console.error("Error fetching permissions:", error);
    throw error;
  }
}

