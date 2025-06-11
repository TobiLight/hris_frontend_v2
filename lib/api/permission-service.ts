import {apiRequest } from "./api-client"

export interface Permission {
  id: string
  created_at: string
  updated_at: string
  name: string
  description?: string
  resource: string
  action: string
  is_active: boolean
}

export interface CreatePermissionRequest {
  name: string
  description?: string
  resource: string
  action: string
  is_active: boolean
}

export interface UpdatePermissionRequest {
  name: string
  description?: string
  resource: string
  action: string
  is_active: boolean
}

/**
 * Fetch all permissions
 */
export async function fetchPermissions(): Promise<Permission[]> {
  try {
    const response = await apiRequest<Permission[]>("/api/permissions")
    return response
  } catch (error) {
    console.error("Error fetching permissions:", error)
    throw error
  }
}

/**
 * Fetch a single permission by ID
 */
export async function fetchPermissionById(id: string): Promise<Permission> {
  try {
    const response = await apiRequest<Permission>(`/api/permissions/${id}`)
    return response
  } catch (error) {
    console.error(`Error fetching permission ${id}:`, error)
    throw error
  }
}

/**
 * Create a new permission
 */
export async function createPermission(data: CreatePermissionRequest): Promise<Permission> {
  try {
    const response = await apiRequest<Permission>("/api/permissions", {
        method: "POST",
        body: JSON.stringify(data)
    })
    return response
  } catch (error) {
    console.error("Error creating permission:", error)
    throw error
  }
}

/**
 * Update an existing permission
 */
export async function updatePermission(id: string, data: UpdatePermissionRequest): Promise<Permission> {
  try {
    const response = await apiRequest<Permission>(`/api/permissions/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data)
    })
    return response
  } catch (error) {
    console.error(`Error updating permission ${id}:`, error)
    throw error
  }
}

/**
 * Delete a permission
 */
export async function deletePermission(id: string): Promise<boolean> {
  try {
    return await apiRequest<boolean>(`/api/permissions/${id}`)
  } catch (error) {
    console.error(`Error deleting permission ${id}:`, error)
    throw error
  }
}

/**
 * Get available resources for permissions
 */
export const PERMISSION_RESOURCES = [
  "users",
  "roles",
  "permissions",
  "departments",
  "employees",
  "attendance",
  "payroll",
  "leave",
  "reports",
  "settings",
  "announcements",
  "banks",
  "employment_types",
  "payroll_classes",
  "leave_types",
] as const

/**
 * Get available actions for permissions
 */
export const PERMISSION_ACTIONS = [
  "create",
  "read",
  "update",
  "delete",
  "manage",
  "approve",
  "reject",
  "export",
  "import",
] as const

export type PermissionResource = (typeof PERMISSION_RESOURCES)[number]
export type PermissionAction = (typeof PERMISSION_ACTIONS)[number]
