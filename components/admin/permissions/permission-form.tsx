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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  createPermission,
  updatePermission,
  fetchPermissionById,
  PERMISSION_RESOURCES,
  PERMISSION_ACTIONS,
} from "@/lib/api/permission-service";
import { Card, CardContent } from "@/components/ui/card";

const permissionSchema = z.object({
  name: z
    .string()
    .min(1, "Permission name is required")
    .max(100, "Permission name must be less than 100 characters"),
  description: z.string().optional(),
  resource: z.enum(PERMISSION_RESOURCES, {
    required_error: "Please select a resource",
  }),
  action: z.enum(PERMISSION_ACTIONS, {
    required_error: "Please select an action",
  }),
  is_active: z.boolean(),
});

type PermissionFormData = z.infer<typeof permissionSchema>;

interface PermissionFormProps {
  permissionId?: string;
}

export function PermissionForm({ permissionId }: PermissionFormProps) {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!permissionId);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<PermissionFormData>({
    resolver: zodResolver(permissionSchema),
    defaultValues: {
      name: "",
      description: "",
      is_active: true,
    },
  });

  useEffect(() => {
    if (permissionId) {
      loadPermission();
    }
  }, [permissionId]);

  const loadPermission = async () => {
    if (!permissionId) return;

    try {
      setInitialLoading(true);
      const permission = await fetchPermissionById(permissionId);
      form.reset({
        name: permission.name,
        description: permission.description || "",
        resource: permission.resource as any,
        action: permission.action as any,
        is_active: permission.is_active,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load permission data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setInitialLoading(false);
    }
  };

  const onSubmit = async (data: PermissionFormData) => {
    try {
      setLoading(true);

      if (permissionId) {
        await updatePermission(permissionId, data);
        toast({
          title: "Success",
          description: "Permission updated successfully.",
        });
      } else {
        await createPermission(data);
        toast({
          title: "Success",
          description: "Permission created successfully.",
        });
      }

      router.push("/admin/permissions");
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${permissionId ? "update" : "create"} permission. Please try again.`,
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
          <div className="grid grid-cols-2 gap-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
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
                    <FormLabel>Permission Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter permission name" {...field} />
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
                        Enable or disable this permission
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
                      placeholder="Enter permission description (optional)"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="resource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resource *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a resource" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PERMISSION_RESOURCES.map((resource) => (
                          <SelectItem key={resource} value={resource}>
                            {resource.charAt(0).toUpperCase() +
                              resource.slice(1).replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The system resource this permission applies to
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="action"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Action *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an action" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PERMISSION_ACTIONS.map((action) => (
                          <SelectItem key={action} value={action}>
                            {action.charAt(0).toUpperCase() + action.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The action that can be performed on the resource
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : permissionId
                    ? "Update Permission"
                    : "Create Permission"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/permissions")}
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
