"use client"

import { useAuth } from "@/components/auth-provider"

export function DebugAuth() {
  const { user, isAdmin, isLoading } = useAuth()

  if (isLoading) return <div>Laden...</div>

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs z-50">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <p>Ingelogd: {user ? "Ja" : "Nee"}</p>
      {user && (
        <>
          <p>User ID: {user.id}</p>
          <p>Email: {user.email}</p>
          <p>Admin: {isAdmin ? "Ja" : "Nee"}</p>
        </>
      )}
    </div>
  )
}

