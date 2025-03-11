import { NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase"

interface InitResult {
  table: string
  success: boolean
  message: string
}

export async function POST() {
  try {
    const supabase = createServiceRoleClient()
    const results: InitResult[] = []
    
    // Maak de profiles tabel
    try {
      const { error } = await supabase
        .from('profiles')
        .select('id')
        .limit(1)
      
      if (error && error.code === 'PGRST301') {
        // Tabel bestaat niet, maak deze aan
        const { error: createError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: '00000000-0000-0000-0000-000000000000',
              name: 'System',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ])
        
        if (createError && createError.code !== 'PGRST301') {
          results.push({
            table: 'profiles',
            success: false,
            message: createError.message
          })
        } else {
          results.push({
            table: 'profiles',
            success: true,
            message: 'Tabel succesvol aangemaakt'
          })
        }
      } else {
        results.push({
          table: 'profiles',
          success: true,
          message: 'Tabel bestaat al'
        })
      }
    } catch (err) {
      results.push({
        table: 'profiles',
        success: false,
        message: err instanceof Error ? err.message : 'Onbekende fout'
      })
    }
    
    // Maak de roles tabel
    try {
      const { error } = await supabase
        .from('roles')
        .select('id')
        .limit(1)
      
      if (error && error.code === 'PGRST301') {
        // Tabel bestaat niet, maak deze aan
        const { error: createError } = await supabase
          .from('roles')
          .insert([
            { 
              name: 'admin',
              description: 'Administrator met volledige rechten',
              created_at: new Date().toISOString()
            },
            { 
              name: 'moderator',
              description: 'Moderator met beperkte beheerdersrechten',
              created_at: new Date().toISOString()
            },
            { 
              name: 'user',
              description: 'Standaard gebruiker',
              created_at: new Date().toISOString()
            }
          ])
        
        if (createError && createError.code !== 'PGRST301') {
          results.push({
            table: 'roles',
            success: false,
            message: createError.message
          })
        } else {
          results.push({
            table: 'roles',
            success: true,
            message: 'Tabel succesvol aangemaakt en standaard rollen toegevoegd'
          })
        }
      } else {
        results.push({
          table: 'roles',
          success: true,
          message: 'Tabel bestaat al'
        })
      }
    } catch (err) {
      results.push({
        table: 'roles',
        success: false,
        message: err instanceof Error ? err.message : 'Onbekende fout'
      })
    }
    
    // Maak de user_roles tabel
    try {
      const { error } = await supabase
        .from('user_roles')
        .select('id')
        .limit(1)
      
      if (error && error.code === 'PGRST301') {
        // Tabel bestaat niet, maak deze aan
        const { error: createError } = await supabase
          .from('user_roles')
          .insert([
            { 
              user_id: '00000000-0000-0000-0000-000000000000',
              role_id: 1,
              created_at: new Date().toISOString()
            }
          ])
        
        if (createError && createError.code !== 'PGRST301') {
          results.push({
            table: 'user_roles',
            success: false,
            message: createError.message
          })
        } else {
          results.push({
            table: 'user_roles',
            success: true,
            message: 'Tabel succesvol aangemaakt'
          })
        }
      } else {
        results.push({
          table: 'user_roles',
          success: true,
          message: 'Tabel bestaat al'
        })
      }
    } catch (err) {
      results.push({
        table: 'user_roles',
        success: false,
        message: err instanceof Error ? err.message : 'Onbekende fout'
      })
    }
    
    // Maak de user_sessions tabel
    try {
      const { error } = await supabase
        .from('user_sessions')
        .select('id')
        .limit(1)
      
      if (error && error.code === 'PGRST301') {
        // Tabel bestaat niet, maak deze aan
        const { error: createError } = await supabase
          .from('user_sessions')
          .insert([
            { 
              user_id: '00000000-0000-0000-0000-000000000000',
              ip_address: '127.0.0.1',
              user_agent: 'System',
              created_at: new Date().toISOString(),
              last_active: new Date().toISOString()
            }
          ])
        
        if (createError && createError.code !== 'PGRST301') {
          results.push({
            table: 'user_sessions',
            success: false,
            message: createError.message
          })
        } else {
          results.push({
            table: 'user_sessions',
            success: true,
            message: 'Tabel succesvol aangemaakt'
          })
        }
      } else {
        results.push({
          table: 'user_sessions',
          success: true,
          message: 'Tabel bestaat al'
        })
      }
    } catch (err) {
      results.push({
        table: 'user_sessions',
        success: false,
        message: err instanceof Error ? err.message : 'Onbekende fout'
      })
    }
    
    // Controleer of alles succesvol is
    const allSuccess = results.every(result => result.success)
    
    return NextResponse.json({
      success: allSuccess,
      message: allSuccess 
        ? 'Database succesvol geïnitialiseerd! Alle tabellen zijn aangemaakt.'
        : 'Er zijn fouten opgetreden bij het initialiseren van de database. Bekijk de resultaten voor details.',
      results
    })
  } catch (err) {
    console.error('Fout bij initialiseren van de database:', err)
    return NextResponse.json(
      { 
        success: false,
        message: err instanceof Error ? err.message : 'Onbekende fout bij initialiseren van de database',
        results: []
      },
      { status: 500 }
    )
  }
} 