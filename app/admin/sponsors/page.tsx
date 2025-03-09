import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash, Eye, LinkIcon, ExternalLink, DollarSign, BarChart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SponsorsPage() {
  // Sample sponsors data
  const sponsors = [
    {
      id: "sponsor-1",
      name: "CardWorld",
      website: "https://cardworld.example.com",
      logo: "/placeholder.svg?height=40&width=120",
      contactName: "John Smith",
      contactEmail: "john@cardworld.example.com",
      startDate: "2023-01-15",
      endDate: "2023-12-31",
      isActive: true,
      tier: "Platinum",
      affiliateLinks: 3,
    },
    {
      id: "sponsor-2",
      name: "CollectorsHub",
      website: "https://collectorshub.example.com",
      logo: "/placeholder.svg?height=40&width=120",
      contactName: "Jane Doe",
      contactEmail: "jane@collectorshub.example.com",
      startDate: "2023-02-10",
      endDate: "2023-08-10",
      isActive: true,
      tier: "Gold",
      affiliateLinks: 2,
    },
    {
      id: "sponsor-3",
      name: "RareFinds",
      website: "https://rarefinds.example.com",
      logo: "/placeholder.svg?height=40&width=120",
      contactName: "Mike Johnson",
      contactEmail: "mike@rarefinds.example.com",
      startDate: "2023-03-05",
      endDate: "2023-09-05",
      isActive: false,
      tier: "Silver",
      affiliateLinks: 1,
    },
  ]

  // Sample affiliate links data
  const affiliateLinks = [
    {
      id: "aff-1",
      name: "Pokémon Booster Box Promo",
      sponsor: "CardWorld",
      url: "https://cardworld.example.com/pokemon?ref=cardtp",
      banners: 2,
      clicks: 843,
      conversions: 56,
      revenue: 1120.0,
      isActive: true,
      lastClicked: "2023-06-15",
    },
    {
      id: "aff-2",
      name: "Sports Cards Special",
      sponsor: "CollectorsHub",
      url: "https://collectorshub.example.com/sports?ref=cardtp",
      banners: 1,
      clicks: 562,
      conversions: 38,
      revenue: 760.0,
      isActive: true,
      lastClicked: "2023-06-14",
    },
    {
      id: "aff-3",
      name: "Magic Cards Bundle",
      sponsor: "CardWorld",
      url: "https://cardworld.example.com/magic?ref=cardtp",
      banners: 1,
      clicks: 321,
      conversions: 24,
      revenue: 480.0,
      isActive: true,
      lastClicked: "2023-06-12",
    },
    {
      id: "aff-4",
      name: "Vintage Cards Collection",
      sponsor: "RareFinds",
      url: "https://rarefinds.example.com/vintage?ref=cardtp",
      banners: 0,
      clicks: 187,
      conversions: 12,
      revenue: 240.0,
      isActive: false,
      lastClicked: "2023-06-01",
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sponsors & Affiliates</h1>
          <p className="text-gray-500">Manage sponsors and affiliate partnerships</p>
        </div>
      </div>

      <Tabs defaultValue="sponsors" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
          <TabsTrigger value="affiliates">Affiliate Links</TabsTrigger>
        </TabsList>

        <TabsContent value="sponsors">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Sponsor Management</CardTitle>
                <CardDescription>Manage your sponsorship partnerships</CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Sponsor
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="relative w-72">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="search" placeholder="Search sponsors..." className="pl-8" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sponsor</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Links</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sponsors.map((sponsor) => (
                    <TableRow key={sponsor.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-20">
                            <img
                              src={sponsor.logo || "/placeholder.svg"}
                              alt={sponsor.name}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{sponsor.name}</div>
                            <a
                              href={sponsor.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 flex items-center"
                            >
                              {sponsor.website.replace("https://", "")}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{sponsor.contactName}</div>
                        <div className="text-xs text-gray-500">{sponsor.contactEmail}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(sponsor.startDate).toLocaleDateString()} -
                          {new Date(sponsor.endDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {Math.round(
                            (new Date(sponsor.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                          )}{" "}
                          days left
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            sponsor.tier === "Platinum"
                              ? "bg-purple-100 text-purple-800"
                              : sponsor.tier === "Gold"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {sponsor.tier}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            sponsor.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {sponsor.isActive ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <LinkIcon className="h-3 w-3 mr-1 text-gray-500" />
                          <span>{sponsor.affiliateLinks}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <LinkIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="affiliates">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Affiliate Links</CardTitle>
                <CardDescription>Manage your affiliate links and track performance</CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Affiliate Link
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="relative w-72">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="search" placeholder="Search affiliate links..." className="pl-8" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <BarChart className="h-4 w-4 mr-2" />
                    Performance Report
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Sponsor</TableHead>
                    <TableHead>Banners</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {affiliateLinks.map((link) => (
                    <TableRow key={link.id}>
                      <TableCell>
                        <div className="font-medium">{link.name}</div>
                        <div className="text-xs text-gray-500 truncate max-w-xs">{link.url}</div>
                      </TableCell>
                      <TableCell>{link.sponsor}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="mr-1">{link.banners}</span>
                          {link.banners === 0 && (
                            <span className="text-xs text-yellow-600 bg-yellow-100 px-1.5 py-0.5 rounded">
                              Unlinked
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs">
                          <div>{link.clicks.toLocaleString()} clicks</div>
                          <div>{link.conversions.toLocaleString()} conversions</div>
                          <div className="text-green-600">
                            {((link.conversions / link.clicks) * 100).toFixed(1)}% conversion rate
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-green-600 font-medium">
                          <DollarSign className="h-3 w-3 mr-0.5" />
                          {link.revenue.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            link.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {link.isActive ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <LinkIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Link Banners</CardTitle>
            <CardDescription>Connect affiliate links to banners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Link Assignment</h3>
                <p className="text-sm text-gray-500 mb-4">Select a banner and affiliate link to connect them</p>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Select Banner</label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                      <option>Pokémon Series Banner</option>
                      <option>Sports Cards Promo</option>
                      <option>Magic: The Gathering Special</option>
                      <option>Entertainment Cards Showcase</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Select Affiliate Link</label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                      <option>Pokémon Booster Box Promo</option>
                      <option>Sports Cards Special</option>
                      <option>Magic Cards Bundle</option>
                      <option>Vintage Cards Collection</option>
                    </select>
                  </div>

                  <Button className="w-full">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Link Banner to Affiliate
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Current Links</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center">
                    <span>Pokémon Series Banner</span>
                    <span className="text-gray-500">→</span>
                    <span>Pokémon Booster Box Promo</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Sports Cards Promo</span>
                    <span className="text-gray-500">→</span>
                    <span>Sports Cards Special</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Magic: The Gathering Special</span>
                    <span className="text-gray-500">→</span>
                    <span>Magic Cards Bundle</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Affiliate Performance</CardTitle>
            <CardDescription>Track the performance of your affiliate links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Revenue Overview</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm">Total Revenue</span>
                  <span className="text-lg font-bold text-green-600">$2,600.00</span>
                </div>
                <div className="h-24 bg-gray-100 rounded-md flex items-end justify-between p-2">
                  <div className="w-8 bg-primary h-12 rounded-t"></div>
                  <div className="w-8 bg-primary h-16 rounded-t"></div>
                  <div className="w-8 bg-primary h-20 rounded-t"></div>
                  <div className="w-8 bg-primary h-14 rounded-t"></div>
                  <div className="w-8 bg-primary h-18 rounded-t"></div>
                  <div className="w-8 bg-primary h-10 rounded-t"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Top Performing Links</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pokémon Booster Box Promo</span>
                    <span className="text-sm font-medium text-green-600">$1,120.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sports Cards Special</span>
                    <span className="text-sm font-medium text-green-600">$760.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Magic Cards Bundle</span>
                    <span className="text-sm font-medium text-green-600">$480.00</span>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <BarChart className="h-4 w-4 mr-2" />
                View Detailed Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

