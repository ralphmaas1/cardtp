"use client"

import type { CardListing } from "@/types/card-listing"
import { ExampleCard } from "@/components/example-card"
import { SellerCard } from "@/components/seller-card"
import { SellerInfo } from "@/components/seller-info"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface CardListingDetailProps {
  listing: CardListing
}

export function CardListingDetail({ listing }: CardListingDetailProps) {
  // Get the set and series information (in a real app, this would come from the database)
  const setInfo = {
    id: "base-set",
    name: "Base Set",
    series: {
      id: "original",
      name: "Original Series",
    },
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/categories/tgp">Trading Card Games</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/categories/tgp/pokemon">Pokémon</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/categories/tgp/pokemon/sets/${setInfo.id}/listings`}>
                {setInfo.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{listing.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Back Button */}
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href={`/categories/tgp/pokemon/sets/${setInfo.id}/listings`} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Listings
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Seller's Card (now 65% width) */}
        <div className="lg:col-span-8">
          <SellerCard listing={listing} />
        </div>

        {/* Right Column - Example Card and Seller Info (now 35% width) */}
        <div className="lg:col-span-4 space-y-8">
          <ExampleCard listing={listing} setInfo={setInfo} />
          <SellerInfo listing={listing} />
        </div>
      </div>
    </div>
  )
}

