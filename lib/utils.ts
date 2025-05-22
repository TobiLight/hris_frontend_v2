import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get initials from a name
 * @param name Full name to extract initials from
 * @param limit Maximum number of initials to return (default: 2)
 * @returns String containing the initials
 */
export function getInitials(name: string | null | undefined, limit = 2): string {
  if (!name) return "??"

  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, limit)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("") || "??"
  )
}

/**
 * Format a date to a readable string
 * @param date Date to format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
): string {
  if (!date) return "N/A"

  try {
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date))
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid Date"
  }
}

/**
 * Calculate the difference in days between two dates
 * @param date1 First date
 * @param date2 Second date (defaults to current date)
 * @returns Number of days between the dates
 */
export function daysBetween(date1: Date | string | number, date2: Date | string | number = new Date()): number {
  const d1 = new Date(date1)
  const d2 = new Date(date2)

  // Reset time part for accurate day calculation
  d1.setHours(0, 0, 0, 0)
  d2.setHours(0, 0, 0, 0)

  // Calculate difference in days
  const diffTime = Math.abs(d2.getTime() - d1.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}
