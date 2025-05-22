import { apiRequest } from "./api-client";

// Types based on the actual API response
export interface Employee {
  id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  gender: "MALE" | "FEMALE" | string;
  image_uri: string | null;
  dob: string;
  job_title: string;
  staff_id: number;
  email: string;
  phone: string | null;
  address: string | null;
  city: string;
  state: string;
  country: string;
  next_of_kin: string | null;
  department_id: string;
  department: {
    id: string;
    name: string;
    team_lead_id: string;
    updated_at: string;
    created_at: string;
    description: string | null;
  };
  personal_email: string;
  employment_date: string;
  employment_type_id: string;
  employment_type: {
    name: string;
    id: string;
    created_at: string;
    updated_at: string;
  };
  payroll_class_id: string;
  payroll_class: {
    created_at: string;
    updated_at: string;
    basic_pay: string;
    transport_allowance: string | null;
    health_allowance: string | null;
    name: string;
    id: string;
    housing_allowance: string | null;
    total_allowances: string;
  };
  bank_id: string;
  bank: {
    id: string;
    name: string;
    updated_at: string;
    created_at: string;
  };
  bank_account_number: string | null;
  tax_number: string | null;
  pension_id: string | null;
  pension: string | null;
  pension_number: string | null;
  role: string;
  permissions: Array<any>;
  is_active: boolean;
  attendance?: Array<any>;
  leave_requests?: Array<any>;
}

export interface EmployeeFilters {
  department_id?: string;
  is_active?: boolean;
  search?: string;
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

    // Make the API request
    const queryString = queryParams.toString()
      ? `?${queryParams.toString()}`
      : "";
    const employees = await apiRequest<Employee[]>(`/admin/users/all`);

    return employees;
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
    const employee = await apiRequest<Employee>(`/employees/${id}`);
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
    const employee = await apiRequest<Employee>("/employees", {
      method: "POST",
      body: JSON.stringify(employeeData),
    });
    return employee;
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
    const employee = await apiRequest<Employee>(`/employees/${id}`, {
      method: "PUT",
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
export async function deleteEmployee(id: string): Promise<void> {
  try {
    await apiRequest(`/employees/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error);
    throw error;
  }
}
