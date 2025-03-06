import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Gavel, ShoppingCart, RefreshCw } from "lucide-react"

interface CardProps {
  card: {
    id: number
    title: string
    description: string
    tags: string[]
    image: string
    category?: string
    price?: number
    listingType?: "auction" | "buy-now" | "trade"
    bids?: number
    timeLeft?: string
  }
  compact?: boolean
}

export function CardItem({ card, compact = false }: CardProps) {
  // Format price with commas and dollar sign
  const formattedPrice = card.price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(card.price)
    : ""

  // Get the appropriate icon for the listing type
  const getListingIcon = () => {
    switch (card.listingType) {
      case "auction":
        return <Gavel className="h-4 w-4 mr-1" />
      case "buy-now":
        return <ShoppingCart className="h-4 w-4 mr-1" />
      case "trade":
        return <RefreshCw className="h-4 w-4 mr-1" />
      default:
        return null
    }
  }

  // Get the listing type label
  const getListingLabel = () => {
    switch (card.listingType) {
      case "auction":
        return "Auction"
      case "buy-now":
        return "Buy Now"
      case "trade":
        return "Trade"
      default:
        return ""
    }
  }

  // Get the listing type badge color
  const getListingBadgeVariant = () => {
    switch (card.listingType) {
      case "auction":
        return "default"
      case "buy-now":
        return "secondary"
      case "trade":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Link href={`/cards/${card.id}`} className="block group">
      <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
        <div className="relative w-full" style={{ paddingTop: "140%" }}>
          <Image
            src={card.image || "/placeholder.svg?height=350&width=250"}
            alt={card.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            priority
          />
          {card.listingType && (
            <div className="absolute top-2 right-2">
              <Badge variant={getListingBadgeVariant()} className="flex items-center">
                {getListingIcon()}
                {getListingLabel()}
              </Badge>
            </div>
          )}
        </div>
        <CardHeader className={`${compact ? "p-3 pb-0" : "p-4 pb-0"}`}>
          <CardTitle className={`line-clamp-1 ${compact ? "text-base" : ""}`}>{card.title}</CardTitle>
        </CardHeader>
        <CardContent className={`${compact ? "p-3 pt-1 pb-0" : "p-4 pt-2"}`}>
          <p className="text-muted-foreground line-clamp-2 text-sm">{card.description}</p>
        </CardContent>
        <CardFooter className={`${compact ? "p-3" : "p-4"}`}>
          <div className="w-full">
            {card.price && <div className="font-bold text-primary">{formattedPrice}</div>}
            {card.listingType === "auction" && card.bids && card.timeLeft && (
              <div className="text-xs text-muted-foreground mt-1">
                {card.bids} bids · {card.timeLeft} left
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

