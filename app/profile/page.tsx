import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Star, Settings, Edit, LogOut, Clock, CreditCard, MapPin, Mail, Phone } from "lucide-react"

export default function ProfilePage() {
  // Sample user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+31 6 12345678",
    address: "Amsterdamseweg 123, 1234 AB Amsterdam",
    memberSince: "March 2023",
    avatar: "/placeholder.svg?height=100&width=100",
  }

  // Sample stats for the profile
  const stats = [
    { name: "Purchases", value: "24", icon: ShoppingCart, change: "+3 this month" },
    { name: "Favorites", value: "16", icon: Heart, change: "2 new" },
    { name: "Reviews", value: "8", icon: Star, change: "Last week" },
    { name: "Active Deals", value: "3", icon: CreditCard, change: "Expires soon: 1" },
  ]

  // Sample recent activities
  const activities = [
    { action: "Purchased Gold Card Pack", time: "2 hours ago" },
    { action: "Added Black Diamond to favorites", time: "Yesterday" },
    { action: "Left a review for Premium Pack", time: "3 days ago" },
    { action: "Redeemed loyalty points", time: "1 week ago" },
  ]

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 pt-4">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* User Profile Card */}
      <Card className="mb-12">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-secondary overflow-hidden">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <Button size="sm" variant="outline" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground text-sm">Member since {user.memberSince}</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p className="text-xs text-primary mt-1">{stat.change}</p>
              </div>
              <div className="bg-secondary p-3 rounded-full">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your contact details and address</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Email Address</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Phone Number</p>
                <p className="text-sm text-muted-foreground">{user.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-muted-foreground">{user.address}</p>
              </div>
            </div>
            <Button className="w-full mt-2" variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Update Information
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {activities.map((activity, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button className="w-full mt-4" variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <ShoppingCart className="h-4 w-4 mr-2" />
              View Purchase History
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Heart className="h-4 w-4 mr-2" />
              Manage Favorites
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Star className="h-4 w-4 mr-2" />
              My Reviews
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Methods
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

