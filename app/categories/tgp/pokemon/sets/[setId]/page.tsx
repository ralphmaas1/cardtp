import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"
import { pokemonData } from "@/data/pokemon-data"
import { PokemonSetDetails } from "@/components/pokemon/pokemon-set-details"

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

export default function PokemonSetPage({ params }: { params: { setId: string } }) {
  const setData = getSetData(params.setId)

  if (!setData) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <PokemonSetDetails set={setData.set} series={setData.series} />
        </div>
      </main>
      <Footer />
    </>
  )
}

