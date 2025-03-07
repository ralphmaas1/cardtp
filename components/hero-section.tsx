"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

// Create a simple context to share the login dialog state
// This is a simplified example - in a real app, you might want to use a more robust state management solution
export type AuthDialogContextType = {
  openLoginDialog?: (mode: "login" | "signup") => void
}

// This is a placeholder - you'll need to create this context in a separate file
// and wrap your app with a provider that supplies the actual implementation
export const AuthDialogContext = {
  openLoginDialog: undefined as ((mode: "login" | "signup") => void) | undefined,
}

export function HeroSection() {
  // In a real implementation, you would use useContext to get the openLoginDialog function
  // const { openLoginDialog } = useContext(AuthDialogContext)

  // For now, we'll just link to the marketplace
  return (
    <div className="relative overflow-hidden bg-background py-16 md:py-24">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">
            Buy, Sell & Trade Collectible Cards
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-foreground/90">
            The ultimate marketplace for card collectors and enthusiasts. Join thousands of traders and find your next
            rare gem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/marketplace">Explore Marketplace</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/sell">Start Selling</Link>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="flex items-center">
              <div className="bg-primary/20 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <span className="ml-2 text-foreground/80">Secure Transactions</span>
            </div>
            <div className="flex items-center">
              <div className="bg-primary/20 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <span className="ml-2 text-foreground/80">Verified Authenticity</span>
            </div>
            <div className="flex items-center">
              <div className="bg-primary/20 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="ml-2 text-foreground/80">No Hidden Fees</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

