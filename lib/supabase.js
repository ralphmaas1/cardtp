import { createClient } from "@supabase/supabase-js"

// Supabase client aanmaken met environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Client voor client-side gebruik (beperkte rechten)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client voor server-side gebruik (admin rechten)
// Alleen gebruiken in server components of server actions!
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Helper functie om de huidige gebruiker op te halen
export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.user || null
}

// Helper functie om te controleren of een gebruiker admin is
export async function isAdmin(userId) {
  if (!userId) return false

  const { data, error } = await supabaseAdmin.rpc("is_admin", { user_id: userId })

  if (error) {
    console.error("Error checking admin status:", error)
    return false
  }

  return data || false
}

// Helper functie om te controleren of een gebruiker moderator is
export async function isModerator(userId) {
  if (!userId) return false

  const { data, error } = await supabaseAdmin.rpc("is_moderator", { user_id: userId })

  if (error) {
    console.error("Error checking moderator status:", error)
    return false
  }

  return data || false
}

