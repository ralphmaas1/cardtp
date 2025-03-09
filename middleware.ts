import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

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
  const supabase = createMiddlewareClient({ req, res })
  
  // Check of de gebruiker is ingelogd
  const { data: { session } } = await supabase.auth.getSession()
  
  // Als de gebruiker niet is ingelogd en probeert toegang te krijgen tot admin pagina's
  if (!session && req.nextUrl.pathname.startsWith('/admin')) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }
  
  // Als de gebruiker is ingelogd, controleer of ze admin rechten hebben voor admin pagina's
  if (session && req.nextUrl.pathname.startsWith('/admin')) {
    // Haal de gebruikersrol op
    const { data: userRole } = await supabase
      .from('user_roles')
      .select('role:roles(name)')
      .eq('user_id', session.user.id)
      .single()
    
    // Cast het resultaat naar het juiste type
    const typedUserRole = userRole as UserRoleResult | null
    
    // Controleer de rol van de gebruiker
    const roleName = typedUserRole?.role?.name
    const isAdmin = roleName === 'admin'
    const isModerator = roleName === 'moderator' || isAdmin
    
    // Als de gebruiker geen admin is, redirect naar de homepage
    if (!isAdmin && !req.nextUrl.pathname.startsWith('/admin/moderator')) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    
    // Als de gebruiker geen moderator is en probeert toegang te krijgen tot moderator pagina's
    if (!isModerator && req.nextUrl.pathname.startsWith('/admin/moderator')) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  }
  
  return res
}

// Configureer de middleware om alleen te draaien op admin routes
export const config = {
  matcher: ['/admin/:path*'],
}

