"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

// This is a placeholder component for the set details page
export function PokemonSetDetails({
  set,
  series,
}: {
  set: any
  series: any
}) {
  return (
    <div>
      <div className="mb-8">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/categories/tgp/pokemon" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Pokémon Series
          </Link>
        </Button>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-16 h-16">
            <Image
              src={set.logo || "/placeholder.svg?height=64&width=64"}
              alt={set.name}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{series.name}</div>
            <h1 className="text-3xl font-bold">{set.name}</h1>
            <div className="flex gap-4 mt-1">
              <span className="text-sm text-muted-foreground">Released: {set.releaseYear}</span>
              <span className="text-sm text-muted-foreground">{set.cardCount} cards</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-500/10 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">About this set</h2>
        <p className="text-muted-foreground">
          This is a placeholder for the set description. Here you would include information about the set, its special
          features, rare cards, and other relevant details.
        </p>
        <div className="mt-4">
          <Button asChild>
            <Link href={`/categories/tgp/pokemon/sets/${set.id}/listings`} className="flex items-center gap-2">
              View All Cards For Sale
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Cards in this set</h2>
        <div className="p-12 border border-dashed border-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Card grid would be displayed here</p>
        </div>
      </div>
    </div>
  )
}

