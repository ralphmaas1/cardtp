"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Search, Menu, Shield, Users } from "lucide-react"
import { useState, useEffect } from "react"
import { LoginDialog } from "@/components/login-dialog"
import { LanguageSelector } from "@/components/language-selector"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export function Header() {
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [dialogMode, setDialogMode] = useState<"login" | "signup">("login")
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

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

  const openLoginDialog = (mode: "login" | "signup") => {
    setDialogMode(mode)
    setShowLoginDialog(true)
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      alert("Je bent succesvol uitgelogd.")
      router.refresh()
    } catch (error) {
      console.error("Error signing out:", error)
      alert("Er is een fout opgetreden bij het uitloggen.")
    }
  }

  // User account navigation component
  const UserAccountNav = () => {
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
          <Button variant="outline" onClick={() => openLoginDialog("login")} className="hidden sm:inline-flex">
            Log in
          </Button>
          <Button onClick={() => openLoginDialog("signup")} className="hidden sm:inline-flex">
            Sign up
          </Button>
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
                <Link href="/admin" className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-purple-600" />
                  <span>Beheerdersdashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/users" className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-600" />
                  <span>Gebruikersbeheer</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>Uitloggen</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <header className="z-10">
      {/* Logo/Banner Area */}
      <div className="bg-background border-b border-border/40">
        <div className="container mx-auto flex justify-center items-center py-6 px-4">
          <div className="relative h-24 w-full max-w-3xl">
            <Image
              src="/placeholder.svg?height=96&width=768"
              alt="Card Trading Platform Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-background/95 backdrop-blur-sm border-b border-border/40">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            Card Trading Platform
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/marketplace" className="text-foreground hover:text-primary transition-colors">
              Marketplace
            </Link>
            <Link href="/auctions" className="text-foreground hover:text-primary transition-colors">
              Auctions
            </Link>
            <Link href="/trades" className="text-foreground hover:text-primary transition-colors">
              Trades
            </Link>
            <Link href="/sell" className="text-foreground hover:text-primary transition-colors">
              Sell Cards
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search cards..."
                className="h-9 w-[200px] rounded-md border border-input bg-secondary pl-8 pr-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <UserAccountNav />
            <LanguageSelector />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-border/40 bg-background">
            <div className="container mx-auto px-4 py-3 space-y-3">
              <Link
                href="/marketplace"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Marketplace
              </Link>
              <Link
                href="/auctions"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Auctions
              </Link>
              <Link
                href="/trades"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Trades
              </Link>
              <Link
                href="/sell"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Sell Cards
              </Link>
              {!user && (
                <div className="pt-2 flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      openLoginDialog("login")
                      setShowMobileMenu(false)
                    }}
                    className="flex-1"
                  >
                    Log in
                  </Button>
                  <Button
                    onClick={() => {
                      openLoginDialog("signup")
                      setShowMobileMenu(false)
                    }}
                    className="flex-1"
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} initialMode={dialogMode} />
    </header>
  )
}

