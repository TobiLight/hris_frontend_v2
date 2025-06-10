import { apiRequest } from "./api-client"

export interface Bank {
  id: string
  created_at?: string
  updated_at?: string
  name: string
}

/**
 * Fetch all banks
 */
export async function fetchBanks(): Promise<Bank[]> {
  try {
    const banks = await apiRequest<Bank[]>("/bank/all")
    return banks
  } catch (error) {
    console.error("Error fetching banks:", error)
    throw error
  }
}

/**
 * Fetch a single bank by ID
 */
export async function fetchBankById(id: string): Promise<Bank> {
  try {
    const bank = await apiRequest<Bank>(`/banks/${id}`)
    return bank
  } catch (error) {
    console.error(`Error fetching bank with ID ${id}:`, error)
    throw error
  }
}

/**
 * Create a new bank
 */
export async function createBank(bankData: Partial<Bank>): Promise<Bank> {
  try {
    const bank = await apiRequest<Bank>("/bank/create", {
      method: "POST",
      body: JSON.stringify(bankData),
    })
    return bank
  } catch (error) {
    console.error("Error creating bank:", error)
    throw error
  }
}

/**
 * Update an existing bank
 */
export async function updateBank(id: string, bankData: Partial<Bank>): Promise<Bank> {
  try {
    const bank = await apiRequest<Bank>(`/banks/${id}`, {
      method: "PUT",
      body: bankData,
    })
    return bank
  } catch (error) {
    console.error(`Error updating bank with ID ${id}:`, error)
    throw error
  }
}

/**
 * Delete a bank
 */
export async function deleteBank(id: string): Promise<void> {
  try {
    await apiRequest(`/banks/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    console.error(`Error deleting bank with ID ${id}:`, error)
    throw error
  }
}
