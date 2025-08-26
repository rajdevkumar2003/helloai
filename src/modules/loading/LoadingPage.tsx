"use client"

import { Loader2 } from "lucide-react"

export default function LoadingPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading, please wait...</p>
      </div>
    </div>
  )
}
