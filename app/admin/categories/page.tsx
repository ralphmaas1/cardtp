import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash, MoveUp, MoveDown, Eye } from "lucide-react"

export default function CategoriesPage() {
  // Sample categories data
  const categories = [
    {
      id: "tgp",
      name: "Trading Card Games",
      slug: "tgp",
      description: "Trading card games like Pokémon, Magic, etc.",
      listingCount: 1248,
      subcategories: 9,
      isActive: true,
      order: 1,
    },
    {
      id: "sports",
      name: "Sports Cards",
      slug: "sports",
      description: "Sports collectible cards for various leagues",
      listingCount: 876,
      subcategories: 6,
      isActive: true,
      order: 2,
    },
    {
      id: "entertainment",
      name: "Entertainment Cards",
      slug: "entertainment",
      description: "Movie, TV show, and celebrity cards",
      listingCount: 543,
      subcategories: 4,
      isActive: true,
      order: 3,
    },
    {
      id: "vintage",
      name: "Vintage Cards",
      slug: "vintage",
      description: "Vintage and antique collectible cards",
      listingCount: 312,
      subcategories: 3,
      isActive: false,
      order: 4,
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
          <p className="text-gray-500">Manage website categories and subcategories</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Category Management</CardTitle>
          <CardDescription>Create, edit, and organize categories for your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Search categories..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Import
              </Button>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Listings</TableHead>
                <TableHead>Subcategories</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>{category.listingCount}</TableCell>
                  <TableCell>{category.subcategories}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        category.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>{category.order}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoveDown className="h-4 w-4" />
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
            <CardTitle>Category Structure</CardTitle>
            <CardDescription>View and manage the hierarchical structure of categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-4">
              <ul className="space-y-2">
                <li>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Trading Card Games</span>
                    <Button variant="ghost" size="sm">
                      Expand
                    </Button>
                  </div>
                </li>
                <li className="ml-6 border-l pl-4 border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Pokémon</span>
                    <Button variant="ghost" size="sm">
                      Expand
                    </Button>
                  </div>
                </li>
                <li className="ml-12 border-l pl-4 border-gray-200">
                  <span>Scarlet & Violet</span>
                </li>
                <li className="ml-12 border-l pl-4 border-gray-200">
                  <span>Sword & Shield</span>
                </li>
                <li className="ml-6 border-l pl-4 border-gray-200">
                  <span>Magic: The Gathering</span>
                </li>
                <li className="ml-6 border-l pl-4 border-gray-200">
                  <span>Yu-Gi-Oh!</span>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Sports Cards</span>
                    <Button variant="ghost" size="sm">
                      Expand
                    </Button>
                  </div>
                </li>
                <li>
                  <span className="font-medium">Entertainment Cards</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Settings</CardTitle>
            <CardDescription>Configure global settings for categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Category Image</label>
              <div className="border border-dashed rounded-md p-4 text-center">
                <p className="text-sm text-gray-500">Drag and drop an image or</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Choose File
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category Display Options</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="show-count" className="rounded" />
                  <label htmlFor="show-count" className="text-sm">
                    Show listing count
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="show-desc" className="rounded" />
                  <label htmlFor="show-desc" className="text-sm">
                    Show category description
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="show-subcats" className="rounded" />
                  <label htmlFor="show-subcats" className="text-sm">
                    Show subcategories
                  </label>
                </div>
              </div>
            </div>

            <Button className="w-full">Save Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

