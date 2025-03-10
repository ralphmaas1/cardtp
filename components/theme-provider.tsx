"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Definieer de toegestane waarden voor het attribute
type Attribute = "class" | "data-theme" | "data-mode"

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: Attribute | Attribute[]
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  themes?: string[]
  forcedTheme?: string
  storageKey?: string
}

export function ThemeProvider({ 
  children,
  ...props
}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
} 