import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash, Eye, LinkIcon } from "lucide-react"
import Image from "next/image"

export default function BannersPage() {
  // Sample banners data
  const banners = [
    {
      id: "banner-1",
      name: "Pokémon Series Banner",
      category: "Trading Card Games > Pokémon",
      image: "/placeholder.svg?height=100&width=300",
      dimensions: "3000 x 686",
      hasAffiliate: true,
      isActive: true,
      position: "Top",
      views: 12453,
      clicks: 843,
    },
    {
      id: "banner-2",
      name: "Sports Cards Promo",
      category: "Sports Cards",
      image: "/placeholder.svg?height=100&width=300",
      dimensions: "3000 x 686",
      hasAffiliate: false,
      isActive: true,
      position: "Top",
      views: 8721,
      clicks: 562,
    },
    {
      id: "banner-3",
      name: "Magic: The Gathering Special",
      category: "Trading Card Games > Magic",
      image: "/placeholder.svg?height=100&width=300",
      dimensions: "3000 x 686",
      hasAffiliate: true,
      isActive: false,
      position: "Middle",
      views: 5432,
      clicks: 321,
    },
    {
      id: "banner-4",
      name: "Entertainment Cards Showcase",
      category: "Entertainment Cards",
      image: "/placeholder.svg?height=100&width=300",
      dimensions: "3000 x 686",
      hasAffiliate: false,
      isActive: true,
      position: "Bottom",
      views: 3245,
      clicks: 187,
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Banners</h1>
          <p className="text-gray-500">Manage website banners and promotional images</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Banner
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Banner Management</CardTitle>
          <CardDescription>Upload, edit, and organize banners for your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Search banners..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Bulk Upload
              </Button>
              <Button variant="outline" size="sm">
                Optimize All
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Banner</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Affiliate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stats</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <div className="relative h-12 w-36 rounded overflow-hidden">
                      <Image src={banner.image || "/placeholder.svg"} alt={banner.name} fill className="object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>{banner.name}</div>
                    <div className="text-xs text-gray-500">{banner.dimensions}</div>
                  </TableCell>
                  <TableCell>{banner.category}</TableCell>
                  <TableCell>
                    {banner.hasAffiliate ? (
                      <span className="flex items-center text-green-600">
                        <LinkIcon className="h-3 w-3 mr-1" />
                        Linked
                      </span>
                    ) : (
                      <span className="text-gray-500">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        banner.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {banner.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <div>{banner.views.toLocaleString()} views</div>
                      <div>{banner.clicks.toLocaleString()} clicks</div>
                      <div className="text-green-600">{((banner.clicks / banner.views) * 100).toFixed(1)}% CTR</div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Banner Dimensions</CardTitle>
            <CardDescription>Recommended dimensions for different banner positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Category Banners</h3>
                <p className="text-sm text-gray-500 mb-2">Used at the top of category pages</p>
                <div className="flex items-center justify-between text-sm">
                  <span>Recommended size:</span>
                  <span className="font-medium">3000 x 686 pixels (4.37:1)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Max file size:</span>
                  <span className="font-medium">2MB</span>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Homepage Banners</h3>
                <p className="text-sm text-gray-500 mb-2">Used in the homepage carousel</p>
                <div className="flex items-center justify-between text-sm">
                  <span>Recommended size:</span>
                  <span className="font-medium">1600 x 800 pixels (2:1)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Max file size:</span>
                  <span className="font-medium">3MB</span>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Sidebar Banners</h3>
                <p className="text-sm text-gray-500 mb-2">Used in the sidebar of listing pages</p>
                <div className="flex items-center justify-between text-sm">
                  <span>Recommended size:</span>
                  <span className="font-medium">300 x 600 pixels (1:2)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Max file size:</span>
                  <span className="font-medium">1MB</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Banner Performance</CardTitle>
            <CardDescription>View performance metrics for your banners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Top Performing Banners</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pokémon Series Banner</span>
                    <span className="text-sm font-medium text-green-600">6.8% CTR</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sports Cards Promo</span>
                    <span className="text-sm font-medium text-green-600">6.4% CTR</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Magic: The Gathering Special</span>
                    <span className="text-sm font-medium text-green-600">5.9% CTR</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Banner Optimization Tips</h3>
                <ul className="text-sm space-y-2 list-disc list-inside text-gray-700">
                  <li>Use high-quality images with clear text</li>
                  <li>Keep file sizes small for faster loading</li>
                  <li>Include a clear call-to-action</li>
                  <li>Test different designs and track performance</li>
                  <li>Ensure banners are mobile-responsive</li>
                </ul>
              </div>

              <Button className="w-full">View Detailed Analytics</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

