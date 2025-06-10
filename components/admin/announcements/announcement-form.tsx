"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { createAnnouncement, getAnnouncementById, updateAnnouncement } from "@/lib/api/announcement-service"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const formSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    start_date: z.date({
      required_error: "Start date is required",
    }),
    end_date: z
      .date({
        required_error: "End date is required",
      })
      .refine((date) => date instanceof Date, {
        message: "End date is required",
      }),
    is_active: z.boolean().default(true),
  })
  .refine(
    (data) => {
      return data.end_date >= data.start_date
    },
    {
      message: "End date must be after start date",
      path: ["end_date"],
    },
  )

type FormValues = z.infer<typeof formSchema>

interface AnnouncementFormProps {
  announcementId?: string
}

export function AnnouncementForm({ announcementId }: AnnouncementFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(!!announcementId)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      start_date: new Date(),
      end_date: new Date(),
      is_active: true,
    },
  })

  useEffect(() => {
    if (announcementId) {
      const fetchAnnouncement = async () => {
        try {
          setIsFetching(true)
          const announcement = await getAnnouncementById(announcementId)
          form.reset({
            title: announcement.title,
            content: announcement.content,
            start_date: new Date(announcement.start_date),
            end_date: new Date(announcement.end_date),
            is_active: announcement.is_active,
          })
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load announcement details",
            variant: "destructive",
          })
        } finally {
          setIsFetching(false)
        }
      }

      fetchAnnouncement()
    }
  }, [announcementId, form, toast])

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true)

      if (announcementId) {
        await updateAnnouncement(announcementId, {
          id: announcementId,
          title: data.title,
          content: data.content,
          start_date: data.start_date.toISOString(),
          end_date: data.end_date.toISOString(),
          is_active: data.is_active,
        })
        toast({
          title: "Success",
          description: "Announcement updated successfully",
        })
      } else {
        await createAnnouncement({
          title: data.title,
          content: data.content,
          start_date: data.start_date.toISOString(),
          end_date: data.end_date.toISOString(),
          is_active: data.is_active,
        })
        toast({
          title: "Success",
          description: "Announcement created successfully",
        })
      }

      router.push("/admin/announcements")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: announcementId ? "Failed to update announcement" : "Failed to create announcement",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-60">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading announcement data...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter announcement title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter announcement content" className="min-h-32" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={(date) => date < form.getValues("start_date")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Active</FormLabel>
                    <FormDescription>Make this announcement visible to users</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/announcements")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {announcementId ? "Update Announcement" : "Create Announcement"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
