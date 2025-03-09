"use server"

import { addUserNote, updateUserStatus } from "@/lib/users"
import { getCurrentUser } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function addNote(formData: FormData) {
  const userId = formData.get("userId") as string
  const note = formData.get("note") as string

  if (!userId || !note) {
    return { error: "Gebruikers-ID en notitie zijn verplicht" }
  }

  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return { error: "Je moet ingelogd zijn om een notitie toe te voegen" }
    }

    await addUserNote(userId, currentUser.id, note)

    revalidatePath(`/admin/users/${userId}`)

    return { success: true }
  } catch (error) {
    console.error("Error adding note:", error)
    return { error: "Kon notitie niet toevoegen" }
  }
}

export async function banUser(userId: string) {
  if (!userId) {
    return { error: "Gebruikers-ID is verplicht" }
  }

  try {
    await updateUserStatus(userId, "banned")

    revalidatePath(`/admin/users/${userId}`)
    revalidatePath("/admin/users")

    return { success: true }
  } catch (error) {
    console.error("Error banning user:", error)
    return { error: "Kon gebruiker niet blokkeren" }
  }
}

export async function activateUser(userId: string) {
  if (!userId) {
    return { error: "Gebruikers-ID is verplicht" }
  }

  try {
    await updateUserStatus(userId, "active")

    revalidatePath(`/admin/users/${userId}`)
    revalidatePath("/admin/users")

    return { success: true }
  } catch (error) {
    console.error("Error activating user:", error)
    return { error: "Kon gebruiker niet activeren" }
  }
}

