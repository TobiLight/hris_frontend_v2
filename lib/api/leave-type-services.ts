import { get, post, put, del, apiRequest } from "./api-client"

export interface LeaveType {
  id: string
  created_at: string
  updated_at: string
  name: string
  description?: string
  outstanding_days?: number
  start_date?: string
  end_date?: string
  resumption_date?: string
  relieving_staff_id?: string
  supervisor_id?: string
  address_during_leave?: string
  contact_phone?: string
  handover_document_url?: string
  default_days?: number
  is_paid?: boolean
  requires_approval?: boolean
}

export interface CreateLeaveTypeDto {
  leave_type: string
  description?: string
  outstanding_days: number
  start_date: string
  end_date: string
  resumption_date: string
  relieving_staff_id: string
  supervisor_id?: string
  address_during_leave: string
  contact_phone: string
  handover_document?: File
}

export interface UpdateLeaveTypeDto extends Partial<CreateLeaveTypeDto> {
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
 * Creates a new leave request
 */
export async function createLeaveType(data: FormData | CreateLeaveTypeDto): Promise<LeaveType> {
  try {
    const response = await apiRequest<LeaveType>("/api/leave-requests", {
      method: "POST",
      body: JSON.stringify(data)
    })
    return response
  } catch (error) {
    console.error("Error creating leave request:", error)
    throw error
  }
}

/**
 * Updates an existing leave request
 */
export async function updateLeaveType(id: string, data: FormData | UpdateLeaveTypeDto): Promise<LeaveType> {
  try {
    const response = await apiRequest<LeaveType>(`/api/leave-requests/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data)
    })
    return response
  } catch (error) {
    console.error(`Error updating leave request with ID ${id}:`, error)
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
