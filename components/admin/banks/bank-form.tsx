"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { fetchBankById, createBank, updateBank } from "@/lib/api/bank-service"
import { toast } from "@/hooks/use-toast"

// Form schema
const bankFormSchema = z.object({
  name: z.string().min(2, "Bank name must be at least 2 characters"),
})

type BankFormValues = z.infer<typeof bankFormSchema>

interface BankFormProps {
  bankId?: string
}

export function BankForm({ bankId }: BankFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(!!bankId)

  // Initialize form
  const form = useForm<BankFormValues>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: {
      name: "",
    },
  })

  // Fetch bank data if editing
  useEffect(() => {
    const fetchBank = async () => {
      if (!bankId) return

      try {
        setIsFetching(true)
        const bank = await fetchBankById(bankId)
        form.reset({
          name: bank.name,
        })
      } catch (error) {
        console.error("Error fetching bank:", error)
        toast({
          title: "Failed to load bank data",
          description: "An error occured while loading bank data",
          variant: "destructive"
        })
      } finally {
        setIsFetching(false)
      }
    }

    fetchBank()
  }, [bankId, form])

  // Handle form submission
  const onSubmit = async (data: BankFormValues) => {
    try {
      setIsLoading(true)

      if (bankId) {
        // Update existing bank
        let bank = await updateBank(bankId, data)
        toast({
          title: "Bank updated successfully",
          description: `You have updated Bank name from ${data.name} to ${bank.name}`
        })
      } else {
        // Create new bank
        let newBank = await createBank(data)
        toast({
          title: "Bank created successfully",
          description: `You have created a new bank: ${newBank.name}`
        })
      }

      router.push("/admin/banks")
    } catch (error) {
      console.error("Error saving bank:", error)
      toast({
        title: bankId ? "Failed to update bank" : "Failed to create bank",
        description: bankId ? "An error occured while trying to update bank" : "An error occured while trying to create bank"
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading bank data...</span>
      </div>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter bank name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/banks")} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {bankId ? "Updating..." : "Creating..."}
                  </>
                ) : bankId ? (
                  "Update Bank"
                ) : (
                  "Create Bank"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
