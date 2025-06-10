"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import {
  type PayrollClass,
  deletePayrollClass,
  formatCurrency,
  getAllPayrollClasses,
} from "@/lib/api/payroll-class-service"
import { format } from "date-fns"
import { Loader2, MoreHorizontal, Search } from "lucide-react"
import Link from "next/link"

export function PayrollClassList() {
  const [payrollClasses, setPayrollClasses] = useState<PayrollClass[]>([])
  const [filteredClasses, setFilteredClasses] = useState<PayrollClass[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchPayrollClasses = async () => {
      try {
        setIsLoading(true)
        const data = await getAllPayrollClasses()
        setPayrollClasses(data)
        setFilteredClasses(data)
        setError(null)
      } catch (err) {
        setError("Failed to load payroll classes. Please try again later.")
        toast({
          title: "Error",
          description: "Failed to load payroll classes",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPayrollClasses()
  }, [toast])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredClasses(payrollClasses)
    } else {
      const filtered = payrollClasses.filter((payrollClass) =>
        payrollClass.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredClasses(filtered)
    }
  }, [searchQuery, payrollClasses])

  const handleDeleteClick = (id: string) => {
    setDeleteId(id)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteId) return

    try {
      await deletePayrollClass(deleteId)
      setPayrollClasses(payrollClasses.filter((payrollClass) => payrollClass.id !== deleteId))
      setFilteredClasses(filteredClasses.filter((payrollClass) => payrollClass.id !== deleteId))
      toast({
        title: "Success",
        description: "Payroll class deleted successfully",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete payroll class",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
      setDeleteId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search payroll classes..." className="w-full pl-8" disabled />
          </div>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="flex justify-center items-center h-60">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading payroll classes...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-destructive">Error</h3>
            <p className="mt-2">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search payroll classes..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {filteredClasses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-60">
              <p className="text-muted-foreground">No payroll classes found</p>
              <Button asChild className="mt-4">
                <Link href="/admin/payroll-classes/add">Create Payroll Class</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Basic Pay</TableHead>
                    <TableHead className="text-right">Housing</TableHead>
                    <TableHead className="text-right">Transport</TableHead>
                    <TableHead className="text-right">Health</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Last Updated</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClasses.map((payrollClass) => (
                    <TableRow key={payrollClass.id}>
                      <TableCell className="font-medium">{payrollClass.name}</TableCell>
                      <TableCell className="text-right">{formatCurrency(payrollClass.basic_pay)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(payrollClass.housing_allowance)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(payrollClass.transport_allowance)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(payrollClass.health_allowance)}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(payrollClass.total_allowances + payrollClass.basic_pay)}
                      </TableCell>
                      <TableCell className="text-right">
                        {format(new Date(payrollClass.updated_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/payroll-classes/${payrollClass.id}/edit`}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeleteClick(payrollClass.id)}
                            >
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
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the payroll class.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
