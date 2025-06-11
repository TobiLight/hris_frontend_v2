"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { fetchRoles, deleteRole, type Role } from "@/lib/api/role-service"

export function RoleList() {
  const [roles, setRoles] = useState<Role[]>([])
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadRoles()
  }, [])

  useEffect(() => {
    const filtered = roles.filter(
      (role) =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (role.description && role.description.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredRoles(filtered)
  }, [roles, searchTerm])

  const loadRoles = async () => {
    try {
      setLoading(true)
      const data = await fetchRoles()
      setRoles(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load roles. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    try {
      setDeleteLoading(id)
      await deleteRole(id)
      setRoles(roles.filter((role) => role.id !== id))
      toast({
        title: "Success",
        description: `Role "${name}" has been deleted successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete role. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-48"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredRoles.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No roles found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? "No roles match your search criteria." : "Get started by creating your first role."}
            </p>
            {!searchTerm && (
              <Button asChild>
                <Link href="/admin/roles/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Role
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredRoles.map((role) => (
            <Card key={role.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                      <Badge variant={role.is_active ? "default" : "secondary"}>
                        {role.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    {role.description && <p className="text-gray-600 mb-3">{role.description}</p>}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4" />
                        <span>{role.permissions.length} permissions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Created {new Date(role.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/roles/${role.id}`}>View</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/roles/${role.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" disabled={deleteLoading === role.id}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Role</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the role "{role.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(role.id, role.name)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
