"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { supabase } from "@/lib/supabase"
import { LoginDialog } from "@/components/login-dialog"
import { useToast } from "@/hooks/use-toast"

export function UserAccountNav() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

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

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      toast({
        title: "Uitgelogd",
        description: "Je bent succesvol uitgelogd.",
      })
      router.refresh()
    } catch (error) {
      console.error("Error signing out:", error)
      toast({
        title: "Fout bij uitloggen",
        description: "Er is een fout opgetreden bij het uitloggen.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        Laden...
      </Button>
    )
  }

  if (!user) {
    return (
      <>
        <Button variant="default" size="sm" onClick={() => setIsLoginDialogOpen(true)}>
          Inloggen
        </Button>
        <LoginDialog isOpen={isLoginDialogOpen} onClose={() => setIsLoginDialogOpen(false)} />
      </>
    )
  }

  const initials = user.user_metadata?.name
    ? `${user.user_metadata.name.split(" ")[0][0]}${user.user_metadata.name.split(" ").length > 1 ? user.user_metadata.name.split(" ")[1][0] : ""}`
    : user.email?.substring(0, 2).toUpperCase() || "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={user.user_metadata?.name || "User"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.user_metadata?.name || user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">Mijn profiel</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/listings/my">Mijn kaarten</Link>
        </DropdownMenuItem>
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin">Beheerdersdashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/users">Gebruikersbeheer</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Uitloggen</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

