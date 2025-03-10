"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialMode?: "login" | "signup"
}

export function LoginDialog({ open, onOpenChange, initialMode = "login" }: LoginDialogProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(initialMode)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      // Check if user is admin
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role:roles(name)")
        .eq("user_id", data.user.id)
        .single()

      const isAdmin = roles?.role?.name === "admin"

      // Close dialog
      onOpenChange(false)

      // Get redirect URL from query params if it exists
      const params = new URLSearchParams(window.location.search)
      const redirectTo = params.get("redirectTo")

      // Redirect based on role
      if (isAdmin && !redirectTo) {
        router.push("/admin")
      } else if (redirectTo) {
        router.push(redirectTo)
      } else {
        router.refresh()
      }

      // Show success message
      alert("Je bent succesvol ingelogd.")
    } catch (error: any) {
      alert(error.message || "Er is een fout opgetreden bij het inloggen.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (error) {
        throw error
      }

      alert("Account aangemaakt! Controleer je e-mail om je account te bevestigen.")
      setActiveTab("login")
    } catch (error: any) {
      alert(error.message || "Er is een fout opgetreden bij het registreren.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab as any}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Inloggen</TabsTrigger>
            <TabsTrigger value="signup">Registreren</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <DialogHeader>
                <DialogTitle>Inloggen</DialogTitle>
                <DialogDescription>Log in op je account om toegang te krijgen tot alle functies.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="naam@voorbeeld.nl"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Wachtwoord</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Bezig met inloggen..." : "Inloggen"}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp}>
              <DialogHeader>
                <DialogTitle>Registreren</DialogTitle>
                <DialogDescription>
                  Maak een nieuw account aan om toegang te krijgen tot alle functies.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Naam</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jouw naam"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email-register">E-mail</Label>
                  <Input
                    id="email-register"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="naam@voorbeeld.nl"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password-register">Wachtwoord</Label>
                  <Input
                    id="password-register"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-gray-500">Wachtwoord moet minimaal 6 tekens bevatten</p>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Bezig met registreren..." : "Registreren"}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

