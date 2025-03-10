import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { DebugAuth } from "@/components/debug-auth"
import { AdminLink } from "@/components/admin/admin-link" 
import { ShowDebugWrapper } from "@/components/show-debug-wrapper"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CardTP - Card Collection",
  description: "A collection of cards for your projects",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="min-h-screen">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <AuthProvider>
          <div className="flex-grow flex flex-col">{children}</div>
          <ShowDebugWrapper />
          <AdminLink />
        </AuthProvider>
      </body>
    </html>
  )
}

