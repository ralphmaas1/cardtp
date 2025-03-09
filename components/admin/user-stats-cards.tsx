// Vervang de useState en useEffect met server data
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, Users, UserCheck } from "lucide-react"

// Voeg props toe om de statistieken door te geven
export function UserStatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Totaal gebruikers</p>
            <h3 className="text-2xl font-bold mt-1">{stats.totalUsers.toLocaleString()}</h3>
            <p className="text-xs text-green-500 mt-1">+12% t.o.v. vorige maand</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Nieuwe gebruikers</p>
            <h3 className="text-2xl font-bold mt-1">{stats.newUsers.toLocaleString()}</h3>
            <p className="text-xs text-green-500 mt-1">Deze maand</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <UserPlus className="h-6 w-6 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Actieve gebruikers</p>
            <h3 className="text-2xl font-bold mt-1">{stats.activeUsers.toLocaleString()}</h3>
            <p className="text-xs text-green-500 mt-1">Afgelopen 30 dagen</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <UserCheck className="h-6 w-6 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Geverifieerde gebruikers</p>
            <h3 className="text-2xl font-bold mt-1">{stats.verifiedUsers.toLocaleString()}</h3>
            <p className="text-xs text-gray-500 mt-1">
              {((stats.verifiedUsers / stats.totalUsers) * 100).toFixed(1)}% van totaal
            </p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <UserCheck className="h-6 w-6 text-yellow-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

