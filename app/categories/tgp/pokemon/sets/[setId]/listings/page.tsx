import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"
import { pokemonData } from "@/data/pokemon-data"
import { CardListingsGrid } from "@/components/pokemon/card-listings-grid"
import { CardListingsFilters } from "@/components/pokemon/card-listings-filters"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"

// This is a placeholder for the actual data fetching logic
function getSetData(setId: string) {
  for (const series of pokemonData) {
    const set = series.sets.find((set) => set.id === setId)
    if (set) {
      return { set, series }
    }
  }
  return null
}

export default function PokemonSetListingsPage({ params }: { params: { setId: string } }) {
  const setData = getSetData(params.setId)

  if (!setData) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
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
                  src={setData.set.logo || "/placeholder.svg?height=64&width=64"}
                  alt={setData.set.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{setData.series.name}</div>
                <h1 className="text-3xl font-bold">{setData.set.name}</h1>
                <div className="text-sm text-muted-foreground">Showing all cards for sale from this set</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <CardListingsFilters />
            </div>
            <div className="lg:col-span-3">
              <CardListingsGrid setId={params.setId} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

