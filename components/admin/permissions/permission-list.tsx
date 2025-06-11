"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Key, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import {
  fetchPermissions,
  deletePermission,
  type Permission,
  PERMISSION_RESOURCES,
  PERMISSION_ACTIONS,
} from "@/lib/api/permission-service"

export function PermissionList() {
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [filteredPermissions, setFilteredPermissions] = useState<Permission[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [resourceFilter, setResourceFilter] = useState<string>("all")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadPermissions()
  }, [])

  useEffect(() => {
    let filtered = permissions.filter(
      (permission) =>
        permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (permission.description && permission.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        permission.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permission.action.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (resourceFilter !== "all") {
      filtered = filtered.filter((permission) => permission.resource === resourceFilter)
    }

    if (actionFilter !== "all") {
      filtered = filtered.filter((permission) => permission.action === actionFilter)
    }

    setFilteredPermissions(filtered)
  }, [permissions, searchTerm, resourceFilter, actionFilter])

  const loadPermissions = async () => {
    try {
      setLoading(true)
      const data = await fetchPermissions()
      setPermissions(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load permissions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    try {
      setDeleteLoading(id)
      await deletePermission(id)
      setPermissions(permissions.filter((permission) => permission.id !== id))
      toast({
        title: "Success",
        description: `Permission "${name}" has been deleted successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete permission. Please try again.",
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
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search permissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={resourceFilter} onValueChange={setResourceFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by resource" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Resources</SelectItem>
              {PERMISSION_RESOURCES.map((resource) => (
                <SelectItem key={resource} value={resource}>
                  {resource.charAt(0).toUpperCase() + resource.slice(1).replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              {PERMISSION_ACTIONS.map((action) => (
                <SelectItem key={action} value={action}>
                  {action.charAt(0).toUpperCase() + action.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredPermissions.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No permissions found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || resourceFilter !== "all" || actionFilter !== "all"
                ? "No permissions match your search criteria."
                : "Get started by creating your first permission."}
            </p>
            {!searchTerm && resourceFilter === "all" && actionFilter === "all" && (
              <Button asChild>
                <Link href="/admin/permissions/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Permission
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredPermissions.map((permission) => (
            <Card key={permission.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{permission.name}</h3>
                      <Badge variant={permission.is_active ? "default" : "secondary"}>
                        {permission.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    {permission.description && <p className="text-gray-600 mb-3">{permission.description}</p>}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4" />
                        <span>{permission.resource}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Key className="h-4 w-4" />
                        <span>{permission.action}</span>
                      </div>
                      <span>Created {new Date(permission.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/permissions/${permission.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" disabled={deleteLoading === permission.id}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Permission</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the permission "{permission.name}"? This action cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(permission.id, permission.name)}
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
