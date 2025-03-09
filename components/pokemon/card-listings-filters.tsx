"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function CardListingsFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000])

  // Sample grading companies
  const gradingCompanies = [
    { id: "psa", name: "PSA" },
    { id: "bgs", name: "BGS" },
    { id: "cgc", name: "CGC" },
    { id: "sgc", name: "SGC" },
    { id: "raw", name: "Raw (Ungraded)" },
  ]

  // Sample countries
  const countries = [
    { id: "us", name: "United States" },
    { id: "ca", name: "Canada" },
    { id: "uk", name: "United Kingdom" },
    { id: "de", name: "Germany" },
    { id: "fr", name: "France" },
    { id: "jp", name: "Japan" },
    { id: "au", name: "Australia" },
  ]

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-3">
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="multiple" defaultValue={["price", "grading", "quality", "location"]}>
          {/* Price Filter */}
          <AccordionItem value="price">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider value={priceRange} min={0} max={1000} step={10} onValueChange={setPriceRange} />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>$</span>
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                      className="w-20 h-8"
                    />
                  </div>
                  <span>to</span>
                  <div className="flex items-center space-x-2">
                    <span>$</span>
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                      className="w-20 h-8"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-shipping" />
                  <Label htmlFor="include-shipping">Include shipping costs</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Grading Filter */}
          <AccordionItem value="grading">
            <AccordionTrigger>Grading</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {gradingCompanies.map((company) => (
                  <div key={company.id} className="flex items-center space-x-2">
                    <Checkbox id={`grading-${company.id}`} />
                    <Label htmlFor={`grading-${company.id}`}>{company.name}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Quality Filter */}
          <AccordionItem value="quality">
            <AccordionTrigger>Quality Rating</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <div className="grid grid-cols-5 gap-1">
                  {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((rating) => (
                    <Button key={rating} variant="outline" className="h-8 w-8 p-0">
                      {rating}
                    </Button>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">Select quality ratings (10 = Gem Mint, 1 = Poor)</div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Location Filter */}
          <AccordionItem value="location">
            <AccordionTrigger>Seller Location</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {countries.map((country) => (
                  <div key={country.id} className="flex items-center space-x-2">
                    <Checkbox id={`country-${country.id}`} />
                    <Label htmlFor={`country-${country.id}`}>{country.name}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Listing Type Filter */}
          <AccordionItem value="listing-type">
            <AccordionTrigger>Listing Type</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="buy-now" />
                  <Label htmlFor="buy-now">Buy Now</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="auction" />
                  <Label htmlFor="auction">Auction</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="trade" />
                  <Label htmlFor="trade">Trade Available</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex flex-col space-y-2">
          <Button>Apply Filters</Button>
          <Button variant="outline">Reset Filters</Button>
        </div>
      </CardContent>
    </Card>
  )
}

