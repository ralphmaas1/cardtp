"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const { showDebug, toggleDebug } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Voorkom hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Instellingen</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Debug Instellingen</CardTitle>
          <CardDescription>
            Configureer debug opties voor de applicatie
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auth-debug">Auth Debug Weergeven</Label>
              <p className="text-sm text-muted-foreground">
                Toont een debug paneel met authenticatie informatie onderaan het scherm
              </p>
            </div>
            <Switch
              id="auth-debug"
              checked={showDebug}
              onCheckedChange={toggleDebug}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 