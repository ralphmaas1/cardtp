"use client"

import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { UserCheck, UserX } from "lucide-react"

export function AuthStatus() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Haal de huidige gebruiker op
    const getUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user || null)
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Luister naar auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return <div className="text-sm text-gray-500">Laden...</div>
  }

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          <UserCheck className="h-4 w-4 text-green-500" />
          <span className="text-sm">
            Ingelogd als <span className="font-medium">{user.email}</span>
          </span>
        </>
      ) : (
        <>
          <UserX className="h-4 w-4 text-red-500" />
          <span className="text-sm">Niet ingelogd</span>
        </>
      )}
    </div>
  )
} 