"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface EmployeeContextType {
  viewType: "table" | "grid"
  setViewType: (type: "table" | "grid") => void
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined)

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [viewType, setViewType] = useState<"table" | "grid">("table")

  return (
    <EmployeeContext.Provider
      value={{
        viewType,
        setViewType,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  )
}

export function useEmployeeContext() {
  const context = useContext(EmployeeContext)
  if (context === undefined) {
    throw new Error("useEmployeeContext must be used within an EmployeeProvider")
  }
  return context
}
