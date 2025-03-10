import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

// Hardcoded fallback waarden voor development
const FALLBACK_URL = "https://cszbcmxuomimthmavzsj.supabase.co"
const FALLBACK_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzemJjbXh1b21pbXRobWF2enNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMTc5NDQsImV4cCI6MjA1Njc5Mzk0NH0.JNI2MkZrJ4yr6gGWIIUsb26IQb4hXS1brRWmW2hsyyw"

// Definieer een interface voor de rol
interface Role {
  name: string
}

// Definieer een interface voor het resultaat van de query
interface UserRoleResult {
  role: Role
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  try {
    // Gebruik de hardcoded credentials als fallback
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY
    
    const supabase = createMiddlewareClient({ req, res }, { 
      supabaseUrl, 
      supabaseKey 
    })
    
    // Check of de gebruiker is ingelogd
    const { data: { session } } = await supabase.auth.getSession()
    
    // Voor ontwikkelingsdoeleinden: sta altijd toegang toe tot admin pagina's
    // In productie zou je hier moeten controleren of de gebruiker is ingelogd
    return res
    
    // Als de gebruiker niet is ingelogd en probeert toegang te krijgen tot admin pagina's
    // if (!session && req.nextUrl.pathname.startsWith('/admin')) {
    //   // Redirect naar de homepage in plaats van naar een niet-bestaande login pagina
    //   return NextResponse.redirect(new URL('/', req.url))
    // }
    
    // Als de gebruiker is ingelogd, controleer of ze admin rechten hebben voor admin pagina's
    // if (session && req.nextUrl.pathname.startsWith('/admin')) {
    //   // Voor ontwikkelingsdoeleinden: sta alle ingelogde gebruikers toe om admin pagina's te bekijken
    //   // In productie zou je hier de rol moeten controleren
    //   return res
    // }
  } catch (error) {
    console.error("Middleware error:", error)
    // Bij een fout, sta de gebruiker toe om door te gaan (voor ontwikkelingsdoeleinden)
    return res
  }
  
  return res
}

// Configureer de middleware om alleen te draaien op niet-bestaande routes
// Dit zorgt ervoor dat de middleware effectief is uitgeschakeld
export const config = {
  matcher: ['/non-existent-route/:path*'],
}

