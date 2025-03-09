import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"
import { getCardListingById } from "@/data/card-listings"
import { CardListingDetail } from "@/components/card-listing-detail"

export default function CardListingPage({ params }: { params: { id: string } }) {
  const listing = getCardListingById(params.id)

  if (!listing) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <CardListingDetail listing={listing} />
        </div>
      </main>
      <Footer />
    </>
  )
}

