import { apiRequest } from "./api-client"

export interface Announcement {
  id: string
  created_at: string
  updated_at: string
  title: string
  content: string
  start_date: string
  end_date: string
  is_active: boolean
  created_by: string
}

export interface CreateAnnouncementDto {
  title: string
  content: string
  start_date: string
  end_date: string
  is_active: boolean
}

export interface UpdateAnnouncementDto extends CreateAnnouncementDto {
  id: string
}

/**
 * Fetches all announcements
 */
export async function getAllAnnouncements(): Promise<Announcement[]> {
  try {
    const response = await apiRequest<Announcement[]>("/admin/announcements")
    return response
  } catch (error) {
    console.error("Error fetching announcements:", error)
    throw error
  }
}

/**
 * Fetches a single announcement by ID
 */
export async function getAnnouncementById(id: string): Promise<Announcement> {
  try {
    const response = await apiRequest<Announcement>(`/admin/announcements/${id}`)
    return response
  } catch (error) {
    console.error(`Error fetching announcement with ID ${id}:`, error)
    throw error
  }
}

/**
 * Creates a new announcement
 */
export async function createAnnouncement(data: CreateAnnouncementDto): Promise<Announcement> {
  try {
    const response = await apiRequest<Announcement>("/admin/announcements", {
      method: "POST",
      body: JSON.stringify(data)
    })
    return response
  } catch (error) {
    console.error("Error creating announcement:", error)
    throw error
  }
}

/**
 * Updates an existing announcement
 */
export async function updateAnnouncement(id: string, data: UpdateAnnouncementDto): Promise<Announcement> {
  try {
    const response = await apiRequest<Announcement>(`/admin/announcements/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data)
    })
    return response
  } catch (error) {
    console.error(`Error updating announcement with ID ${id}:`, error)
    throw error
  }
}

/**
 * Deletes an announcement
 */
export async function deleteAnnouncement(id: string): Promise<boolean> {
  try {
    return await apiRequest<boolean>(`/admin/announcements/${id}`)
  } catch (error) {
    console.error(`Error deleting announcement with ID ${id}:`, error)
    throw error
  }
}
