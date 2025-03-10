"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LoginDialog } from "@/components/login-dialog"

export default function RegisterPage() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  
  // Open de dialog automatisch wanneer de pagina wordt geladen
  useEffect(() => {
    setOpen(true)
  }, [])
  
  // Wanneer de dialog wordt gesloten, stuur de gebruiker terug naar de homepage
  // tenzij ze succesvol zijn geregistreerd (dat wordt afgehandeld in de LoginDialog component)
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      router.push("/")
    }
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Registreren</h1>
        <p className="mb-4">
          Je wordt automatisch doorgestuurd naar de registratiepagina.
          <br />
          Als er niets gebeurt, klik dan op de knop hieronder.
        </p>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Registreren
        </button>
      </div>
      
      <LoginDialog 
        open={open} 
        onOpenChange={handleOpenChange} 
        initialMode="signup" 
      />
    </div>
  )
} 