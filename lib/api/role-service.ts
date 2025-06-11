import { apiRequest } from "./api-client"

export interface Permission {
  id: string
  created_at: string
  updated_at: string
  name: string
  description?: string
}

export interface Role {
  id: string
  created_at: string
  updated_at: string
  name: string
  description?: string
  permissions: Permission[]
  is_active: boolean
}

export interface CreateRoleRequest {
  name: string
  description?: string
  permission_ids: string[]
  is_active: boolean
}

export interface UpdateRoleRequest {
  name: string
  description?: string
  permission_ids: string[]
  is_active: boolean
}

/**
 * Fetch all roles
 */
export async function fetchRoles(): Promise<Role[]> {
  try {
    const response = await apiRequest<Role[]>("/api/roles")
    return response
  } catch (error) {
    console.error("Error fetching roles:", error)
    throw error
  }
}

/**
 * Fetch a single role by ID
 */
export async function fetchRoleById(id: string): Promise<Role> {
  try {
    const response = await apiRequest<Role>(`/api/roles/${id}`)
    return response
  } catch (error) {
    console.error(`Error fetching role ${id}:`, error)
    throw error
  }
}

/**
 * Create a new role
 */
export async function createRole(data: CreateRoleRequest): Promise<Role> {
  try {
    const response = await apiRequest<Role>("/api/roles", {
        method: "POST",
        body: JSON.stringify(data)
    })
    return response
  } catch (error) {
    console.error("Error creating role:", error)
    throw error
  }
}

/**
 * Update an existing role
 */
export async function updateRole(id: string, data: UpdateRoleRequest): Promise<Role> {
  try {
    const response = await apiRequest<Role>(`/api/roles/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data)
    })
    return response
  } catch (error) {
    console.error(`Error updating role ${id}:`, error)
    throw error
  }
}

/**
 * Delete a role
 */
export async function deleteRole(id: string): Promise<boolean> {
  try {
    return await apiRequest(`/api/roles/${id}`)
  } catch (error) {
    console.error(`Error deleting role ${id}:`, error)
    throw error
  }
}

/**
 * Fetch all available permissions
 */
export async function fetchAvailablePermissions(): Promise<Permission[]> {
  try {
    const response = await get<Permission[]>("/api/permissions")
    return response
  } catch (error) {
    console.error("Error fetching permissions:", error)
    throw error
  }
}
