import Image from "next/image"
import type { CardListing } from "@/types/card-listing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@radix-ui/react-dropdown-menu"

interface ExampleCardProps {
  listing: CardListing
  setInfo: {
    id: string
    name: string
    series: {
      id: string
      name: string
    }
  }
}

export function ExampleCard({ listing, setInfo }: ExampleCardProps) {
  // Sample card details (in a real app, these would come from the database)
  const cardDetails = {
    number: listing.cardNumber,
    rarity: listing.rarity,
    artist: "Ken Sugimori", // Example artist
    releaseDate: "1999-01-09", // Example release date
    type: "Fire", // Example type for Charizard
    hp: "120", // Example HP
    stage: "Stage 2", // Example stage
    evolvesFrom: "Charmeleon", // Example evolution
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Example Card Image */}
        <div className="flex justify-center">
          <div className="relative w-64 h-88" style={{ height: "350px" }}>
            <Image
              src={`/placeholder.svg?height=350&width=250&text=${listing.title.replace(/ /g, "+")}`}
              alt={listing.title}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Card Information */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{listing.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{setInfo.series.name}</Badge>
              <Badge variant="outline">{setInfo.name}</Badge>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="text-muted-foreground">Card Number:</div>
            <div>{cardDetails.number}</div>

            <div className="text-muted-foreground">Rarity:</div>
            <div>{cardDetails.rarity}</div>

            <div className="text-muted-foreground">Artist:</div>
            <div>{cardDetails.artist}</div>

            <div className="text-muted-foreground">Release Date:</div>
            <div>{new Date(cardDetails.releaseDate).toLocaleDateString()}</div>

            <div className="text-muted-foreground">Type:</div>
            <div>{cardDetails.type}</div>

            <div className="text-muted-foreground">HP:</div>
            <div>{cardDetails.hp}</div>

            <div className="text-muted-foreground">Stage:</div>
            <div>{cardDetails.stage}</div>

            <div className="text-muted-foreground">Evolves From:</div>
            <div>{cardDetails.evolvesFrom}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

