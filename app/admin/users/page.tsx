import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  Filter,
  Download,
  Mail,
  Shield,
  UserIcon,
  MoreHorizontal,
  ArrowUpRight,
  Ban,
  UserCheck,
  UserX,
} from "lucide-react"
import Link from "next/link"
import { UserStatsCards } from "@/components/admin/user-stats-cards"
import { UserRoleDropdown } from "@/components/admin/user-role-dropdown"

export default function UsersPage() {
  // Sample users data
  const users = [
    {
      id: "user-1",
      name: "John Smith",
      username: "johnsmith",
      email: "john.smith@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "admin",
      status: "active",
      verified: true,
      lastActive: "2023-06-15T14:30:00",
      registeredDate: "2022-01-10T09:15:00",
      listings: 24,
      purchases: 12,
    },
    {
      id: "user-2",
      name: "Jane Doe",
      username: "janedoe",
      email: "jane.doe@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "user",
      status: "active",
      verified: true,
      lastActive: "2023-06-14T10:45:00",
      registeredDate: "2022-03-22T11:30:00",
      listings: 8,
      purchases: 15,
    },
    {
      id: "user-3",
      name: "Robert Johnson",
      username: "robjohnson",
      email: "robert.johnson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "user",
      status: "inactive",
      verified: true,
      lastActive: "2023-05-20T16:15:00",
      registeredDate: "2022-02-15T14:20:00",
      listings: 0,
      purchases: 3,
    },
    {
      id: "user-4",
      name: "Emily Wilson",
      username: "emilyw",
      email: "emily.wilson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "moderator",
      status: "active",
      verified: true,
      lastActive: "2023-06-15T09:10:00",
      registeredDate: "2022-04-05T08:45:00",
      listings: 12,
      purchases: 7,
    },
    {
      id: "user-5",
      name: "Michael Brown",
      username: "mikebrown",
      email: "michael.brown@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "user",
      status: "suspended",
      verified: true,
      lastActive: "2023-04-10T11:20:00",
      registeredDate: "2022-05-18T13:30:00",
      listings: 5,
      purchases: 2,
    },
    {
      id: "user-6",
      name: "Sarah Davis",
      username: "sarahdavis",
      email: "sarah.davis@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "user",
      status: "active",
      verified: false,
      lastActive: "2023-06-13T15:40:00",
      registeredDate: "2023-06-10T10:15:00",
      listings: 0,
      purchases: 0,
    },
  ]

  // Function to get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("nl-NL", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Function to calculate time since last active
  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60))
        return `${diffMinutes} minuten geleden`
      }
      return `${diffHours} uur geleden`
    } else if (diffDays === 1) {
      return "gisteren"
    } else {
      return `${diffDays} dagen geleden`
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gebruikersbeheer</h1>
          <p className="text-gray-500">Beheer gebruikersaccounts en rollen</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Stuur e-mail
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nieuwe gebruiker
          </Button>
        </div>
      </div>

      {/* User Statistics */}
      <UserStatsCards />

      {/* User Management Tabs */}
      <Tabs defaultValue="all-users" className="mt-8">
        <TabsList>
          <TabsTrigger value="all-users">Alle gebruikers</TabsTrigger>
          <TabsTrigger value="admins">Beheerders</TabsTrigger>
          <TabsTrigger value="moderators">Moderators</TabsTrigger>
          <TabsTrigger value="new-users">Nieuwe gebruikers</TabsTrigger>
          <TabsTrigger value="inactive">Inactieve gebruikers</TabsTrigger>
        </TabsList>

        <TabsContent value="all-users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Gebruikersoverzicht</CardTitle>
              <CardDescription>Beheer alle geregistreerde gebruikers op het platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="search" placeholder="Zoek gebruikers..." className="pl-8" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exporteer
                  </Button>
                </div>
              </div>

              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Gebruiker</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Geverifieerd</TableHead>
                      <TableHead>Laatste activiteit</TableHead>
                      <TableHead>Geregistreerd</TableHead>
                      <TableHead>Activiteit</TableHead>
                      <TableHead className="text-right">Acties</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 rounded-full overflow-hidden">
                              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="object-cover" />
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-gray-500">{user.email}</div>
                              <div className="text-xs text-gray-400">@{user.username}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <UserRoleDropdown userId={user.id} initialRole={user.role} />
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(user.status)}`}>
                            {user.status === "active"
                              ? "Actief"
                              : user.status === "inactive"
                                ? "Inactief"
                                : "Geschorst"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {user.verified ? (
                            <span className="flex items-center text-green-600">
                              <UserCheck className="h-4 w-4 mr-1" />
                              Ja
                            </span>
                          ) : (
                            <span className="flex items-center text-yellow-600">
                              <UserX className="h-4 w-4 mr-1" />
                              Nee
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{getTimeSince(user.lastActive)}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(user.lastActive).toLocaleTimeString("nl-NL", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(user.registeredDate)}</TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <div>{user.listings} advertenties</div>
                            <div>{user.purchases} aankopen</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/admin/users/${user.id}`}>
                                <ArrowUpRight className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Ban className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">Toont 1-6 van 235 gebruikers</div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Vorige
                  </Button>
                  <Button variant="outline" size="sm" className="bg-gray-100">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Volgende
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs would have similar content but filtered */}
        <TabsContent value="admins" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Beheerders</CardTitle>
              <CardDescription>Beheer gebruikers met beheerdersrechten</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Inhoud voor beheerders tab...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderators" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Moderators</CardTitle>
              <CardDescription>Beheer gebruikers met moderatorrechten</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Inhoud voor moderators tab...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new-users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Nieuwe gebruikers</CardTitle>
              <CardDescription>Gebruikers die zich recent hebben geregistreerd</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Inhoud voor nieuwe gebruikers tab...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Inactieve gebruikers</CardTitle>
              <CardDescription>Gebruikers die meer dan 30 dagen inactief zijn</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Inhoud voor inactieve gebruikers tab...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional User Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Bulk acties</CardTitle>
            <CardDescription>Voer acties uit op meerdere gebruikers tegelijk</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Selecteer actie</label>
              <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                <option>Stuur e-mail naar geselecteerde gebruikers</option>
                <option>Wijzig rol van geselecteerde gebruikers</option>
                <option>Activeer geselecteerde gebruikers</option>
                <option>Deactiveer geselecteerde gebruikers</option>
                <option>Verwijder geselecteerde gebruikers</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Selecteer gebruikers</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                multiple
                size={4}
              >
                <option>Alle gebruikers</option>
                <option>Inactieve gebruikers</option>
                <option>Niet-geverifieerde gebruikers</option>
                <option>Gebruikers zonder aankopen</option>
              </select>
            </div>

            <Button className="w-full">Voer actie uit</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gebruikersrollen</CardTitle>
            <CardDescription>Beheer en configureer gebruikersrollen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">Beheerder</div>
                    <div className="text-xs text-gray-500">Volledige toegang tot alle functies</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Bewerken
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Moderator</div>
                    <div className="text-xs text-gray-500">Kan inhoud modereren en gebruikers beheren</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Bewerken
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <UserIcon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium">Gebruiker</div>
                    <div className="text-xs text-gray-500">Standaard gebruikersrechten</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Bewerken
                </Button>
              </div>

              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Nieuwe rol toevoegen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

