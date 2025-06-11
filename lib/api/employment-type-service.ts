import { apiRequest } from "./api-client"

export interface EmploymentType {
  id: string
  created_at?: string
  updated_at?: string
  name: string
}

/**
 * Fetch all employment types
 */
export async function fetchEmploymentTypes(): Promise<EmploymentType[]> {
  try {
    const employmentTypes = await apiRequest<EmploymentType[]>("/admin/employment-type/all")
    return employmentTypes
  } catch (error) {
    console.error("Error fetching employment types:", error)
    throw error
  }
}

/**
 * Fetch a single employment type by ID
 */
export async function fetchEmploymentTypeById(id: string): Promise<EmploymentType> {
  try {
    const employmentType = await apiRequest<EmploymentType>(`/admin/employment-type/${id}`)
    return employmentType
  } catch (error) {
    console.error(`Error fetching employment type with ID ${id}:`, error)
    throw error
  }
}

/**
 * Create a new employment type
 */
export async function createEmploymentType(data: Partial<EmploymentType>): Promise<EmploymentType> {
  try {
    const employmentType = await apiRequest<EmploymentType>("/admin/employment-type/create", {
      method: "POST",
      body: JSON.stringify(data),
    })
    return employmentType
  } catch (error) {
    console.error("Error creating employment type:", error)
    throw error
  }
}

/**
 * Update an existing employment type
 */
export async function updateEmploymentType(id: string, data: Partial<EmploymentType>): Promise<EmploymentType> {
  try {
    const employmentType = await apiRequest<EmploymentType>(`/admin/employment-type/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
    return employmentType
  } catch (error) {
    console.error(`Error updating employment type with ID ${id}:`, error)
    throw error
  }
}

/**
 * Delete an employment type
 */
export async function deleteEmploymentType(id: string): Promise<boolean> {
  try {
    return await apiRequest<boolean>(`/admin/employment-types/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    console.error(`Error deleting employment type with ID ${id}:`, error)
    throw error
  }
}
