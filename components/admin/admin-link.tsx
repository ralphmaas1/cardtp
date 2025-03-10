"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import Link from "next/link"

export function AdminLink() {
  const { isAdmin, isLoading } = useAuth()

  if (isLoading || !isAdmin) return null

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button asChild variant="default" className="bg-purple-600 hover:bg-purple-700">
        <Link href="/admin" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Admin Dashboard</span>
        </Link>
      </Button>
    </div>
  )
}

