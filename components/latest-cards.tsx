import { CardItem } from "@/components/card-item"

// Sample latest cards data with prices and listing types
const latestCards = [
  {
    id: 1,
    title: "Charizard Holo 1st Edition",
    description: "Pokémon Base Set, PSA 9 Mint Condition",
    tags: ["Pokémon", "TGP", "Rare"],
    image: "/placeholder.svg?height=350&width=250",
    category: "tgp",
    price: 12500,
    listingType: "auction",
    bids: 18,
    timeLeft: "2 days",
  },
  {
    id: 2,
    title: "Michael Jordan Rookie Card",
    description: "1986 Fleer #57, BGS 8.5 Near Mint-Mint+",
    tags: ["Basketball", "Sports", "Vintage"],
    image: "/placeholder.svg?height=350&width=250",
    category: "sports",
    price: 8750,
    listingType: "buy-now",
  },
  {
    id: 3,
    title: "Black Lotus Alpha",
    description: "Magic: The Gathering Alpha Edition, Graded BGS 8",
    tags: ["Magic", "TGP", "Power Nine"],
    image: "/placeholder.svg?height=350&width=250",
    category: "tgp",
    price: 45000,
    listingType: "auction",
    bids: 32,
    timeLeft: "4 hours",
  },
  {
    id: 4,
    title: "Star Wars: A New Hope",
    description: "Original 1977 Topps Complete Set",
    tags: ["Movies", "Entertainment", "Vintage"],
    image: "/placeholder.svg?height=350&width=250",
    category: "entertainment",
    price: 1200,
    listingType: "buy-now",
  },
  {
    id: 5,
    title: "Tom Brady Rookie Card",
    description: "2000 Playoff Contenders #144 Autographed",
    tags: ["Football", "Sports", "Autograph"],
    image: "/placeholder.svg?height=350&width=250",
    category: "sports",
    price: 15000,
    listingType: "trade",
  },
  {
    id: 6,
    title: "Stranger Things Season 1",
    description: "Limited Edition Collector Cards",
    tags: ["TV Shows", "Entertainment", "Limited"],
    image: "/placeholder.svg?height=350&width=250",
    category: "entertainment",
    price: 350,
    listingType: "buy-now",
  },
]

export function LatestCards() {
  return (
    <div className="flex justify-center overflow-x-auto pb-4">
      <div className="flex gap-4 snap-x max-w-full">
        {latestCards.map((card) => (
          <div key={card.id} className="snap-start min-w-[180px] max-w-[180px] flex-shrink-0">
            <CardItem card={card} compact={true} />
          </div>
        ))}
      </div>
    </div>
  )
}

