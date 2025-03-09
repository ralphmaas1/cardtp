import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PokemonSeriesGrid } from "@/components/pokemon/pokemon-series-grid"

export default function PokemonCategoryPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero section with Pokémon-specific background */}
        <div className="relative py-12 mb-8">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1600')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 to-yellow-600/30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Pokémon Trading Cards</h1>
              <p className="text-lg text-foreground/90">
                Explore the complete Pokémon Trading Card Game collection, from the original Base Set to the latest
                Scarlet & Violet expansions. Find rare cards, complete sets, and special editions.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-16">
          <PokemonSeriesGrid />
        </div>
      </main>
      <Footer />
    </>
  )
}

