"use client"

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    // Als de gebruiker niet aan het laden is en niet is ingelogd, redirect naar de login pagina
    if (!isLoading && !user) {
      router.push("/login?redirectTo=/admin")
    }
    
    // Als de gebruiker is ingelogd maar geen admin is, redirect naar de homepage
    if (!isLoading && user && !isAdmin) {
      router.push("/")
    }
  }, [isLoading, user, isAdmin, router])
  
  // Toon een laadscherm terwijl we controleren of de gebruiker is ingelogd
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    )
  }
  
  // Toon niets als de gebruiker niet is ingelogd of geen admin is
  // De redirect in useEffect zal de gebruiker doorsturen
  if (!user || !isAdmin) {
    return null
  }
  
  // Toon de admin layout als de gebruiker is ingelogd en admin is
  return (
    <div className="bg-white min-h-screen flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  )
}

