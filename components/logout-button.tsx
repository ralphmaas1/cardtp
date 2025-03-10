"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await supabase.auth.signOut()
      toast({
        title: "Uitgelogd",
        description: "Je bent succesvol uitgelogd.",
      })
      
      // Redirect naar de homepage na uitloggen
      router.push('/')
    } catch (error) {
      console.error("Fout bij uitloggen:", error)
      toast({
        title: "Fout bij uitloggen",
        description: "Er is een fout opgetreden bij het uitloggen.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleLogout} 
      disabled={isLoading}
    >
      {isLoading ? "Bezig..." : "Uitloggen"}
    </Button>
  )
} 