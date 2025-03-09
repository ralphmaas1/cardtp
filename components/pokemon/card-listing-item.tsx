import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, RefreshCw, Gavel, Star } from "lucide-react"
import type { CardListing } from "@/types/card-listing"

interface CardListingItemProps {
  listing: CardListing
  viewMode: "grid" | "list"
}

export function CardListingItem({ listing, viewMode }: CardListingItemProps) {
  // Function to render the grading badge with appropriate styling
  const renderGradingBadge = () => {
    if (!listing.grading) return null

    let badgeStyle = "text-xs font-bold px-2 py-1"

    switch (listing.grading.company) {
      case "PSA":
        badgeStyle += " bg-red-600 text-white"
        break
      case "BGS":
        badgeStyle += " bg-black text-white border-2 border-blue-500"
        break
      case "CGC":
        badgeStyle += " bg-blue-700 text-white"
        break
      case "SGC":
        badgeStyle += " bg-gray-800 text-white"
        break
      default:
        badgeStyle += " bg-secondary text-secondary-foreground"
    }

    return (
      <Badge className={badgeStyle}>
        {listing.grading.company} {listing.grading.grade}
      </Badge>
    )
  }

  // Function to render the listing type badge
  const renderListingTypeBadge = () => {
    switch (listing.listingType) {
      case "buy-now":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <ShoppingCart className="h-3 w-3" />
            Buy Now
          </Badge>
        )
      case "auction":
        return (
          <Badge variant="default" className="flex items-center gap-1">
            <Gavel className="h-3 w-3" />
            Auction
          </Badge>
        )
      case "trade":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-background">
            <RefreshCw className="h-3 w-3" />
            Trade
          </Badge>
        )
      default:
        return null
    }
  }

  // Function to render the quality indicator (0-10 scale)
  const renderQualityIndicator = () => {
    if (listing.grading) return null // Don't show for graded cards

    const qualityColor =
      listing.quality >= 9
        ? "bg-green-500"
        : listing.quality >= 7
          ? "bg-blue-500"
          : listing.quality >= 5
            ? "bg-yellow-500"
            : "bg-red-500"

    return (
      <div className="flex items-center gap-1">
        <div className={`w-3 h-3 rounded-full ${qualityColor}`}></div>
        <span className="text-xs">Quality: {listing.quality}/10</span>
      </div>
    )
  }

  // Function to render auction info if applicable
  const renderAuctionInfo = () => {
    if (listing.listingType !== "auction" || !listing.endTime) return null

    return (
      <div className="text-xs text-muted-foreground mt-1">
        <span className="font-medium">{listing.currentBids} bids</span> • Ends in {listing.endTime}
      </div>
    )
  }

  // Function to render seller rating
  const renderSellerRating = () => {
    return (
      <div className="flex items-center text-xs">
        <Star className="h-3 w-3 text-yellow-500 mr-0.5" />
        <span>{listing.seller.rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <Link href={`/listings/${listing.id}`}>
      <Card className={`overflow-hidden h-full hover:shadow-md transition-shadow ${viewMode === "list" ? "flex" : ""}`}>
        {/* Card Image */}
        <div
          className={`relative ${viewMode === "grid" ? "w-full" : "w-1/3 min-w-[120px]"}`}
          style={{
            paddingTop: viewMode === "grid" ? "140%" : "0",
            height: viewMode === "list" ? "auto" : undefined,
          }}
        >
          <Image
            src={listing.image || "/placeholder.svg"}
            alt={listing.title}
            fill={viewMode === "grid"}
            width={viewMode === "list" ? 120 : undefined}
            height={viewMode === "list" ? 160 : undefined}
            className={`object-contain ${viewMode === "list" ? "relative" : "absolute"}`}
          />

          {/* Grading Badge - Top Right */}
          {listing.grading && <div className="absolute top-2 right-2">{renderGradingBadge()}</div>}

          {/* Listing Type Badge - Top Left */}
          <div className="absolute top-2 left-2">{renderListingTypeBadge()}</div>
        </div>

        {/* Card Details */}
        <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
                <p className="text-xs text-muted-foreground">
                  Card #{listing.cardNumber} • {listing.rarity}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            {/* Quality Indicator (for raw cards) */}
            {renderQualityIndicator()}

            {/* Auction Info */}
            {renderAuctionInfo()}

            {/* Price and Shipping */}
            <div className="flex justify-between items-end">
              <div>
                <div className="text-lg font-bold">${listing.price.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">
                  {listing.shippingCost > 0 ? `+$${listing.shippingCost.toFixed(2)} shipping` : "Free shipping"}
                </div>
              </div>

              {/* Seller Info */}
              <div className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <span className="text-xs">{listing.seller.name}</span>
                  {renderSellerRating()}
                </div>
                <div className="flex items-center justify-end text-xs text-muted-foreground">
                  <span className="mr-1">{listing.seller.country}</span>
                  <span className="text-base">{listing.seller.flag}</span>
                </div>
              </div>
            </div>

            {/* Trade Options */}
            {listing.tradeOptions?.available && (
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="text-primary font-medium">Trade Wanted:</span>{" "}
                {listing.tradeOptions.wantList?.join(", ")}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

