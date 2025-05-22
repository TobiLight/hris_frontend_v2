"use client"

import { useState } from "react"
import Image from "next/image"
import { Camera, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function ProfileHeader() {
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)

  // Mock admin data
  const admin = {
    name: "John Doe",
    email: "john.doe@btm.com",
    role: "System Administrator",
    avatar: "/placeholder.svg?height=100&width=100",
    joinedDate: "January 15, 2022",
  }

  const handleImageUpload = () => {
    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully.",
        variant: "default",
      })
    }, 1500)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image
                src={admin.avatar || "/placeholder.svg"}
                alt={admin.name}
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
            <button
              onClick={handleImageUpload}
              disabled={isUploading}
              className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg opacity-90 hover:opacity-100 transition-opacity"
            >
              {isUploading ? <CheckCircle2 size={18} /> : <Camera size={18} />}
            </button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold">{admin.name}</h1>
            <p className="text-muted-foreground">{admin.email}</p>
            <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {admin.role}
              </span>
              <span className="text-sm text-muted-foreground">Joined {admin.joinedDate}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">Edit Profile</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
