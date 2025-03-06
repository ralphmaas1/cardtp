import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "I've been collecting cards for over 20 years, and this platform has revolutionized how I trade. Found cards I've been searching for since the 90s!",
      name: "Michael R.",
      role: "Sports Card Collector",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "As a seller, I appreciate how easy it is to list my cards and reach serious collectors. The auction feature helped me get top dollar for my rare Pokémon cards.",
      name: "Sarah T.",
      role: "TCG Enthusiast",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "The trading feature is fantastic. I've completed over 50 trades in just a few months, each one smooth and secure. This community is amazing!",
      name: "David K.",
      role: "Magic: The Gathering Player",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands of satisfied collectors who buy, sell, and trade on our platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="border-border/40 bg-secondary/50">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="text-foreground/90 italic mb-4">"{testimonial.quote}"</p>
            </CardContent>
            <CardFooter className="flex flex-col items-center border-t border-border/40 pt-4">
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

