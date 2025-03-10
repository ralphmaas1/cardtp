import { createClient } from "@supabase/supabase-js"

// Haal de omgevingsvariabelen op
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Controleer of de benodigde omgevingsvariabelen zijn ingesteld
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Waarschuwing: Supabase omgevingsvariabelen ontbreken. Controleer of NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY zijn ingesteld in .env.local"
  )
}

// Dummy sleutels voor als de echte sleutels ontbreken (alleen voor ontwikkeling)
// In productie zou dit een fout moeten geven
const dummyKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1bW15IiwiaWF0IjoxNjE2OTYwMDAwLCJleHAiOjE2MTY5NjAwMDB9.dummy"

// Client voor client-side gebruik (beperkte rechten)
export const supabase = createClient(
  supabaseUrl || "https://dummy.supabase.co", 
  supabaseAnonKey || dummyKey
)

// Client voor server-side gebruik (admin rechten)
// Alleen gebruiken in server components of server actions!
export const supabaseAdmin = createClient(
  supabaseUrl || "https://dummy.supabase.co", 
  supabaseServiceKey || dummyKey, 
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

// Helper functie om de huidige gebruiker op te halen
export async function getCurrentUser() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session?.user || null
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Helper functie om te controleren of een gebruiker admin is
export async function isAdmin(userId) {
  if (!userId) return false

  try {
    const { data, error } = await supabaseAdmin.rpc("is_admin", { user_id: userId })

    if (error) {
      console.error("Error checking admin status:", error)
      return false
    }

    return data || false
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

// Helper functie om te controleren of een gebruiker moderator is
export async function isModerator(userId) {
  if (!userId) return false

  try {
    const { data, error } = await supabaseAdmin.rpc("is_moderator", { user_id: userId })

    if (error) {
      console.error("Error checking moderator status:", error)
      return false
    }

    return data || false
  } catch (error) {
    console.error("Error checking moderator status:", error)
    return false
  }
}

