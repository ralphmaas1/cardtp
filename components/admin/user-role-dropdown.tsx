"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateUserRole } from "@/lib/users"
import { useToast } from "@/components/ui/use-toast"

interface UserRoleDropdownProps {
  userId: string
  initialRole: string
}

export function UserRoleDropdown({ userId, initialRole }: UserRoleDropdownProps) {
  const [role, setRole] = useState(initialRole)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleRoleChange = async (newRole: string) => {
    setIsLoading(true)
    try {
      // Bepaal de role_id op basis van de rolnaam
      let roleId = 1 // standaard gebruiker
      if (newRole === "admin") roleId = 3
      if (newRole === "moderator") roleId = 2

      // Roep de server action aan om de rol bij te werken
      await updateUserRole(userId, roleId)
      
      setRole(newRole)
      toast({
        title: "Rol bijgewerkt",
        description: `Gebruiker is nu een ${newRole}`,
      })
    } catch (error) {
      console.error("Error updating role:", error)
      toast({
        title: "Fout bij bijwerken rol",
        description: "Er is een fout opgetreden bij het bijwerken van de rol",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Select
      value={role}
      onValueChange={handleRoleChange}
      disabled={isLoading}
    >
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="Selecteer rol" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="user">Gebruiker</SelectItem>
        <SelectItem value="moderator">Moderator</SelectItem>
        <SelectItem value="admin">Beheerder</SelectItem>
      </SelectContent>
    </Select>
  )
}

