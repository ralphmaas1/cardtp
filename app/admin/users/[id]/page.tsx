import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Ban, BarChart, Eye, Trash, Shield, Lock, UserCheck, AlertTriangle, CreditCard, MapPin, Globe, Phone, MessageSquare, Tag, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { UserRoleDropdown } from "@/components/admin/user-role-dropdown"
import { UserActivityChart } from "@/components/admin/user-activity-chart"
//import { createClient } from "@/lib/supabase/
import { createClient } from "@supabase/supabase-js"

// Definieer het type voor de gebruiker
interface User {
  id: string
  name: string
  username: string
  email: string
  avatar: string
  role: string
  phone: string
  website: string
  registeredDate: string
  lastActive: string
  purchases: number
  listings: number
  totalPurchases: number
  totalSales: number
  address: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  preferences: {
    notifications: boolean
    newsletter: boolean
    twoFactorAuth: boolean
  }
  membershipLevel: string
  loginHistory: Array<{
    date: string
    ip: string
    device: string
  }>
  recentSearches: string[]
  notes: string
}

async function UserDetailPage({ params }: { params: { id: string } }) {
  // Gebruik de supabase client voor server-side operaties
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  // Haal de gebruiker op uit Supabase
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', params.id)
    .single()
  
  // Als er een fout is, toon dan een foutmelding
  if (error) {
    console.error("Error fetching user:", error)
    return <div>Er is een fout opgetreden bij het ophalen van de gebruiker.</div>
  }
  
  // Cast de data naar het User interface
  const user = data as User
  
  // Als de gebruiker niet is gevonden, toon dan een melding
  if (!user) {
    return <div>Gebruiker niet gevonden.</div>
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/users">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug naar gebruikers
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* User Profile Card */}
        <Card className="md:w-1/3">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4">
                <Image
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name || "User avatar"}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-gray-500">@{user?.username}</p>
            
              <div className="mt-2 flex items-center">
                <UserRoleDropdown userId={user.id} initialRole={user.role} />
              </div>

              <div className="mt-4 w-full">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-500">Lid sinds</span>
                  <span>{new Date(user.registeredDate).toLocaleDateString("nl-NL")}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-500">Laatste activiteit</span>
                  <span>{new Date(user.lastActive).toLocaleDateString("nl-NL")}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-500">E-mail</span>
                  <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                    {user.email}
                  </a>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-500">Telefoon</span>
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-500">Locatie</span>
                  <span>
                    {user.address.city}, {user.address.country}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Details Tabs */}
        <div className="flex-1">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overzicht</TabsTrigger>
              <TabsTrigger value="activity">Activiteit</TabsTrigger>
              <TabsTrigger value="listings">Advertenties</TabsTrigger>
              <TabsTrigger value="purchases">Aankopen</TabsTrigger>
              <TabsTrigger value="security">Beveiliging</TabsTrigger>
              <TabsTrigger value="notes">Notities</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Gebruikersoverzicht</CardTitle>
                  <CardDescription>Bekijk een samenvatting van de gebruikersactiviteit en -gegevens</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center">
                        <ShoppingCart className="h-8 w-8 text-blue-500 mb-2" />
                        <span className="text-2xl font-bold">{user.purchases}</span>
                        <span className="text-sm text-gray-500">Aankopen</span>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center">
                        <Tag className="h-8 w-8 text-green-500 mb-2" />
                        <span className="text-2xl font-bold">{user.listings}</span>
                        <span className="text-sm text-gray-500">Advertenties</span>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center">
                        <MessageSquare className="h-8 w-8 text-purple-500 mb-2" />
                        <span className="text-2xl font-bold">38</span>
                        <span className="text-sm text-gray-500">Berichten</span>
                      </CardContent>
                    </Card>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-3">Financieel overzicht</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center p-4 border rounded-md">
                        <CreditCard className="h-10 w-10 text-gray-400 mr-4" />
                        <div>
                          <div className="text-sm text-gray-500">Totale uitgaven</div>
                          <div className="text-xl font-bold">€{user.totalPurchases.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 border rounded-md">
                        <CreditCard className="h-10 w-10 text-gray-400 mr-4" />
                        <div>
                          <div className="text-sm text-gray-500">Totale verkopen</div>
                          <div className="text-xl font-bold">€{user.totalSales.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-3">Persoonlijke informatie</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium">Adres</div>
                          <div className="text-gray-500">
                            {user.address.street}
                            <br />
                            {user.address.postalCode} {user.address.city}
                            <br />
                            {user.address.country}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium">Website</div>
                          <a
                            href={user.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {user.website}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium">Telefoon</div>
                          <div className="text-gray-500">{user.phone}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-3">Voorkeuren</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <span>Notificaties</span>
                        <span className={user.preferences.notifications ? "text-green-600" : "text-red-600"}>
                          {user.preferences.notifications ? "Aan" : "Uit"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <span>Nieuwsbrief</span>
                        <span className={user.preferences.newsletter ? "text-green-600" : "text-red-600"}>
                          {user.preferences.newsletter ? "Aan" : "Uit"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <span>Twee-factor authenticatie</span>
                        <span className={user.preferences.twoFactorAuth ? "text-green-600" : "text-red-600"}>
                          {user.preferences.twoFactorAuth ? "Aan" : "Uit"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <span>Lidmaatschap</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                          {user.membershipLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Gebruikersactiviteit</CardTitle>
                  <CardDescription>Bekijk de activiteitsgeschiedenis van deze gebruiker</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Activiteitsoverzicht</h3>
                    <UserActivityChart userId={user.id} />
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-lg font-medium mb-3">Recente inloggeschiedenis</h3>
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Datum & tijd
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              IP-adres
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Apparaat
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {user.loginHistory.map((login, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatDate(login.date)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{login.ip}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{login.device}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-lg font-medium mb-3">Recente zoekopdrachten</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.recentSearches.map((search, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          {search}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="listings">
              <Card>
                <CardHeader>
                  <CardTitle>Gebruikersadvertenties</CardTitle>
                  <CardDescription>Bekijk en beheer de advertenties van deze gebruiker</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Inhoud voor advertenties tab...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="purchases">
              <Card>
                <CardHeader>
                  <CardTitle>Gebruikersaankopen</CardTitle>
                  <CardDescription>Bekijk de aankoopgeschiedenis van deze gebruiker</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Inhoud voor aankopen tab...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Accountbeveiliging</CardTitle>
                  <CardDescription>Beheer beveiligingsinstellingen voor deze gebruiker</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Beveiligingsstatus</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-green-500 mr-2" />
                          <span>E-mail verificatie</span>
                        </div>
                        <span className="text-green-600">Geverifieerd</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-green-500 mr-2" />
                          <span>Twee-factor authenticatie</span>
                        </div>
                        <span className="text-green-600">Ingeschakeld</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-green-500 mr-2" />
                          <span>Laatste wachtwoord wijziging</span>
                        </div>
                        <span>30 dagen geleden</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                          <span>Verdachte activiteit</span>
                        </div>
                        <span>Geen</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Beveiligingsacties</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="justify-start">
                        <Lock className="h-4 w-4 mr-2" />
                        Reset wachtwoord
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Stuur verificatie e-mail
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Ban className="h-4 w-4 mr-2" />
                        Blokkeer account
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Verwijder account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Beheerdernotities</CardTitle>
                  <CardDescription>Interne notities over deze gebruiker</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md bg-yellow-50">
                      <p className="text-sm">{user.notes}</p>
                      <div className="mt-2 text-xs text-gray-500">Toegevoegd door: Admin • 10 mei 2023</div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Voeg een notitie toe</label>
                      <textarea
                        className="w-full border rounded-md p-2 min-h-[100px]"
                        placeholder="Schrijf hier een notitie over deze gebruiker..."
                      ></textarea>
                      <Button className="mt-2">Notitie opslaan</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-4">
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Bekijk profiel
        </Button>
        <Button variant="outline" size="sm">
          <BarChart className="h-4 w-4 mr-2" />
          Activiteitsrapport
        </Button>
        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <Ban className="h-4 w-4 mr-2" />
          Blokkeer gebruiker
        </Button>
        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <Trash className="h-4 w-4 mr-2" />
          Verwijder gebruiker
        </Button>
      </div>
    </div>
  )
}

export default UserDetailPage
