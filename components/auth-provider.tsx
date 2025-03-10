"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
  showDebug: boolean
  toggleDebug: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAdmin: false,
  showDebug: false,
  toggleDebug: () => {},
})

export const useAuth = () => useContext(AuthContext)

// Helper functie om de sessie te synchroniseren tussen localStorage en cookies
function syncSessionToCookies() {
  if (typeof window === 'undefined') return
  
  try {
    // Haal de sessie op uit localStorage
    const supabaseAuthKey = 'supabase-auth'
    const sessionStr = localStorage.getItem(supabaseAuthKey)
    
    if (sessionStr) {
      // Zet de sessie in een cookie voor de middleware
      document.cookie = `${supabaseAuthKey}=${sessionStr}; path=/; max-age=31536000; SameSite=Lax`
      console.log("Sessie gesynchroniseerd naar cookies")
    }
  } catch (error) {
    console.error("Fout bij synchroniseren van sessie naar cookies:", error)
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showDebug, setShowDebug] = useState(false)

  // Functie om debug modus aan/uit te zetten
  const toggleDebug = () => {
    const newValue = !showDebug
    setShowDebug(newValue)
    
    // Sla de voorkeur op in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth-debug-enabled', newValue ? 'true' : 'false')
    }
  }

  useEffect(() => {
    // Laad de debug voorkeur uit localStorage
    if (typeof window !== 'undefined') {
      const savedPreference = localStorage.getItem('auth-debug-enabled')
      if (savedPreference !== null) {
        setShowDebug(savedPreference === 'true')
      }
    }
  }, [])

  useEffect(() => {
    async function getUser() {
      try {
        // Synchroniseer de sessie naar cookies
        syncSessionToCookies()
        
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

          if (!error && data?.role) {
            // @ts-ignore - We weten dat role een object is met een name property
            const roleName = data.role.name
            setIsAdmin(roleName === "admin")
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
      
      // Synchroniseer de sessie naar cookies bij auth veranderingen
      syncSessionToCookies()
      
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
            if (!error && data?.role) {
              // @ts-ignore - We weten dat role een object is met een name property
              const roleName = data.role.name
              setIsAdmin(roleName === "admin")
            }
          })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{ user, isLoading, isAdmin, showDebug, toggleDebug }}>{children}</AuthContext.Provider>
}

