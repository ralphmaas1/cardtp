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

// Singleton patroon voor Supabase clients
let supabaseInstance = null
let supabaseAdminInstance = null

// Client voor client-side gebruik (beperkte rechten)
export const supabase = (() => {
  if (supabaseInstance) return supabaseInstance
  
  // Configuratie voor cookies
  const options = {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      // Zorg ervoor dat cookies correct worden ingesteld
      storageKey: 'supabase-auth',
      storage: {
        getItem: (key) => {
          if (typeof window === 'undefined') return null
          const value = localStorage.getItem(key)
          return value
        },
        setItem: (key, value) => {
          if (typeof window === 'undefined') return
          localStorage.setItem(key, value)
          // Zet ook een cookie voor de middleware
          document.cookie = `${key}=${value}; path=/; max-age=31536000; SameSite=Lax`
        },
        removeItem: (key) => {
          if (typeof window === 'undefined') return
          localStorage.removeItem(key)
          // Verwijder ook de cookie
          document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
        },
      },
    },
  }
  
  supabaseInstance = createClient(
    supabaseUrl || "https://dummy.supabase.co", 
    supabaseAnonKey || "dummy",
    options
  )
  
  return supabaseInstance
})()

// Client voor server-side gebruik (admin rechten)
// Alleen gebruiken in server components of server actions!
export const createServiceRoleClient = () => {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Supabase URL of Service Role Key ontbreekt. Controleer je .env.local bestand."
    )
  }
  
  if (!supabaseAdminInstance) {
    supabaseAdminInstance = createClient(
      supabaseUrl, 
      supabaseServiceKey, 
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )
  }
  
  return supabaseAdminInstance
}

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
    const serviceClient = createServiceRoleClient()
    const { data, error } = await serviceClient.rpc("is_admin", { user_id: userId })

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
    const serviceClient = createServiceRoleClient()
    const { data, error } = await serviceClient.rpc("is_moderator", { user_id: userId })

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

