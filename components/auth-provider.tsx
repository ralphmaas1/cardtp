"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAdmin: false,
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    async function getUser() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setUser(session?.user || null)

        if (session?.user) {
          // Check if user is admin
          const { data, error } = await supabase
            .from("user_roles")
            .select("role:roles(name)")
            .eq("user_id", session.user.id)
            .single()

          if (!error && data?.role?.name === "admin") {
            setIsAdmin(true)
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getUser()

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      if (event === "SIGNED_OUT") {
        setIsAdmin(false)
      } else if (event === "SIGNED_IN" && session?.user) {
        // Check if user is admin
        supabase
          .from("user_roles")
          .select("role:roles(name)")
          .eq("user_id", session.user.id)
          .single()
          .then(({ data, error }) => {
            if (!error && data?.role?.name === "admin") {
              setIsAdmin(true)
            }
          })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{ user, isLoading, isAdmin }}>{children}</AuthContext.Provider>
}

