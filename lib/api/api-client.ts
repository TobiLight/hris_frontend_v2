import { getAccessToken, getCsrfToken } from "@/lib/auth/storage"

interface RequestOptions extends RequestInit {
  requireAuth?: boolean
}

const API_URL = "http://127.0.0.1:8000/api"

/**
 * Makes an API request with authentication headers if required
 * @param endpoint - The API endpoint (without the base URL)
 * @param options - Request options including method, body, headers, etc.
 * @returns A promise that resolves to the response data
 * @throws Error if the request fails
 */
export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { requireAuth = true, ...requestOptions } = options

  // Prepare headers
  const headers = new Headers(requestOptions.headers)

  // Set content type if not already set
  if (!headers.has("Content-Type") && !(requestOptions.body instanceof FormData)) {
    headers.set("Content-Type", "application/json")
  }

  // Add auth headers if required
  if (requireAuth) {
    const accessToken = getAccessToken()
    const csrfToken = getCsrfToken()

    if (!accessToken) {
      throw new Error("Authentication required but no access token found")
    }

    headers.set("Authorization", `Bearer ${accessToken}`)

    if (csrfToken) {
      headers.set("X-CSRF-TOKEN", csrfToken)
    }
  }

  // Make the request
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...requestOptions,
      headers,
      credentials: "include", // Include cookies in the request
    })

    // Handle non-successful responses
    if (!response.ok) {
      // Try to parse error response
      try {
        const errorData = await response.json()
        throw new Error(errorData.message || `Request failed with status: ${response.status}`)
      } catch (e) {
        // If parsing fails, throw generic error with status
        throw new Error(`Request failed with status: ${response.status}`)
      }
    }

    // Parse successful response
    // Check if response is empty
    const text = await response.text()
    const data = text ? JSON.parse(text) : {}

    return data as T
  } catch (error) {
    // Handle network errors or other exceptions
    if (error instanceof Error) {
      throw error
    }
    throw new Error("An unexpected error occurred during the API request")
  }
}
