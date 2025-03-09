import type { ReactNode } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white min-h-screen flex">
      <AdminSidebar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  )
}

