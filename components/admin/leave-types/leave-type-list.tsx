"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { format } from "date-fns"
import { Loader2, MoreHorizontal, Search } from "lucide-react"
import Link from "next/link"
import { type LeaveType, getAllLeaveTypes, deleteLeaveType } from "@/lib/api/leave-type-services"

export function LeaveTypeList() {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([])
  const [filteredTypes, setFilteredTypes] = useState<LeaveType[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        setIsLoading(true)
        const data = await getAllLeaveTypes()
        setLeaveTypes(data)
        setFilteredTypes(data)
        setError(null)
      } catch (err) {
        setError("Failed to load leave types. Please try again later.")
        toast({
          title: "Error",
          description: "Failed to load leave types",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaveTypes()
  }, [toast])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTypes(leaveTypes)
    } else {
      const filtered = leaveTypes.filter(
        (leaveType) =>
          leaveType.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          leaveType.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredTypes(filtered)
    }
  }, [searchQuery, leaveTypes])

  const handleDeleteClick = (id: string) => {
    setDeleteId(id)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteId) return

    try {
      await deleteLeaveType(deleteId)
      setLeaveTypes(leaveTypes.filter((leaveType) => leaveType.id !== deleteId))
      setFilteredTypes(filteredTypes.filter((leaveType) => leaveType.id !== deleteId))
      toast({
        title: "Success",
        description: "Leave type deleted successfully",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete leave type",
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
            <Input placeholder="Search leave types..." className="w-full pl-8" disabled />
          </div>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="flex justify-center items-center h-60">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading leave types...</span>
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
            placeholder="Search leave types..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {filteredTypes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-60">
              <p className="text-mute-foreground">No leave types found</p>
              <Button asChild className="mt-4">
                <Link href="/admin/leave-types/add">Create Leave Type</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-center">Default Days</TableHead>
                    <TableHead className="text-center">Paid</TableHead>
                    <TableHead className="text-center">Requires Approval</TableHead>
                    <TableHead className="text-right">Last Updated</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTypes.map((leaveType) => (
                    <TableRow key={leaveType.id}>
                      <TableCell className="font-medium">{leaveType.name}</TableCell>
                      <TableCell className="max-w-xs truncate">{leaveType.description}</TableCell>
                      <TableCell className="text-center">{leaveType.default_days}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={leaveType.is_paid ? "default" : "outline"}>
                          {leaveType.is_paid ? "Paid" : "Unpaid"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={leaveType.requires_approval ? "default" : "outline"}>
                          {leaveType.requires_approval ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {format(new Date(leaveType.updated_at), "MMM d, yyyy")}
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
                              <Link href={`/admin/leave-types/${leaveType.id}/edit`}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeleteClick(leaveType.id)}
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
              This action cannot be undone. This will permanently delete the leave type.
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