"use server"

import { supabaseAdmin } from "./supabase"
import { revalidatePath } from "next/cache"

// Alle gebruikers ophalen met hun rollen
export async function getUsers({ page = 1, limit = 10, search = "", role = null, status = null }) {
  try {
    // Dummy data voor ontwikkeling
    const dummyUsers = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        avatarUrl: null,
        role: "admin",
        status: "active",
        lastActive: new Date().toISOString(),
        createdAt: "2023-01-01T00:00:00Z",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        avatarUrl: null,
        role: "moderator",
        status: "active",
        lastActive: new Date().toISOString(),
        createdAt: "2023-02-01T00:00:00Z",
      },
      {
        id: "3",
        name: "Bob Johnson",
        email: "bob@example.com",
        avatarUrl: null,
        role: "user",
        status: "inactive",
        lastActive: "2023-05-01T00:00:00Z",
        createdAt: "2023-03-01T00:00:00Z",
      },
      {
        id: "4",
        name: "Alice Brown",
        email: "alice@example.com",
        avatarUrl: null,
        role: "user",
        status: "active",
        lastActive: new Date().toISOString(),
        createdAt: "2023-04-01T00:00:00Z",
      },
      {
        id: "5",
        name: "Charlie Davis",
        email: "charlie@example.com",
        avatarUrl: null,
        role: "user",
        status: "banned",
        lastActive: "2023-06-01T00:00:00Z",
        createdAt: "2023-05-01T00:00:00Z",
      },
      {
        id: "6",
        name: "Eva Wilson",
        email: "eva@example.com",
        avatarUrl: null,
        role: "user",
        status: "active",
        lastActive: new Date().toISOString(),
        createdAt: "2023-06-01T00:00:00Z",
      },
    ]

    return {
      users: dummyUsers,
      totalCount: 235, // Dummy totaal aantal
    }
  } catch (error) {
    console.error("Error fetching users:", error)
    throw new Error("Kon gebruikers niet ophalen")
  }
}

// Gebruikersstatistieken ophalen
export async function getUserStats() {
  try {
    // Dummy statistieken voor ontwikkeling
    return {
      totalUsers: 235,
      newUsers: 42,
      activeUsers: 187,
      verifiedUsers: 210,
    }
  } catch (error) {
    console.error("Error fetching user stats:", error)
    throw new Error("Kon gebruikersstatistieken niet ophalen")
  }
}

// Gebruiker ophalen op ID
export async function getUserById(userId) {
  try {
    // Dummy gebruiker voor ontwikkeling
    return {
      id: userId,
      name: "John Doe",
      email: "john@example.com",
      avatarUrl: null,
      bio: "Lorem ipsum dolor sit amet",
      website: "https://example.com",
      phone: "+31612345678",
      role: "admin",
      status: "active",
      verified: true,
      lastActive: new Date().toISOString(),
      createdAt: "2023-01-01T00:00:00Z",
      addresses: [],
      preferences: {},
      financials: {},
      notes: [],
      sessions: [],
      searches: [],
    }
  } catch (error) {
    console.error("Error fetching user:", error)
    throw new Error("Kon gebruiker niet ophalen")
  }
}

// Gebruikersrol bijwerken
export async function updateUserRole(userId, roleId) {
  try {
    // Dummy implementatie voor ontwikkeling
    console.log(`Updating user ${userId} to role ${roleId}`)
    
    // Revalideer de paden om de UI bij te werken
    revalidatePath("/admin/users")
    revalidatePath(`/admin/users/${userId}`)
    
    return { success: true }
  } catch (error) {
    console.error("Error updating user role:", error)
    throw new Error("Kon gebruikersrol niet bijwerken")
  }
}

// Gebruikersstatus bijwerken (actief/geblokkeerd)
export async function updateUserStatus(userId, status) {
  let bannedUntil = null

  if (status === "banned") {
    // Blokkeren voor 100 jaar (effectief permanent)
    const date = new Date()
    date.setFullYear(date.getFullYear() + 100)
    bannedUntil = date.toISOString()
  }

  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, { banned_until: bannedUntil })

  if (error) {
    console.error("Error updating user status:", error)
    throw new Error("Kon gebruikersstatus niet bijwerken")
  }

  // Activiteit loggen
  await supabaseAdmin.rpc("log_user_activity", {
    user_id: userId,
    activity_type: "status_updated",
    details: { status },
  })

  revalidatePath("/admin/users")
  revalidatePath(`/admin/users/${userId}`)

  return { success: true }
}

// Gebruikersnotitie toevoegen
export async function addUserNote(userId, adminId, note) {
  const { error } = await supabaseAdmin.from("user_notes").insert({
    user_id: userId,
    admin_id: adminId,
    note,
  })

  if (error) {
    console.error("Error adding user note:", error)
    throw new Error("Kon gebruikersnotitie niet toevoegen")
  }

  revalidatePath(`/admin/users/${userId}`)

  return { success: true }
}

// Gebruikersactiviteit ophalen
export async function getUserActivity(userId, period = "year") {
  let interval
  const now = new Date()

  switch (period) {
    case "month":
      interval = "day"
      break
    case "year":
      interval = "month"
      break
    default:
      interval = "month"
  }

  // Activiteit per interval ophalen
  const { data, error } = await supabaseAdmin
    .from("user_activity")
    .select("created_at")
    .eq("user_id", userId)
    .gte(
      "created_at",
      period === "month"
        ? new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toISOString()
        : new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString(),
    )

  if (error) {
    console.error("Error fetching user activity:", error)
    throw new Error("Kon gebruikersactiviteit niet ophalen")
  }

  // Activiteit groeperen per interval
  const activityByInterval = {}

  if (interval === "day") {
    // Laatste 30 dagen
    for (let i = 0; i < 30; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const key = date.toISOString().split("T")[0]
      activityByInterval[key] = 0
    }
  } else {
    // Laatste 12 maanden
    for (let i = 0; i < 12; i++) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      activityByInterval[key] = 0
    }
  }

  // Activiteit tellen per interval
  data.forEach((item) => {
    const date = new Date(item.created_at)
    let key

    if (interval === "day") {
      key = date.toISOString().split("T")[0]
    } else {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    }

    if (activityByInterval[key] !== undefined) {
      activityByInterval[key]++
    }
  })

  // Omzetten naar array voor grafiek
  const activityData = Object.entries(activityByInterval)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({
      date,
      count,
    }))

  return activityData
}

// Alle beschikbare rollen ophalen
export async function getRoles() {
  const { data, error } = await supabaseAdmin.from("roles").select("*").order("id")

  if (error) {
    console.error("Error fetching roles:", error)
    throw new Error("Kon rollen niet ophalen")
  }

  return data
}

