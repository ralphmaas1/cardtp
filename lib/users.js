"use server"

import { supabaseAdmin } from "./supabase"
import { revalidatePath } from "next/cache"

// Alle gebruikers ophalen met hun rollen
export async function getUsers({ page = 1, limit = 10, search = "", role = null, status = null }) {
  const offset = (page - 1) * limit

  // Basis query
  let query = supabaseAdmin
    .from("profiles")
    .select(`
      id,
      name,
      avatar_url,
      updated_at,
      created_at,
      auth:auth.users!id(email, last_sign_in_at, created_at, user_metadata, banned_until),
      roles:user_roles(role:roles(id, name))
    `)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  // Zoekfilter toepassen
  if (search) {
    query = query.or(`name.ilike.%${search}%,auth.email.ilike.%${search}%`)
  }

  // Rolfilter toepassen
  if (role) {
    query = query.filter("roles.role.name", "eq", role)
  }

  // Statusfilter toepassen
  if (status === "active") {
    query = query.filter("auth.banned_until", "is", null)
  } else if (status === "banned") {
    query = query.filter("auth.banned_until", "not.is", null)
  }

  const { data: users, error, count } = await query

  if (error) {
    console.error("Error fetching users:", error)
    throw new Error("Kon gebruikers niet ophalen")
  }

  // Totaal aantal gebruikers ophalen voor paginering
  const { count: totalCount, error: countError } = await supabaseAdmin.from("profiles").select("id", { count: "exact" })

  if (countError) {
    console.error("Error counting users:", countError)
  }

  return {
    users: users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.auth?.email,
      avatarUrl: user.avatar_url,
      role: user.roles?.[0]?.role?.name || "user",
      status: user.auth?.banned_until ? "banned" : "active",
      lastActive: user.auth?.last_sign_in_at,
      createdAt: user.created_at,
    })),
    totalCount: totalCount || 0,
  }
}

// Gebruikersstatistieken ophalen
export async function getUserStats() {
  // Totaal aantal gebruikers
  const { count: totalUsers, error: totalError } = await supabaseAdmin.from("profiles").select("id", { count: "exact" })

  // Nieuwe gebruikers deze maand
  const currentDate = new Date()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString()

  const { count: newUsers, error: newError } = await supabaseAdmin
    .from("profiles")
    .select("id", { count: "exact" })
    .gte("created_at", firstDayOfMonth)

  // Actieve gebruikers laatste 30 dagen
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const { count: activeUsers, error: activeError } = await supabaseAdmin
    .from("user_sessions")
    .select("user_id", { count: "exact", countDistinct: true })
    .gte("last_active", thirtyDaysAgo.toISOString())

  // Geverifieerde gebruikers
  const { count: verifiedUsers, error: verifiedError } = await supabaseAdmin
    .from("auth.users")
    .select("id", { count: "exact" })
    .not("email_confirmed_at", "is", null)

  if (totalError || newError || activeError || verifiedError) {
    console.error("Error fetching user stats:", totalError || newError || activeError || verifiedError)
  }

  return {
    totalUsers: totalUsers || 0,
    newUsers: newUsers || 0,
    activeUsers: activeUsers || 0,
    verifiedUsers: verifiedUsers || 0,
  }
}

// Gebruiker ophalen op ID
export async function getUserById(userId) {
  const { data: user, error } = await supabaseAdmin
    .from("profiles")
    .select(`
      id,
      name,
      avatar_url,
      bio,
      website,
      phone,
      updated_at,
      created_at,
      auth:auth.users!id(email, last_sign_in_at, created_at, user_metadata, banned_until, email_confirmed_at),
      roles:user_roles(role:roles(id, name)),
      addresses:user_addresses(*),
      preferences:user_preferences(*),
      financials:user_financials(*)
    `)
    .eq("id", userId)
    .single()

  if (error) {
    console.error("Error fetching user:", error)
    throw new Error("Kon gebruiker niet ophalen")
  }

  // Gebruikersnotities ophalen
  const { data: notes, error: notesError } = await supabaseAdmin
    .from("user_notes")
    .select(`
      id,
      note,
      created_at,
      admin:profiles!admin_id(name)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (notesError) {
    console.error("Error fetching user notes:", notesError)
  }

  // Inloggeschiedenis ophalen
  const { data: sessions, error: sessionsError } = await supabaseAdmin
    .from("user_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(10)

  if (sessionsError) {
    console.error("Error fetching user sessions:", sessionsError)
  }

  // Recente zoekopdrachten ophalen
  const { data: searches, error: searchesError } = await supabaseAdmin
    .from("user_searches")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(10)

  if (searchesError) {
    console.error("Error fetching user searches:", searchesError)
  }

  return {
    id: user.id,
    name: user.name,
    email: user.auth?.email,
    avatarUrl: user.avatar_url,
    bio: user.bio,
    website: user.website,
    phone: user.phone,
    role: user.roles?.[0]?.role?.name || "user",
    status: user.auth?.banned_until ? "banned" : "active",
    verified: !!user.auth?.email_confirmed_at,
    lastActive: user.auth?.last_sign_in_at,
    createdAt: user.created_at,
    addresses: user.addresses || [],
    preferences: user.preferences || {},
    financials: user.financials || {},
    notes: notes || [],
    sessions: sessions || [],
    searches: searches?.map((s) => s.search_query) || [],
  }
}

// Gebruikersrol bijwerken
export async function updateUserRole(userId, roleId) {
  // Eerst bestaande rol verwijderen
  const { error: deleteError } = await supabaseAdmin.from("user_roles").delete().eq("user_id", userId)

  if (deleteError) {
    console.error("Error deleting user role:", deleteError)
    throw new Error("Kon gebruikersrol niet verwijderen")
  }

  // Nieuwe rol toevoegen
  const { error: insertError } = await supabaseAdmin.from("user_roles").insert({ user_id: userId, role_id: roleId })

  if (insertError) {
    console.error("Error inserting user role:", insertError)
    throw new Error("Kon gebruikersrol niet toevoegen")
  }

  // Activiteit loggen
  await supabaseAdmin.rpc("log_user_activity", {
    user_id: userId,
    activity_type: "role_updated",
    details: { role_id: roleId },
  })

  revalidatePath("/admin/users")
  revalidatePath(`/admin/users/${userId}`)

  return { success: true }
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

