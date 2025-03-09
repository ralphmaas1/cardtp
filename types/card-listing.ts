export interface CardListing {
  id: string
  title: string
  cardNumber: string
  rarity: string
  image: string
  price: number
  shippingCost: number
  listingType: "buy-now" | "auction" | "trade"
  endTime?: string
  currentBids?: number
  quality: number
  description?: string
  grading?: {
    company: "PSA" | "BGS" | "CGC" | "SGC"
    grade: number
  }
  seller: {
    id: string
    name: string
    rating: number
    country: string
    flag: string
  }
  tradeOptions?: {
    available: boolean
    wantList?: string[]
  }
}

