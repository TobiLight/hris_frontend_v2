"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SettingsHeader() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast({
        title: "Searching settings",
        description: `Searching for "${searchQuery}"`,
      })
    }
  }

  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-teal-600" />
          <h1 className="text-xl font-semibold">System Settings</h1>
        </div>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search settings..."
              className="w-64 pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Button
            onClick={() => {
              toast({
                title: "Settings saved",
                description: "Your settings have been saved successfully.",
              })
            }}
          >
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
