"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Search, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type AdminUser = {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  lastLogin: string
}

export function UserManagement() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "admin",
    sendInvite: true,
  })

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@btms.com",
      role: "Super Admin",
      status: "active",
      lastLogin: "2023-05-01 09:30 AM",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@btms.com",
      role: "HR Admin",
      status: "active",
      lastLogin: "2023-05-02 10:15 AM",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@btms.com",
      role: "Payroll Admin",
      status: "inactive",
      lastLogin: "2023-04-28 02:45 PM",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@btms.com",
      role: "HR Admin",
      status: "active",
      lastLogin: "2023-05-03 11:20 AM",
    },
  ])

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setNewUser((prev) => ({ ...prev, role: value }))
  }

  const handleSendInviteChange = (checked: boolean) => {
    setNewUser((prev) => ({ ...prev, sendInvite: checked }))
  }

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newId = (adminUsers.length + 1).toString()
    const currentDate = new Date().toLocaleString()

    setAdminUsers((prev) => [
      ...prev,
      {
        id: newId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: "active",
        lastLogin: "Never",
      },
    ])

    toast({
      title: "User added successfully",
      description: `${newUser.name} has been added as ${newUser.role}.`,
    })

    if (newUser.sendInvite) {
      toast({
        title: "Invitation sent",
        description: `An invitation email has been sent to ${newUser.email}.`,
      })
    }

    setNewUser({
      name: "",
      email: "",
      role: "admin",
      sendInvite: true,
    })

    setIsAddUserOpen(false)
  }

  const handleDeleteUser = (userId: string) => {
    const userToDelete = adminUsers.find((user) => user.id === userId)

    setAdminUsers((prev) => prev.filter((user) => user.id !== userId))

    toast({
      title: "User deleted",
      description: `${userToDelete?.name} has been removed from the system.`,
    })
  }

  const filteredUsers = adminUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>Manage administrator accounts and permissions</CardDescription>
            </div>
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Admin User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Admin User</DialogTitle>
                  <DialogDescription>Create a new administrator account with specific permissions.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter full name"
                      value={newUser.name}
                      onChange={handleNewUserChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email address"
                      value={newUser.email}
                      onChange={handleNewUserChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={newUser.role} onValueChange={handleRoleChange}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Super Admin">Super Admin</SelectItem>
                        <SelectItem value="HR Admin">HR Admin</SelectItem>
                        <SelectItem value="Payroll Admin">Payroll Admin</SelectItem>
                        <SelectItem value="Department Admin">Department Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="send-invite" checked={newUser.sendInvite} onCheckedChange={handleSendInviteChange} />
                    <Label htmlFor="send-invite">Send invitation email</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddUser}>Add User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?text=${user.name.charAt(0)}`} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  toast({
                                    title: "Edit user",
                                    description: `Editing ${user.name}'s profile.`,
                                  })
                                }}
                              >
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  toast({
                                    title: "Reset password",
                                    description: `Password reset email sent to ${user.email}.`,
                                  })
                                }}
                              >
                                Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 focus:text-red-600"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>Configure access levels and permissions for each role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Departments</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Payroll</TableHead>
                    <TableHead>Settings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Super Admin</TableCell>
                    <TableCell>Full Access</TableCell>
                    <TableCell>Full Access</TableCell>
                    <TableCell>Full Access</TableCell>
                    <TableCell>Full Access</TableCell>
                    <TableCell>Full Access</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">HR Admin</TableCell>
                    <TableCell>Full Access</TableCell>
                    <TableCell>Full Access</TableCell>
                    <TableCell>Full Access</TableCell>
                    <TableCell>View Only</TableCell>
                    <TableCell>Limited</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Payroll Admin</TableCell>
                    <TableCell>View Only</TableCell>
                    <TableCell>View Only</TableCell>
                    <TableCell>Full Access</TableCell>
                    <TableCell>Full Access</TableCell>
                    <TableCell>Limited</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Department Admin</TableCell>
                    <TableCell>Limited</TableCell>
                    <TableCell>Limited</TableCell>
                    <TableCell>Limited</TableCell>
                    <TableCell>No Access</TableCell>
                    <TableCell>No Access</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              toast({
                title: "Permissions updated",
                description: "Role permissions have been updated successfully.",
              })
            }}
          >
            Update Permissions
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
