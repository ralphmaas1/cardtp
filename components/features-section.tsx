import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, ShoppingCart, Gavel, RefreshCw, Shield, CreditCard } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Upload className="h-10 w-10 text-primary" />,
      title: "Easy Card Uploads",
      description:
        "Upload your cards in minutes with our streamlined process. Add photos, descriptions, and set your price.",
    },
    {
      icon: <ShoppingCart className="h-10 w-10 text-primary" />,
      title: "Buy Instantly",
      description: "Find the cards you want and purchase them immediately at the listed price.",
    },
    {
      icon: <Gavel className="h-10 w-10 text-primary" />,
      title: "Dynamic Auctions",
      description: "Create auctions for your rare cards and watch as collectors bid to add them to their collection.",
    },
    {
      icon: <RefreshCw className="h-10 w-10 text-primary" />,
      title: "Trade Offers",
      description:
        "Propose and receive trade offers from other collectors. Expand your collection through strategic trades.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Buyer Protection",
      description: "Our secure platform ensures your purchases are protected with verification and dispute resolution.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Secure Payments",
      description: "Multiple payment options with secure processing. Funds are only released when you're satisfied.",
    },
  ]

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our platform makes it easy to buy, sell, and trade collectible cards with collectors worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-border/40 bg-secondary/50">
            <CardHeader className="pb-2">
              <div className="mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground text-sm">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

