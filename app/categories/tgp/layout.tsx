import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TgpCategoryGrid } from "@/components/tgp-category-grid"

export default function TgpCategoriesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto py-12 px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">Trading Card Games</h1>
            <p className="text-muted-foreground text-lg">
              Explore our collection of trading card games from popular franchises. Find rare cards, complete sets, and
              limited editions.
            </p>
          </div>

          <TgpCategoryGrid />
        </div>
      </main>
      <Footer />
    </>
  )
}

