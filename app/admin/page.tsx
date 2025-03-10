import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tag, Image, LinkIcon, Users, ShoppingCart, MessageSquare, AlertCircle } from "lucide-react"

export default function AdminDashboard() {
  // Sample stats for the dashboard
  const stats = [
    { name: "Total Users", value: "2,543", icon: Users, change: "+12%" },
    { name: "Active Listings", value: "8,942", icon: ShoppingCart, change: "+23%" },
    { name: "Categories", value: "32", icon: Tag, change: "+2" },
    { name: "Banners", value: "18", icon: Image, change: "+3" },
  ]

  // Sample recent activities
  const activities = [
    { action: "New category created", user: "Admin", time: "2 hours ago" },
    { action: "Banner updated", user: "Admin", time: "5 hours ago" },
    { action: "New affiliate link added", user: "Admin", time: "1 day ago" },
    { action: "Category order changed", user: "Admin", time: "2 days ago" },
  ]

  // Sample alerts
  const alerts = [
    { message: "3 banners are missing alt text", severity: "warning" },
    { message: "2 affiliate links have expired", severity: "error" },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Welcome to the website management dashboard</p>
        </div>
        <Button>Refresh Data</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p className="text-xs text-green-500 mt-1">{stat.change}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">
                <stat.icon className="h-6 w-6 text-gray-700" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common management tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <Tag className="h-4 w-4 mr-2" />
              Add New Category
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Image className="h-4 w-4 mr-2" />
              Upload Banner
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <LinkIcon className="h-4 w-4 mr-2" />
              Add Affiliate Link
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              View Messages
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on the website</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {activities.map((activity, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Issues that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            {alerts.length > 0 ? (
              <ul className="space-y-3">
                {alerts.map((alert, index) => (
                  <li
                    key={index}
                    className={`p-3 rounded-md flex items-start gap-3 ${
                      alert.severity === "error" ? "bg-red-50" : "bg-yellow-50"
                    }`}
                  >
                    <AlertCircle
                      className={`h-5 w-5 ${alert.severity === "error" ? "text-red-500" : "text-yellow-500"}`}
                    />
                    <p className="text-sm">{alert.message}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No alerts at this time</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

