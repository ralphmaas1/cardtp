import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const categories = [
  {
    id: "tgp",
    title: "Trading Card Games",
    description: "Magic: The Gathering, Pokémon, Yu-Gi-Oh and more collectible card games",
    image: "/placeholder.svg?height=300&width=500",
    href: "/categories/tgp", // Ensuring this links to the correct TGP category page
    count: 1248,
  },
  {
    id: "sports",
    title: "Sports Cards",
    description: "Baseball, basketball, football, soccer and other sports collectibles",
    image: "/placeholder.svg?height=300&width=500",
    href: "/categories/sports",
    count: 876,
  },
  {
    id: "entertainment",
    title: "Entertainment Cards",
    description: "Movie, TV show, celebrity and pop culture collectible cards",
    image: "/placeholder.svg?height=300&width=500",
    href: "/categories/entertainment",
    count: 543,
  },
]

export function CategoryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category) => (
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                <div className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-medium">
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

