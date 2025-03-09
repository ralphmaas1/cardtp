"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { pokemonData } from "@/data/pokemon-data"
// Import the new banner component
import { PokemonSeriesBanner } from "@/components/pokemon/pokemon-series-banner"

export function PokemonSeriesGrid() {
  const [expandedSeries, setExpandedSeries] = useState<string | null>(null)

  const toggleSeries = (seriesId: string) => {
    if (expandedSeries === seriesId) {
      setExpandedSeries(null)
    } else {
      setExpandedSeries(seriesId)
    }
  }

  return (
    <div className="space-y-8">
      {pokemonData.map((series) => (
        <div key={series.id} className="bg-background rounded-lg border border-border/40 overflow-hidden">
          {/* Series Header */}
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-secondary/50 transition-colors"
            onClick={() => toggleSeries(series.id)}
          >
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-5.5 flex-shrink-0">
                <Image
                  src={series.logo || "/placeholder.svg?height=48&width=48"}
                  alt={series.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold">{series.name}</h2>
              <span className="text-sm bg-yellow-500 text-yellow-950 px-2 py-1 rounded-full">
                {series.sets.length} sets
              </span>
            </div>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              {expandedSeries === series.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </Button>
          </div>

          {/* Sets Grid */}
          {expandedSeries === series.id && (
            <div className="p-4">
              {/* Add the banner component inside the expanded series section */}
              {/* After this line:
              {expandedSeries === series.id && (
                <div className="p-4"> */}
              <PokemonSeriesBanner
                seriesId={series.id}
                name={series.name}
                bannerImage={series.bannerImage || `/placeholder.svg?height=686&width=3000`}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {series.sets.map((set) => (
                  <Link href={`/categories/tgp/pokemon/sets/${set.id}`} key={set.id} className="group">
                    <Card className="overflow-hidden h-full transition-all hover:shadow-md hover:border-yellow-500/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="relative w-10 h-10 flex-shrink-0">
                            <Image
                              src={set.logo || "/placeholder.svg?height=40&width=40"}
                              alt={set.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <h3 className="font-semibold group-hover:text-yellow-500 transition-colors">{set.name}</h3>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{set.releaseYear}</span>
                          <span>{set.cardCount} cards</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

