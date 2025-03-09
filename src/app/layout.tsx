import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

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
        <div className="flex-grow flex flex-col">{children}</div>
        <Toaster />
      </body>
    </html>
  )
}

