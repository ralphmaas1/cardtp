import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check of de gebruiker is ingelogd
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Debug logging
  console.log("Middleware running on path:", req.nextUrl.pathname)
  console.log("Session exists:", !!session)

  // Als de gebruiker niet is ingelogd en probeert toegang te krijgen tot admin pagina's
  if (!session && req.nextUrl.pathname.startsWith("/admin")) {
    console.log("Redirecting to login - no session")
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Als de gebruiker is ingelogd, controleer of ze admin rechten hebben voor admin pagina's
  if (session && req.nextUrl.pathname.startsWith("/admin")) {
    // Haal de gebruikersrol op
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role:roles(name)")
      .eq("user_id", session.user.id)
      .single()

    console.log("User roles:", roles)

    const isAdmin = roles?.role?.name === "admin"
    const isModerator = roles?.role?.name === "moderator" || isAdmin

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
  }

  return res
}

// Configureer de middleware om alleen te draaien op admin routes
export const config = {
  matcher: ["/admin/:path*"],
}

