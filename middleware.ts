import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  // Maak een response object dat we kunnen aanpassen
  const res = NextResponse.next()
  
  // Log cookies voor debugging
  const cookies = req.cookies.getAll()
  console.log("Cookies in request:", cookies.map(c => c.name))
  
  // Gebruik createMiddlewareClient om een nieuwe Supabase client te maken specifiek voor de middleware
  const supabase = createMiddlewareClient({ req, res })

  // Check of de gebruiker is ingelogd
  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession()

  // Debug logging
  console.log("Middleware running on path:", req.nextUrl.pathname)
  console.log("Session exists:", !!session)
  console.log("Session error:", sessionError)
  
  if (session) {
    console.log("User ID:", session.user.id)
    console.log("User email:", session.user.email)
  }

  // Als de gebruiker niet is ingelogd en probeert toegang te krijgen tot admin pagina's
  if (!session && req.nextUrl.pathname.startsWith("/admin")) {
    console.log("Redirecting to login - no session")
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Als de gebruiker is ingelogd, controleer of ze admin rechten hebben voor admin pagina's
  if (session && req.nextUrl.pathname.startsWith("/admin")) {
    try {
      // Haal de gebruikersrol op
      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("role:roles(name)")
        .eq("user_id", session.user.id)
        .single()

      if (error) {
        console.error("Error fetching user roles:", error)
        // Als er een fout is bij het ophalen van de rol, ga ervan uit dat de gebruiker geen admin is
        console.log("Redirecting to home - error fetching roles")
        return NextResponse.redirect(new URL("/", req.url))
      }

      console.log("User roles:", roles)

      // Controleer of roles en role bestaan
      if (!roles || !roles.role) {
        console.log("No roles found for user, redirecting to home")
        return NextResponse.redirect(new URL("/", req.url))
      }

      // Fix voor de typefout in de middleware
      // @ts-ignore - We weten dat role een object is met een name property
      const roleName = roles.role.name
      const isAdmin = roleName === "admin"
      const isModerator = roleName === "moderator" || isAdmin

      console.log("Role name:", roleName)
      console.log("Is admin:", isAdmin)
      console.log("Is moderator:", isModerator)

      // Als de gebruiker geen admin is, redirect naar de homepage
      if (!isAdmin && !req.nextUrl.pathname.startsWith("/admin/moderator")) {
        console.log("Redirecting to home - not admin")
        return NextResponse.redirect(new URL("/", req.url))
      }

      // Als de gebruiker geen moderator is en probeert toegang te krijgen tot moderator pagina's
      if (!isModerator && req.nextUrl.pathname.startsWith("/admin/moderator")) {
        console.log("Redirecting to admin - not moderator")
        return NextResponse.redirect(new URL("/admin", req.url))
      }
    } catch (error) {
      console.error("Unexpected error in middleware:", error)
      // Bij een onverwachte fout, redirect naar de homepage
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  return res
}

// Configureer de middleware om alleen te draaien op specifieke routes
// We schakelen de middleware uit voor admin routes omdat we nu server-side authenticatie gebruiken
export const config = {
  matcher: [
    // Voeg hier routes toe waar je de middleware wilt gebruiken
    // Bijvoorbeeld: "/api/:path*"
  ],
}

