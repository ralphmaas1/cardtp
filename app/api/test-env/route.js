export async function GET() {
  return Response.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'missing',
    hasAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? true : false,
    hasServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? true : false
  })
} 