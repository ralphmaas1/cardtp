import { CategoryCards } from "@/components/category-cards"
import { Header } from "@/components/header"
import { LatestCards } from "@/components/latest-cards"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { StatsSection } from "@/components/stats-section"

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <HeroSection />

        <div className="container mx-auto py-8 px-4">
          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-8 text-primary">Browse Categories</h2>
            <CategoryCards />
          </section>

          <StatsSection />

          <section className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Latest Listings</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <LatestCards />
          </section>

          <FeaturesSection />

          <TestimonialsSection />
        </div>
      </main>
      <Footer />
    </>
  )
}

