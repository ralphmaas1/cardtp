"use client"

import { useState } from "react"
import { CardListingItem } from "@/components/pokemon/card-listing-item"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCardListings } from "@/data/card-listings"
import { Grid, List } from "lucide-react"

export function CardListingsGrid({ setId }: { setId: string }) {
  const [sortBy, setSortBy] = useState("price-low")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Get card listings for this set
  const listings = getCardListings(setId)

  // Function to sort listings based on selected option
  const getSortedListings = () => {
    const sortedListings = [...listings]

    switch (sortBy) {
      case "price-low":
        return sortedListings.sort((a, b) => a.price - b.price)
      case "price-high":
        return sortedListings.sort((a, b) => b.price - a.price)
      case "grade-high":
        return sortedListings.sort((a, b) => {
          const gradeA = a.grading?.grade || 0
          const gradeB = b.grading?.grade || 0
          return gradeB - gradeA
        })
      case "newest":
        // In a real app, you would sort by listing date
        return sortedListings
      case "ending-soon":
        // In a real app, you would sort by auction end time
        return sortedListings
          .filter((l) => l.listingType === "auction")
          .concat(sortedListings.filter((l) => l.listingType !== "auction"))
      default:
        return sortedListings
    }
  }

  const sortedListings = getSortedListings()

  return (
    <div>
      {/* Sorting and View Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="grade-high">Grade: High to Low</SelectItem>
              <SelectItem value="newest">Newest Listings</SelectItem>
              <SelectItem value="ending-soon">Ending Soon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">View:</span>
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-none px-3"
            >
              <Grid className="h-4 w-4 mr-1" />
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-none px-3"
            >
              <List className="h-4 w-4 mr-1" />
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">Showing {sortedListings.length} results</p>
      </div>

      {/* Card Listings Grid */}
      <div
        className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
      >
        {sortedListings.map((listing) => (
          <CardListingItem key={listing.id} listing={listing} viewMode={viewMode} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <div className="flex space-x-1">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="default" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

