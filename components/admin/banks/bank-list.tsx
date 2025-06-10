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

import { fetchBanks, deleteBank, type Bank } from "@/lib/api/bank-service";

export function BankList() {
  const router = useRouter();
  const [banks, setBanks] = useState<Bank[]>([]);
  const [filteredBanks, setFilteredBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bankToDelete, setBankToDelete] = useState<Bank | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadBanks = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBanks();
        setBanks(data);
        setFilteredBanks(data);
      } catch (error) {
        console.error("Error loading banks:", error);
        toast.error("Failed to load banks");
      } finally {
        setIsLoading(false);
      }
    };

    loadBanks();
  }, []);

  useEffect(() => {
    const filtered = banks.filter((bank) =>
      bank.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredBanks(sorted);
  }, [searchQuery, banks, sortOrder]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDeleteClick = (bank: Bank) => {
    setBankToDelete(bank);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!bankToDelete) return;

    try {
      setIsDeleting(true);
      await deleteBank(bankToDelete.id);
      setBanks(banks.filter((bank) => bank.id !== bankToDelete.id));
      toast.success("Bank deleted successfully");
    } catch (error) {
      console.error("Error deleting bank:", error);
      toast.error("Failed to delete bank");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setBankToDelete(null);
    }
  };

  return (
    <>
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Banks
            </h1>
            <p className="text-gray-500">Manage banks for employee payroll</p>
          </div>
          <Button asChild>
            <Link href="/admin/banks/add">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Bank
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Bank List</CardTitle>
            <CardDescription>Overview of all banks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search banks..."
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
            ) : filteredBanks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-muted-foreground mb-2">No banks found</p>
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
                          Bank Name
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBanks.map((bank) => (
                      <TableRow key={bank.id}>
                        <TableCell>{bank.name}</TableCell>
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
                                  router.push(`/admin/banks/${bank.id}/edit`)
                                }
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteClick(bank)}
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

          <AlertDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the bank &quot;
                  {bankToDelete?.name}&quot;. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancel
                </AlertDialogCancel>
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
      </div>
    </>
  );
}
