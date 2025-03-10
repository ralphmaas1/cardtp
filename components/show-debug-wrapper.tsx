"use client"

import { useAuth } from "@/components/auth-provider"
import { DebugAuth } from "@/components/debug-auth"

export function ShowDebugWrapper() {
  const { showDebug } = useAuth()

  if (!showDebug) return null

  return <DebugAuth />
} 