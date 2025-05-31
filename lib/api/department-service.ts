import { apiRequest } from "./api-client";

// Types based on the actual API response
export interface TeamLead {
  first_name: string;
  last_name: string;
  email: string;
  staff_id: number;
  job_title: string;
  image_uri: string | null;
}

export interface NextOfKin {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  phone: string;
  email: string;
  relationship: string;
  user_id: string;
}

export interface Attendance {
  id: string;
  created_at: string;
  updated_at: string;
  status: string;
  total_hours: number;
  clock_in_status: string;
  clock_out_status: string;
  clock_in_date: string;
  clock_in_time: string;
  clock_out_time: string;
  user_id: string;
}

export interface LeaveRequest {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  leave_type_id: string;
  reason: string;
  start_date: string;
  end_date: string;
  allowance: boolean;
  status: string;
}

export interface DepartmentBasic {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string | null;
  team_lead_id: string;
}

export interface EmploymentType {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface PayrollClass {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  basic_pay: number;
  housing_allowance: number | null;
  transport_allowance: number | null;
  health_allowance: number | null;
  total_allowances: number;
}

export interface Bank {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface Pension {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface Role {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface Permission {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface TeamMember {
  id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  gender: string;
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
  next_of_kin: NextOfKin | null;
  attendance: Attendance[];
  leave_requests: LeaveRequest[];
  department_id: string;
  department: DepartmentBasic;
  personal_email: string;
  employment_date: string;
  employment_type_id: string;
  employment_type: EmploymentType;
  payroll_class_id: string;
  payroll_class: PayrollClass;
  bank_id: string;
  bank: Bank;
  bank_account_number: string | null;
  tax_number: string | null;
  pension_id: string | null;
  pension: Pension | null;
  pension_number: string | null;
  role: Role;
  permissions: Permission[];
  is_active: boolean;
}

export interface Department {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string | null;
  team_lead_id: string;
  team_lead: TeamLead;
  team_members: TeamMember[];
}

/**
 * Fetch all departments
 */
export async function fetchDepartments(): Promise<Department[]> {
  try {
    console.log("Fetching departments...");
    const departments = await apiRequest<Department[]>("/department/all", {
      method: "GET",
    });
    console.log(`Fetched ${departments.length} departments:`, departments);
    return departments;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
}

/**
 * Fetch a single department by ID
 */
export async function fetchDepartmentById(id: string): Promise<Department> {
  try {
    console.log(`Fetching department with ID: ${id}`);
    const department = await apiRequest<Department>(`/department/${id}/view`, {
      method: "GET",
    });
    return department;
  } catch (error) {
    console.error(`Error fetching department with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Create a new department
 */
export async function createDepartment(
  departmentData: Partial<Department>
): Promise<Department> {
  try {
    const department = await apiRequest<Department>("/department/create", {
      method: "POST",
      body: JSON.stringify(departmentData),
    });
    return department;
  } catch (error) {
    console.error("Error creating department:", error);
    throw error;
  }
}

/**
 * Update an existing department
 */
export async function updateDepartment(
  id: string,
  departmentData: Partial<Department>
): Promise<Department> {
  try {
    const department = await apiRequest<Department>(`/departments/${id}`, {
      method: "PUT",
      body: JSON.stringify(departmentData),
    });
    return department;
  } catch (error) {
    console.error(`Error updating department with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a department
 */
export async function deleteDepartment(id: string): Promise<void> {
  try {
    await apiRequest(`/departments/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(`Error deleting department with ID ${id}:`, error);
    throw error;
  }
}
