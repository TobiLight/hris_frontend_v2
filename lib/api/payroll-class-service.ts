import { apiRequest } from "./api-client"

export interface PayrollClass {
  id: string
  created_at: string
  updated_at: string
  name: string
  basic_pay: number
  housing_allowance: number
  transport_allowance: number
  health_allowance: number
  total_allowances: number
}

export interface CreatePayrollClassDto {
  name: string
  basic_pay: number
  housing_allowance: number
  transport_allowance: number
  health_allowance: number
}

export interface UpdatePayrollClassDto extends CreatePayrollClassDto {
  id: string
}

/**
 * Fetches all payroll classes
 */
export async function getAllPayrollClasses(): Promise<PayrollClass[]> {
  try {
    const response = await apiRequest<PayrollClass[]>("/payroll/all")
    return response
  } catch (error) {
    console.error("Error fetching payroll classes:", error)
    throw error
  }
}

/**
 * Fetches a single payroll class by ID
 */
export async function getPayrollClassById(id: string): Promise<PayrollClass> {
  try {
    const response = await apiRequest<PayrollClass>(`/admin/payroll-classes/${id}`)
    return response
  } catch (error) {
    console.error(`Error fetching payroll class with ID ${id}:`, error)
    throw error
  }
}

/**
 * Creates a new payroll class
 */
export async function createPayrollClass(data: CreatePayrollClassDto): Promise<PayrollClass> {
  try {
    const response = await apiRequest<PayrollClass>("/admin/payroll-classes", {
        method: "POST",
        body: JSON.stringify(data)
    })
    return response
  } catch (error) {
    console.error("Error creating payroll class:", error)
    throw error
  }
}

/**
 * Updates an existing payroll class
 */
export async function updatePayrollClass(id: string, data: UpdatePayrollClassDto): Promise<PayrollClass> {
  try {
    const response = await apiRequest<PayrollClass>(`/admin/payroll-classes/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data)
    })
    return response
  } catch (error) {
    console.error(`Error updating payroll class with ID ${id}:`, error)
    throw error
  }
}

/**
 * Deletes a payroll class
 */
export async function deletePayrollClass(id: string): Promise<boolean> {
  try {
    return await apiRequest<boolean>(`/admin/payroll-classes/${id}`)
  } catch (error) {
    console.error(`Error deleting payroll class with ID ${id}:`, error)
    throw error
  }
}

/**
 * Formats currency values
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount)
}
