"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { UpcomingBirthday } from "@/lib/api/dashboard-service"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Cake } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getInitials } from "@/lib/utils"

interface UpcomingBirthdaysProps {
  birthdays: UpcomingBirthday[]
  isLoading: boolean
  error: string | null
}

export function UpcomingBirthdays({ birthdays, isLoading, error }: UpcomingBirthdaysProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Cake className="mr-2 h-5 w-5 text-pink-500" />
          Upcoming Birthdays
        </CardTitle>
        <CardDescription>Employees celebrating birthdays soon</CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[160px]" />
                </div>
              </div>
            ))}
          </div>
        ) : birthdays.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center text-center text-muted-foreground">
            <div>
              <Cake className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2">No upcoming birthdays in the next 30 days</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {birthdays.map((birthday) => (
              <div key={birthday.id} className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={birthday.avatar || undefined} alt={birthday.name} />
                  <AvatarFallback>{getInitials(birthday.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{birthday.name}</p>
                  <p className="text-sm text-muted-foreground">{birthday.department}</p>
                  <div className="mt-1 flex items-center">
                    <span className="text-xs font-medium text-pink-500">
                      {formatBirthdayDate(birthday.birthDate)}
                      {birthday.daysUntil === 0
                        ? " (Today)"
                        : birthday.daysUntil === 1
                          ? " (Tomorrow)"
                          : ` (in ${birthday.daysUntil} days)`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function formatBirthdayDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
}
