import {  apiRequest } from "./api-client"

export interface LeaveType {
  id: string
  created_at: string
  updated_at: string
  name: string
  description: string
  default_days: number
  is_paid: boolean
  requires_approval: boolean
}

export interface CreateLeaveTypeDto {
  name: string
  description: string
  default_days: number
  is_paid: boolean
  requires_approval: boolean
}

export interface UpdateLeaveTypeDto extends CreateLeaveTypeDto {
  id: string
}

/**
 * Fetches all leave types
 */
export async function getAllLeaveTypes(): Promise<LeaveType[]> {
  try {
    const response = await apiRequest<LeaveType[]>("/api/leave-types")
    return response
  } catch (error) {
    console.error("Error fetching leave types:", error)
    throw error
  }
}

/**
 * Fetches a single leave type by ID
 */
export async function getLeaveTypeById(id: string): Promise<LeaveType> {
  try {
    const response = await apiRequest<LeaveType>(`/api/leave-types/${id}`)
    return response
  } catch (error) {
    console.error(`Error fetching leave type with ID ${id}:`, error)
    throw error
  }
}

/**
 * Creates a new leave type
 */
export async function createLeaveType(data: CreateLeaveTypeDto): Promise<LeaveType> {
  try {
    const response = await apiRequest<LeaveType>("/api/leave-types", {
        method: "POST",
        body: JSON.stringify(data)
    })
    return response
  } catch (error) {
    console.error("Error creating leave type:", error)
    throw error
  }
}

/**
 * Updates an existing leave type
 */
export async function updateLeaveType(id: string, data: UpdateLeaveTypeDto): Promise<LeaveType> {
  try {
    const response = await apiRequest<LeaveType>(`/api/leave-types/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data)
    })
    return response
  } catch (error) {
    console.error(`Error updating leave type with ID ${id}:`, error)
    throw error
  }
}

/**
 * Deletes a leave type
 */
export async function deleteLeaveType(id: string): Promise<boolean> {
  try {
    return await apiRequest(`/api/leave-types/${id}`)
  } catch (error) {
    console.error(`Error deleting leave type with ID ${id}:`, error)
    throw error
  }
}
