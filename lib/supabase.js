import { createClient } from "@supabase/supabase-js"

// Hardcoded fallback waarden voor development
const FALLBACK_URL = "https://cszbcmxuomimthmavzsj.supabase.co"
const FALLBACK_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzemJjbXh1b21pbXRobWF2enNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMTc5NDQsImV4cCI6MjA1Njc5Mzk0NH0.JNI2MkZrJ4yr6gGWIIUsb26IQb4hXS1brRWmW2hsyyw"
const FALLBACK_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzemJjbXh1b21pbXRobWF2enNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTIxNzk0NCwiZXhwIjoyMDU2NzkzOTQ0fQ.OjgGegW_pSnOEH_pA5IKvOb4d4idl8w9s52bH1eJ1Cc"

// Controleer of we in een browser of op de server zijn
const isBrowser = typeof window !== 'undefined'

// Gebruik altijd de fallback waarden om ervoor te zorgen dat de app werkt
// De environment variabelen worden alleen gebruikt als ze beschikbaar zijn
const supabaseUrl = FALLBACK_URL
const supabaseAnonKey = FALLBACK_ANON_KEY
const supabaseServiceKey = FALLBACK_SERVICE_KEY

// Client voor client-side gebruik (beperkte rechten)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

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

