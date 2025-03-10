"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, User, Check, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { updateUserRole } from "@/lib/users"

interface UserRoleDropdownProps {
  userId: string
  initialRole: string
  roles?: { id: number; name: string }[]
}

export function UserRoleDropdown({ userId, initialRole, roles = [] }: UserRoleDropdownProps) {
  const [role, setRole] = useState(initialRole)
  const [isLoading, setIsLoading] = useState(false)

  // Standaard rollen als er geen worden doorgegeven
  const availableRoles =
    roles.length > 0
      ? roles
      : [
          { id: 1, name: "admin" },
          { id: 2, name: "moderator" },
          { id: 3, name: "user" },
        ]

  const handleRoleChange = async (newRole: string, roleId: number) => {
    if (role === newRole) return

    setIsLoading(true)
    try {
      await updateUserRole(userId, roleId)
      setRole(newRole)
    } catch (error) {
      console.error("Error updating role:", error)
      alert("Kon rol niet bijwerken")
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleIcon = () => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4 mr-2 text-purple-600" />
      case "moderator":
        return <Shield className="h-4 w-4 mr-2 text-blue-600" />
      default:
        return <User className="h-4 w-4 mr-2 text-gray-600" />
    }
  }

  const getRoleLabel = () => {
    switch (role) {
      case "admin":
        return "Beheerder"
      case "moderator":
        return "Moderator"
      default:
        return "Gebruiker"
    }
  }

  const getRoleColor = () => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800"
      case "moderator":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`px-2 py-1 h-auto text-xs rounded-full ${getRoleColor()}`}
          disabled={isLoading}
        >
          <span className="flex items-center">
            {getRoleIcon()}
            {getRoleLabel()}
            {isLoading ? "..." : <ChevronDown className="h-3 w-3 ml-1" />}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {availableRoles.map((roleItem) => (
          <DropdownMenuItem
            key={roleItem.id}
            onClick={() => handleRoleChange(roleItem.name, roleItem.id)}
            className="cursor-pointer"
          >
            {roleItem.name === "admin" && <Shield className="h-4 w-4 mr-2 text-purple-600" />}
            {roleItem.name === "moderator" && <Shield className="h-4 w-4 mr-2 text-blue-600" />}
            {roleItem.name === "user" && <User className="h-4 w-4 mr-2 text-gray-600" />}
            <span>
              {roleItem.name === "admin" ? "Beheerder" : roleItem.name === "moderator" ? "Moderator" : "Gebruiker"}
            </span>
            {role === roleItem.name && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

