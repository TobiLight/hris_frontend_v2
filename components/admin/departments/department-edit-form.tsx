"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Department,
  fetchDepartmentById,
  updateDepartment,
} from "@/lib/api/department-service";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const departmentFormSchema = z.object({
  // Personal Information
  name: z.string().min(2, "First name must be at least 2 characters"),
  description: z.string().optional(),
  team_lead_id: z.string().optional(),
});

type DepartmentFormValues = z.infer<typeof departmentFormSchema>;

export function DepartmentEditForm({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [department, setDepartment] = useState<Department | undefined>();
  // Initialize form
  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      name: "",
      description: "",
      team_lead_id: "",
    },
  });

  useEffect(() => {
    // Simulate API call to fetch department data
    const fetchDepartment = async () => {
      setLoading(true);

      // Fetch employee data
      try {
        const departmentData = await fetchDepartmentById(id);
        setDepartment(departmentData);
        form.reset({
          name: departmentData.name,
          description: departmentData.description ?? "",
          team_lead_id: departmentData.team_lead_id,
        });
      } catch (error) {
        console.error("Error fetching department data");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (data: DepartmentFormValues) => {
    try {
      setLoading(true);

      // Prepare payload
      const payload = {
        name: data.name,
        description: data.description || null,
        team_lead_id: data.team_lead_id || "",
      };

      // Send update request
      let department = await updateDepartment(id, payload);

      toast({
        title: "Department data updated successfully",
        description: `You have successfully updated ${department.name}'s data`,
      });
      router.push(`/admin/departments/${id}`);
    } catch (error) {
      console.error("Error updating deparmtnet:", error);
      toast({
        title: "Error updating Department data",
        description:
          error instanceof Error
            ? error.message
            : "An unknown error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="additional">Additional Details</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Department name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="team_lead_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department Manager</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={
                                    loading
                                      ? "Loading managers..."
                                      : "Select a manager"
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {loading ? (
                                <div className="flex items-center justify-center p-2">
                                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                  Loading...
                                </div>
                              ) : department &&
                                department?.team_members.length > 0 ? (
                                department?.team_members.map((manager) => (
                                  <SelectItem
                                    key={manager.id}
                                    value={manager.id as string}
                                  >
                                    {manager.first_name} {manager.last_name} -{" "}
                                    {manager.job_title}
                                  </SelectItem>
                                ))
                              ) : (
                                <div className="p-2 text-center text-sm text-gray-500">
                                  No managers available
                                </div>
                              )}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            {department &&
                            department.team_members.length > 0 &&
                            department.team_members.length < 5
                              ? "Only employees with department lead roles are shown"
                              : "This person will be the team lead for the department"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    {/* <Label htmlFor="budget">
                      Budget (USD) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="budget"
                      name="budget"
                      type="number"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                    /> */}
                  </div>

                  {/* <div className="space-y-2">
                    <Label htmlFor="parentDepartment">Parent Department</Label>
                    <Select
                      name="parentDepartment"
                      value={formData.parentDepartment}
                      onValueChange={(value) =>
                        handleSelectChange("parentDepartment", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parent department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">
                          None (Top-level Department)
                        </SelectItem>
                        {parentDepartments
                          .filter((dept) => dept.id.toString() !== id) // Filter out current department
                          .map((dept) => (
                            <SelectItem
                              key={dept.id}
                              value={dept.id.toString()}
                            >
                              {dept.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      Leave empty if this is a top-level department
                    </p>
                  </div> */}

                  <div className="space-y-2 md:col-span-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              id="description"
                              placeholder="Descriotion"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* <TabsContent value="additional">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Department Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Department Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
        </Tabs>

        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/admin/departments/${id}`)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
