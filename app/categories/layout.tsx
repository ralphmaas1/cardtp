import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trading Card Games - Card Trading Platform",
  description:
    "Browse our collection of trading card games including Pokémon, Magic: The Gathering, Yu-Gi-Oh! and more",
}

export default function TgpLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

