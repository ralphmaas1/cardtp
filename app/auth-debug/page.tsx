"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function AuthDebugPage() {
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const [sessionData, setSessionData] = useState<any>(null)
  const [cookies, setCookies] = useState<string[]>([])

  useEffect(() => {
    async function checkAuth() {
      try {
        // Haal sessie op
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error("Error getting session:", error)
          return
        }
        
        setSessionData(session)
        
        if (session?.user) {
          setUser(session.user)
          
          // Check admin status
          const { data: roles, error: rolesError } = await supabase
            .from("user_roles")
            .select("role:roles(name)")
            .eq("user_id", session.user.id)
            .single()
            
          if (rolesError) {
            console.error("Error getting roles:", rolesError)
          } else {
            // @ts-ignore
            const roleName = roles?.role?.name
            setIsAdmin(roleName === "admin")
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error)
      } finally {
        setLoading(false)
      }
    }
    
    // Haal cookies op
    setCookies(document.cookie.split(';').map(c => c.trim()))
    
    checkAuth()
    
    // Luister naar auth veranderingen
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event)
        setUser(session?.user || null)
        setSessionData(session)
      }
    )
    
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])
  
  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Auth Debug Pagina</h1>
      
      {loading ? (
        <p>Laden...</p>
      ) : (
        <div className="space-y-8">
          <div className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold mb-4">Authenticatie Status</h2>
            <div className="space-y-2">
              <p>
                <strong>Ingelogd:</strong> {user ? "Ja" : "Nee"}
              </p>
              {user && (
                <>
                  <p>
                    <strong>User ID:</strong> {user.id}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Admin:</strong> {isAdmin ? "Ja" : "Nee"}
                  </p>
                </>
              )}
            </div>
            
            <div className="mt-4">
              {user ? (
                <button 
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Uitloggen
                </button>
              ) : (
                <Link 
                  href="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-block"
                >
                  Inloggen
                </Link>
              )}
              
              {user && (
                <Link 
                  href="/admin"
                  className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors inline-block"
                >
                  Naar Admin
                </Link>
              )}
            </div>
          </div>
          
          <div className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold mb-4">Session Data</h2>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-60">
              {JSON.stringify(sessionData, null, 2)}
            </pre>
          </div>
          
          <div className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold mb-4">Cookies</h2>
            <ul className="list-disc pl-5 space-y-1">
              {cookies.map((cookie, index) => (
                <li key={index}>{cookie}</li>
              ))}
            </ul>
          </div>
          
          <div className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold mb-4">Troubleshooting</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Sessie niet gedetecteerd in middleware:</strong> Controleer of de juiste cookies aanwezig zijn.
                Supabase gebruikt cookies voor authenticatie, en deze moeten correct worden doorgegeven aan de middleware.
              </li>
              <li>
                <strong>Admin rechten niet gedetecteerd:</strong> Controleer of de gebruiker een rol heeft in de database.
                De rol moet correct zijn ingesteld in de <code>user_roles</code> tabel.
              </li>
              <li>
                <strong>Cookies worden niet doorgegeven:</strong> Controleer of de cookies correct worden ingesteld en of ze
                de juiste attributen hebben (HttpOnly, Secure, SameSite).
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
} 