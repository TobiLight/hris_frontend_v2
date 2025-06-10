"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  Loader2,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  fetchEmploymentTypes,
  deleteEmploymentType,
  type EmploymentType,
} from "@/lib/api/employment-type-service";

export function EmploymentTypeList() {
  const router = useRouter();
  const [employmentTypes, setEmploymentTypes] = useState<EmploymentType[]>([]);
  const [filteredTypes, setFilteredTypes] = useState<EmploymentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState<EmploymentType | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadEmploymentTypes = async () => {
      try {
        setIsLoading(true);
        const data = await fetchEmploymentTypes();
        setEmploymentTypes(data);
        setFilteredTypes(data);
      } catch (error) {
        console.error("Error loading employment types:", error);
        toast.error("Failed to load employment types");
      } finally {
        setIsLoading(false);
      }
    };

    loadEmploymentTypes();
  }, []);

  useEffect(() => {
    const filtered = employmentTypes.filter((type) =>
      type.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredTypes(sorted);
  }, [searchQuery, employmentTypes, sortOrder]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDeleteClick = (type: EmploymentType) => {
    setTypeToDelete(type);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!typeToDelete) return;

    try {
      setIsDeleting(true);
      await deleteEmploymentType(typeToDelete.id);
      setEmploymentTypes(
        employmentTypes.filter((type) => type.id !== typeToDelete.id)
      );
      toast.success("Employment type deleted successfully");
    } catch (error) {
      console.error("Error deleting employment type:", error);
      toast.error("Failed to delete employment type");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setTypeToDelete(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employment Types List</CardTitle>
        <CardDescription>
          Overview of employment types for employees
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search employment types..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredTypes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-muted-foreground mb-2">
              No employment types found
            </p>
            {searchQuery && (
              <p className="text-sm text-muted-foreground">
                Try adjusting your search query
              </p>
            )}
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80%]">
                    <Button
                      variant="ghost"
                      onClick={toggleSortOrder}
                      className="flex items-center p-0 hover:bg-transparent"
                    >
                      Employment Type
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTypes.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell>{type.name}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ChevronDown className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/admin/employment-types/${type.id}/edit`
                              )
                            }
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(type)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the employment type &quot;
              {typeToDelete?.name}&quot;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
