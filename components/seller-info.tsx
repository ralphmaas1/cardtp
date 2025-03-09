import { Badge } from "@/components/ui/badge"
import type { CardListing } from "@/types/card-listing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Truck, Clock, Shield } from "lucide-react"

interface SellerInfoProps {
  listing: CardListing
}

export function SellerInfo({ listing }: SellerInfoProps) {
  // Sample seller details (in a real app, these would come from the database)
  const sellerDetails = {
    memberSince: "2018-05-12",
    totalSales: 1243,
    responseTime: "Within 24 hours",
    shippingTime: "1-3 business days",
    returnPolicy: "14 days money back",
    paymentMethods: ["Credit Card", "PayPal", "Apple Pay"],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seller Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Seller Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{listing.seller.name}</h3>
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{listing.seller.rating.toFixed(1)}</span>
                <span className="text-muted-foreground ml-1">(487 reviews)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center text-lg">
            <span className="mr-2">{listing.seller.flag}</span>
            <span className="text-sm">{listing.seller.country}</span>
          </div>
        </div>

        <Separator />

        {/* Seller Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Member since {new Date(sellerDetails.memberSince).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{sellerDetails.totalSales} successful sales</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Ships from {listing.seller.country}</span>
          </div>
        </div>

        <Separator />

        {/* Shipping Information */}
        <div>
          <h4 className="font-medium mb-2">Shipping & Returns</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span>
                {listing.shippingCost > 0
                  ? `$${listing.shippingCost.toFixed(2)} shipping to your country`
                  : "Free shipping to your country"}
              </span>
            </div>
            <div className="text-muted-foreground ml-6">Estimated delivery: {sellerDetails.shippingTime}</div>
            <div className="text-muted-foreground ml-6">Return policy: {sellerDetails.returnPolicy}</div>
          </div>
        </div>

        <Separator />

        {/* Payment Methods */}
        <div>
          <h4 className="font-medium mb-2">Payment Methods</h4>
          <div className="flex flex-wrap gap-2">
            {sellerDetails.paymentMethods.map((method) => (
              <Badge key={method} variant="outline">
                {method}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

