import { CardItem } from "@/components/card-item"

// Sample card data
const cards = [
  {
    id: 1,
    title: "Design System",
    description: "A collection of reusable components for your application.",
    tags: ["UI", "Components", "Design"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Authentication",
    description: "Secure user authentication and authorization flows.",
    tags: ["Security", "Users", "Auth"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Database Schema",
    description: "Optimized database structure for your application.",
    tags: ["Database", "Schema", "Data"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "API Integration",
    description: "Connect your application with external services.",
    tags: ["API", "Integration", "Services"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Performance Optimization",
    description: "Techniques to improve your application's performance.",
    tags: ["Performance", "Optimization", "Speed"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Responsive Design",
    description: "Create layouts that work on any device.",
    tags: ["Responsive", "Design", "Mobile"],
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function CardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  )
}

