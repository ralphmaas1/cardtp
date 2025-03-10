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
import { useToast } from "@/components/ui/use-toast"

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
  const [showResetPassword, setShowResetPassword] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Inloggen met:", { email })
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Login error details:", error)
        throw error
      }

      // Controleer of de gebruiker een admin is
      const user = data.user
      
      // Voor ontwikkelingsdoeleinden: beschouw bepaalde e-mailadressen als admin
      const isAdmin = email.includes('admin') || email === 'ralphmaas1@gmail.com'
      
      toast({
        title: "Ingelogd!",
        description: "Je bent succesvol ingelogd.",
      })

      onOpenChange(false)
      
      // Redirect naar admin pagina als de gebruiker een admin is
      if (isAdmin) {
        router.push('/admin')
      } else {
        router.refresh()
      }
    } catch (error: any) {
      console.error("Login error:", error)
      toast({
        title: "Fout bij inloggen",
        description: error.message || "Er is een fout opgetreden bij het inloggen.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Registreren met:", { email, name })
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
          emailRedirectTo: window.location.origin,
        },
      })

      if (error) {
        console.error("Signup error details:", error)
        throw error
      }

      toast({
        title: "Account aangemaakt!",
        description: "Controleer je e-mail om je account te bevestigen of gebruik de 'Wachtwoord vergeten' optie om direct toegang te krijgen.",
      })

      setActiveTab("login")
    } catch (error: any) {
      console.error("Signup error:", error)
      toast({
        title: "Fout bij registreren",
        description: error.message || "Er is een fout opgetreden bij het registreren.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Wachtwoord reset voor:", { email })
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      })

      if (error) {
        console.error("Reset password error details:", error)
        throw error
      }

      toast({
        title: "Reset link verzonden!",
        description: "Controleer je e-mail voor een link om je wachtwoord te resetten.",
      })

      setShowResetPassword(false)
    } catch (error: any) {
      console.error("Reset password error:", error)
      toast({
        title: "Fout bij wachtwoord resetten",
        description: error.message || "Er is een fout opgetreden bij het resetten van je wachtwoord.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {showResetPassword ? (
          <form onSubmit={handleResetPassword}>
            <DialogHeader>
              <DialogTitle>Wachtwoord vergeten</DialogTitle>
              <DialogDescription>
                Vul je e-mailadres in om een link te ontvangen om je wachtwoord te resetten.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email-reset">E-mail</Label>
                <Input
                  id="email-reset"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="naam@voorbeeld.nl"
                  required
                />
              </div>
            </div>
            <DialogFooter className="flex justify-between items-center">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowResetPassword(false)}
              >
                Terug
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Bezig met verzenden..." : "Verzenden"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
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
                    <Button 
                      type="button" 
                      variant="link" 
                      className="justify-end h-auto p-0 text-sm"
                      onClick={() => setShowResetPassword(true)}
                    >
                      Wachtwoord vergeten?
                    </Button>
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
        )}
      </DialogContent>
    </Dialog>
  )
}

