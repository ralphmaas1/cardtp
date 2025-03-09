"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, Image, Tag, LinkIcon, Settings, Users, BarChart, Search, Bell, Shield } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutGrid },
    { name: "Categories", href: "/admin/categories", icon: Tag },
    { name: "Banners", href: "/admin/banners", icon: Image },
    { name: "Sponsors & Affiliates", href: "/admin/sponsors", icon: LinkIcon },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart },
    { name: "SEO", href: "/admin/seo", icon: Search },
    { name: "Notifications", href: "/admin/notifications", icon: Bell },
    { name: "Moderation", href: "/admin/moderation", icon: Shield },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="w-64 border-r border-gray-200 h-screen sticky top-0 overflow-y-auto bg-white">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">CardTP Admin</h1>
        <p className="text-sm text-gray-500">Website Management</p>
      </div>

      <nav className="mt-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-6 py-3 text-sm ${
                    isActive
                      ? "bg-gray-100 text-primary font-medium border-l-4 border-primary"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className={`h-5 w-5 mr-3 ${isActive ? "text-primary" : "text-gray-400"}`} />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

