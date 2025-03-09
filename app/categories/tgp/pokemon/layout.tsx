import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pokémon Trading Cards - Card Trading Platform",
  description: "Browse our collection of Pokémon trading cards from all series and sets",
}

export default function PokemonLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

