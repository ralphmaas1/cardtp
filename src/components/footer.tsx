import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Youtube, Mail, Shield, CreditCard, HelpCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary mt-16 border-t border-border/40">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Card Trading Platform</h3>
            <p className="text-muted-foreground mb-4">
              The premier marketplace for card collectors. Buy, sell, trade, and auction your collectible cards with our
              secure platform.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Marketplace</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/marketplace" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Cards
                </Link>
              </li>
              <li>
                <Link href="/auctions" className="text-muted-foreground hover:text-primary transition-colors">
                  Live Auctions
                </Link>
              </li>
              <li>
                <Link href="/trades" className="text-muted-foreground hover:text-primary transition-colors">
                  Trade Offers
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-muted-foreground hover:text-primary transition-colors">
                  Sell Your Cards
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">
                  Card Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <HelpCircle size={16} className="mr-2 text-primary" />
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li className="flex items-center">
                <Shield size={16} className="mr-2 text-primary" />
                <Link href="/buyer-protection" className="text-muted-foreground hover:text-primary transition-colors">
                  Buyer Protection
                </Link>
              </li>
              <li className="flex items-center">
                <CreditCard size={16} className="mr-2 text-primary" />
                <Link href="/payment-options" className="text-muted-foreground hover:text-primary transition-colors">
                  Payment Options
                </Link>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-primary" />
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to get updates on rare card listings, auctions, and trading tips.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="bg-background border-border" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border/40 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Card Trading Platform. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

