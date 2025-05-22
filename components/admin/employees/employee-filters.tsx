"use client";

import { Search, LayoutGrid, LayoutList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEmployeeContext } from "./employee-context";
import { useEffect, useState } from "react";

interface EmployeeFiltersProps {
  onFilterChange: (filters: any) => void;
  currentFilters: {
    department_id?: string;
    is_active?: boolean;
    search?: string;
  };
}

export function EmployeeFilters({
  onFilterChange,
  currentFilters,
}: EmployeeFiltersProps) {
  const { viewType, setViewType } = useEmployeeContext();
  const [searchValue, setSearchValue] = useState(currentFilters.search || "");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== currentFilters.search) {
        onFilterChange({ search: searchValue });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, onFilterChange, currentFilters.search]);

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search employees..."
            className="pl-8"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <Select
          value={currentFilters.department_id || "all"}
          onValueChange={(value) => onFilterChange({ department_id: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Engineering">
              Information Technology & MIS
            </SelectItem>
            <SelectItem value="Marketing">Account</SelectItem>
            <SelectItem value="Human Resources & Admin">Human Resources & Admin</SelectItem>
            <SelectItem value="Corporate Sales">Sourcing</SelectItem>
            <SelectItem value="Operations">Corporate Sales</SelectItem>
            <SelectItem value="Retail">Retail</SelectItem>
            <SelectItem value="Channel">Channel</SelectItem>
            <SelectItem value="Sourcing">Operations</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={
            currentFilters.is_active === undefined
              ? "all"
              : currentFilters.is_active
                ? "active"
                : "inactive"
          }
          onValueChange={(value) => {
            let is_active;
            if (value === "active") is_active = true;
            else if (value === "inactive") is_active = false;
            else is_active = undefined;

            onFilterChange({ is_active });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setViewType("grid")}
          className={viewType === "grid" ? "bg-gray-100" : ""}
        >
          <LayoutGrid className="h-4 w-4" />
          <span className="sr-only">Grid view</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setViewType("table")}
          className={viewType === "table" ? "bg-gray-100" : ""}
        >
          <LayoutList className="h-4 w-4" />
          <span className="sr-only">List view</span>
        </Button>
      </div>
    </div>
  );
}
