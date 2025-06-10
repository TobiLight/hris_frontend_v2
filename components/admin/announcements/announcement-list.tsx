"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { useToast } from "@/components/ui/use-toast"
import { type Announcement, deleteAnnouncement, getAllAnnouncements } from "@/lib/api/announcement-service"
import { format } from "date-fns"
import { MoreHorizontal, Search } from "lucide-react"
import Link from "next/link"

export function AnnouncementList() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true)
        const data = await getAllAnnouncements()
        setAnnouncements(data)
        setFilteredAnnouncements(data)
        setError(null)
      } catch (err) {
        setError("Failed to load announcements. Please try again later.")
        toast({
          title: "Error",
          description: "Failed to load announcements",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnnouncements()
  }, [toast])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredAnnouncements(announcements)
    } else {
      const filtered = announcements.filter(
        (announcement) =>
          announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          announcement.content.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredAnnouncements(filtered)
    }
  }, [searchQuery, announcements])

  const handleDeleteClick = (id: string) => {
    setDeleteId(id)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteId) return

    try {
      await deleteAnnouncement(deleteId)
      setAnnouncements(announcements.filter((announcement) => announcement.id !== deleteId))
      setFilteredAnnouncements(filteredAnnouncements.filter((announcement) => announcement.id !== deleteId))
      toast({
        title: "Success",
        description: "Announcement deleted successfully",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete announcement",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
      setDeleteId(null)
    }
  }

  const isActive = (announcement: Announcement) => {
    const now = new Date()
    const startDate = new Date(announcement.start_date)
    const endDate = new Date(announcement.end_date)
    return announcement.is_active && now >= startDate && now <= endDate
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-full">
            <Input placeholder="Search announcements..." className="w-full" disabled />
          </div>
        </div>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-16 bg-gray-200 rounded"></div>
            </CardContent>
            <CardFooter>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Failed to load announcements</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search announcements..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredAnnouncements.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-40">
            <p className="text-muted-foreground">No announcements found</p>
            <Button asChild className="mt-4">
              <Link href="/admin/announcements/add">Create Announcement</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        filteredAnnouncements.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{announcement.title}</CardTitle>
                  <CardDescription>
                    {format(new Date(announcement.start_date), "MMM d, yyyy")} -{" "}
                    {format(new Date(announcement.end_date), "MMM d, yyyy")}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={isActive(announcement) ? "default" : "outline"}>
                    {isActive(announcement) ? "Active" : "Inactive"}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/announcements/${announcement.id}`}>View</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/announcements/${announcement.id}/edit`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDeleteClick(announcement.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3">{announcement.content}</p>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Last updated: {format(new Date(announcement.updated_at), "MMM d, yyyy")}
            </CardFooter>
          </Card>
        ))
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the announcement.
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
