"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, User, Check, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface UserRoleDropdownProps {
  userId: string
  initialRole: string
}

export function UserRoleDropdown({ userId, initialRole }: UserRoleDropdownProps) {
  const [role, setRole] = useState(initialRole)

  const handleRoleChange = (newRole: string) => {
    // In a real app, you would make an API call here
    console.log(`Changing user ${userId} role to ${newRole}`)
    setRole(newRole)
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
        <Button variant="ghost" className={`px-2 py-1 h-auto text-xs rounded-full ${getRoleColor()}`}>
          <span className="flex items-center">
            {getRoleIcon()}
            {getRoleLabel()}
            <ChevronDown className="h-3 w-3 ml-1" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => handleRoleChange("admin")} className="cursor-pointer">
          <Shield className="h-4 w-4 mr-2 text-purple-600" />
          <span>Beheerder</span>
          {role === "admin" && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleChange("moderator")} className="cursor-pointer">
          <Shield className="h-4 w-4 mr-2 text-blue-600" />
          <span>Moderator</span>
          {role === "moderator" && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleChange("user")} className="cursor-pointer">
          <User className="h-4 w-4 mr-2 text-gray-600" />
          <span>Gebruiker</span>
          {role === "user" && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

