"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Search, Menu } from "lucide-react"
import { useState } from "react"
import { LoginDialog } from "@/components/login-dialog"
import { LanguageSelector } from "@/components/language-selector"

export function Header() {
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <header className="sticky top-0 z-10">
      {/* Logo/Banner Area */}
      <div className="bg-background border-b border-border/40">
        <div className="container mx-auto flex justify-center items-center py-6 px-4">
          <div className="relative h-24 w-full max-w-3xl">
            <Image
              src="/placeholder.svg?height=96&width=768"
              alt="Card Trading Platform Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-background/95 backdrop-blur-sm border-b border-border/40">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            Card Trading Platform
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/marketplace" className="text-foreground hover:text-primary transition-colors">
              Marketplace
            </Link>
            <Link href="/auctions" className="text-foreground hover:text-primary transition-colors">
              Auctions
            </Link>
            <Link href="/trades" className="text-foreground hover:text-primary transition-colors">
              Trades
            </Link>
            <Link href="/sell" className="text-foreground hover:text-primary transition-colors">
              Sell Cards
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search cards..."
                className="h-9 w-[200px] rounded-md border border-input bg-secondary pl-8 pr-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setShowLoginDialog(true)} className="hidden sm:inline-flex">
              Log in
            </Button>
            <Button className="hidden sm:inline-flex">Sign up</Button>
            <LanguageSelector />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-border/40 bg-background">
            <div className="container mx-auto px-4 py-3 space-y-3">
              <Link
                href="/marketplace"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Marketplace
              </Link>
              <Link
                href="/auctions"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Auctions
              </Link>
              <Link
                href="/trades"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Trades
              </Link>
              <Link
                href="/sell"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Sell Cards
              </Link>
              <div className="pt-2 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowLoginDialog(true)
                    setShowMobileMenu(false)
                  }}
                  className="flex-1"
                >
                  Log in
                </Button>
                <Button className="flex-1">Sign up</Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </header>
  )
}

