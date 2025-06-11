"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  createRole,
  updateRole,
  fetchRoleById,
  fetchAvailablePermissions,
  type Permission,
} from "@/lib/api/role-service";

const roleSchema = z.object({
  name: z
    .string()
    .min(1, "Role name is required")
    .max(100, "Role name must be less than 100 characters"),
  description: z.string().optional(),
  permission_ids: z
    .array(z.string())
    .min(1, "At least one permission must be selected"),
  is_active: z.boolean(),
});

type RoleFormData = z.infer<typeof roleSchema>;

interface RoleFormProps {
  roleId?: string;
}

export function RoleForm({ roleId }: RoleFormProps) {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!roleId);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
      permission_ids: [],
      is_active: true,
    },
  });

  useEffect(() => {
    loadPermissions();
    if (roleId) {
      loadRole();
    }
  }, [roleId]);

  const loadPermissions = async () => {
    try {
      const data = await fetchAvailablePermissions();
      setPermissions(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load permissions. Please try again.",
        variant: "destructive",
      });
    }
  };

  const loadRole = async () => {
    if (!roleId) return;

    try {
      setInitialLoading(true);
      const role = await fetchRoleById(roleId);
      form.reset({
        name: role.name,
        description: role.description || "",
        permission_ids: role.permissions.map((p) => p.id),
        is_active: role.is_active,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load role data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setInitialLoading(false);
    }
  };

  const onSubmit = async (data: RoleFormData) => {
    try {
      setLoading(true);

      if (roleId) {
        await updateRole(roleId, data);
        toast({
          title: "Success",
          description: "Role updated successfully.",
        });
      } else {
        await createRole(data);
        toast({
          title: "Success",
          description: "Role created successfully.",
        });
      }

      router.push("/admin/roles");
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${roleId ? "update" : "create"} role. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter role name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active Status</FormLabel>
                      <FormDescription>
                        Enable or disable this role
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter role description (optional)"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="permission_ids"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Permissions *</FormLabel>
                    <FormDescription>
                      Select the permissions to assign to this role
                    </FormDescription>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Available Permissions
                      </CardTitle>
                      <CardDescription>
                        Choose which permissions this role should have
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {permissions.map((permission) => (
                          <FormField
                            key={permission.id}
                            control={form.control}
                            name="permission_ids"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={permission.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        permission.id
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              permission.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) =>
                                                  value !== permission.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    <div>
                                      <div className="font-medium">
                                        {permission.name}
                                      </div>
                                      {permission.description && (
                                        <div className="text-xs text-muted-foreground">
                                          {permission.description}
                                        </div>
                                      )}
                                    </div>
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : roleId ? "Update Role" : "Create Role"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/roles")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
