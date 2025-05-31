// Utility functions for securely storing and retrieving authentication tokens

// Constants for storage keys
const ACCESS_TOKEN_KEY = "hrms_access_token";
const CSRF_TOKEN_KEY = "hrms_csrf_token";
const USER_KEY = "hrms_user";

// Interface for user data
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  image_uri: string | null
  role: {id: string, name: string};
  // Add other user properties as needed
}

// Store access token in localStorage with expiration
export const setAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

// Get access token from localStorage
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

// Store CSRF token in localStorage
export const setCsrfToken = (token: string): void => {
  localStorage.setItem(CSRF_TOKEN_KEY, token);
};

// Get CSRF token from localStorage
export const getCsrfToken = (): string | null => {
  return localStorage.getItem(CSRF_TOKEN_KEY);
};

// Store user data in localStorage
export const setUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Get user data from localStorage
export const getUser = (): User | null => {
  const userData = localStorage.getItem(USER_KEY);
  if (!userData) return null;

  try {
    return JSON.parse(userData) as User;
  } catch (error) {
    console.error("Failed to parse user data:", error);
    return null;
  }
};

// Clear all auth data from localStorage
export const clearAuthData = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(CSRF_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
