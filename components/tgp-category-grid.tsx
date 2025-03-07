import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const tgpCategories = [
  {
    id: "pokemon",
    title: "Pokémon",
    description: "Gotta catch 'em all! Find rare Pokémon cards from all generations.",
    image: "/placeholder.svg?height=300&width=500",
    href: "/categories/tgp/pokemon",
    count: 458,
    color: "bg-yellow-500", // Pokémon logo yellow
  },
  {
    id: "magic",
    title: "Magic: The Gathering",
    description: "Discover powerful spells and creatures from the world's first trading card game.",
    image: "/placeholder.svg?height=300&width=500",
    href: "/categories/tgp/magic",
    count: 623,
    color: "bg-blue-600", // MTG blue mana color
  },
  {
    id: "yugioh",
    title: "Yu-Gi-Oh!",
    description: "It's time to duel! Explore cards from the popular anime and manga series.",
    image: "/placeholder.svg?height=300&width=500",
    href: "/categories/tgp/yugioh",
    count: 387,
    color: "bg-purple-700", // Dark purple from Millennium items
  },
  {
    id: "onepiece",
    title: "One Piece Card Game",
    description: "Set sail with Luffy and the Straw Hat Pirates in this exciting card game.",
    image: "/placeholder.svg?height=300&width=500",
    href: "/categories/tgp/onepiece",
    count: 156,
    color: "bg-red-600", // One Piece logo red
  },
  {
    id: "dragonball",
    title: "Dragon Ball",
    description: "Power up your collection with cards featuring Goku, Vegeta, and other Z fighters.",
    image: "/placeholder.svg?height=300&width=500",
    href: "/categories/tgp/dragonball",
    count: 214,
    color: "bg-orange-500", // Dragon Ball orange
  },
  {
    id: "vanguard",
    title: "Vanguard",
    description: "Stand up, Vanguard! Collect cards from this popular Japanese franchise.",
    image: "/placeholder.svg?height=300&width=500",
    href: "/categories/tgp/vanguard",
    count: 132,
    color: "bg-red-500", // Vanguard red
  },
  {
    id: "finalfantasy",
    title: "Final Fantasy",
    description: "Collect cards featuring iconic characters and summons from the beloved RPG series.",
    image: "/placeholder.svg?height=300&width=500",
    href: "/categories/tgp/finalfantasy",
    count: 98,
    color: "bg-sky-600", // Final Fantasy blue
  },
  {
    id: "wow",
    title: "World of Warcraft",
    description: "For the Horde! For the Alliance! Collect cards from Azeroth and beyond.",
    image: "/placeholder.svg?height=300&width=500",
    href: "/categories/tgp/wow",
    count: 87,
    color: "bg-amber-600", // WoW gold/amber
  },
  {
    id: "digimon",
    title: "Digimon Card Game",
    description: "Digivolve your collection with cards featuring your favorite Digital Monsters.",
    image: "/placeholder.svg?height=300&width=500",
    href: "/categories/tgp/digimon",
    count: 143,
    color: "bg-blue-500", // Digimon blue
  },
]

export function TgpCategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tgpCategories.map((category) => (
        <Link href={category.href} key={category.id} className="block group">
          <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
            <div className="relative h-48 w-full">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                priority
              />
              <div className={`absolute inset-0 ${category.color} opacity-85`} />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                <div className="bg-background text-foreground rounded-full px-3 py-1 text-sm font-medium">
                  {category.count.toLocaleString()} listings
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-muted-foreground">{category.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

