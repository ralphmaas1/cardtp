"use client"

import { useState } from "react"
import Image from "next/image"
import type { CardListing } from "@/types/card-listing"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, RefreshCw, Gavel, RotateCw, MessageCircle } from "lucide-react"

interface SellerCardProps {
  listing: CardListing
}

export function SellerCard({ listing }: SellerCardProps) {
  const [showBack, setShowBack] = useState(false)

  // Function to render the grading badge with appropriate styling
  const renderGradingBadge = () => {
    if (!listing.grading) return null

    let badgeStyle = "text-sm font-bold px-3 py-1"

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
      <div className="flex items-center gap-2">
        <div className={`w-4 h-4 rounded-full ${qualityColor}`}></div>
        <span>
          Quality: <strong>{listing.quality}/10</strong>
        </span>
      </div>
    )
  }

  // Function to render the listing type badge
  const renderListingTypeBadge = () => {
    switch (listing.listingType) {
      case "buy-now":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <ShoppingCart className="h-4 w-4" />
            Buy Now
          </Badge>
        )
      case "auction":
        return (
          <Badge variant="default" className="flex items-center gap-1">
            <Gavel className="h-4 w-4" />
            Auction
          </Badge>
        )
      case "trade":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-background">
            <RefreshCw className="h-4 w-4" />
            Trade
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="overflow-hidden">
      {/* Card Image with Flip Button */}
      <div className="relative">
        <div className="relative w-full" style={{ height: "450px" }}>
          <Image
            src={`/placeholder.svg?height=450&width=320&text=${
              showBack ? "Card+Back" : listing.title.replace(/ /g, "+")
            }`}
            alt={showBack ? `${listing.title} (Back)` : listing.title}
            fill
            className="object-contain"
          />
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="absolute bottom-4 right-4"
          onClick={() => setShowBack(!showBack)}
        >
          <RotateCw className="h-4 w-4 mr-1" />
          {showBack ? "Show Front" : "Show Back"}
        </Button>

        {/* Grading Badge - Top Right */}
        {listing.grading && <div className="absolute top-4 right-4">{renderGradingBadge()}</div>}

        {/* Listing Type Badge - Top Left */}
        <div className="absolute top-4 left-4">{renderListingTypeBadge()}</div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Card Title and Price */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{listing.title}</h2>
              <p className="text-muted-foreground">
                Card #{listing.cardNumber} • {listing.rarity}
              </p>
            </div>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Quality Indicator (for raw cards) */}
          {renderQualityIndicator()}

          {/* Seller's Description */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Seller's Description</h3>
            <p className="text-muted-foreground">
              {listing.description ||
                "This is a beautiful copy of the card in excellent condition. The card has been stored in a sleeve and toploader since it was pulled. There are no visible scratches, whitening, or other defects."}
            </p>
          </div>

          <Separator />

          {/* Price and Shipping */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Price</span>
              <span className="text-2xl font-bold">${listing.price.toFixed(2)}</span>
            </div>
            <div className="text-sm text-muted-foreground text-right">
              {listing.shippingCost > 0 ? `+$${listing.shippingCost.toFixed(2)} shipping` : "Free shipping"}
            </div>
          </div>

          {/* Auction Info */}
          {listing.listingType === "auction" && listing.endTime && (
            <div className="bg-secondary/50 p-3 rounded-md">
              <div className="flex justify-between items-center">
                <span className="font-medium">Current Bids:</span>
                <span>{listing.currentBids || 0}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="font-medium">Time Left:</span>
                <span>{listing.endTime}</span>
              </div>
            </div>
          )}

          {/* Trade Options */}
          {listing.tradeOptions?.available && (
            <div className="bg-secondary/50 p-3 rounded-md">
              <h3 className="font-semibold mb-2">Trade Options</h3>
              <p className="text-sm">This seller is willing to trade for the following cards:</p>
              <ul className="list-disc list-inside text-sm mt-1">
                {listing.tradeOptions.wantList?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex flex-col gap-3">
        {/* Action Buttons */}
        {listing.listingType === "buy-now" && (
          <Button className="w-full" size="lg">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Buy Now
          </Button>
        )}

        {listing.listingType === "auction" && (
          <Button className="w-full" size="lg">
            <Gavel className="h-5 w-5 mr-2" />
            Place Bid
          </Button>
        )}

        {listing.listingType === "trade" && (
          <Button className="w-full" size="lg">
            <RefreshCw className="h-5 w-5 mr-2" />
            Offer Trade
          </Button>
        )}

        <Button variant="outline" className="w-full">
          <MessageCircle className="h-5 w-5 mr-2" />
          Contact Seller
        </Button>
      </CardFooter>
    </Card>
  )
}

