import { NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tableName = searchParams.get('table')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    const supabase = createServiceRoleClient()
    
    // Directe SQL query om te controleren of we verbinding kunnen maken
    const { data: versionData, error: versionError } = await supabase.query(`SELECT version()`)
    
    if (versionError) {
      console.error('Fout bij verbinden met database:', versionError)
      return NextResponse.json(
        { 
          error: `Fout bij verbinden met database: ${versionError.message}`,
          details: "Controleer of je Supabase URL en Service Role Key correct zijn ingesteld in .env.local"
        },
        { status: 500 }
      )
    }
    
    if (!tableName) {
      // Als er geen tabel is opgegeven, haal alle tabellen op
      const { data, error } = await supabase
        .from('pg_tables')
        .select('tablename')
        .eq('schemaname', 'public')
        .order('tablename')
      
      if (error) {
        console.error('Fout bij ophalen tabellen:', error)
        return NextResponse.json(
          { error: `Fout bij ophalen tabellen: ${error.message}` },
          { status: 500 }
        )
      }
      
      const tables = data?.map((row: any) => row.tablename) || []
      return NextResponse.json({ tables })
    } else {
      // Als er een tabel is opgegeven, haal de data op
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(limit)
      
      if (error) {
        console.error(`Fout bij ophalen data uit ${tableName}:`, error)
        return NextResponse.json(
          { error: `Fout bij ophalen data uit ${tableName}: ${error.message}` },
          { status: 500 }
        )
      }
      
      // Bepaal de kolommen op basis van de eerste rij
      const columns = data && data.length > 0 
        ? Object.keys(data[0]) 
        : []
      
      return NextResponse.json({
        name: tableName,
        data: data || [],
        columns
      })
    }
  } catch (err) {
    console.error('Onverwachte fout bij ophalen database data:', err)
    return NextResponse.json(
      { 
        error: err instanceof Error ? err.message : 'Onbekende fout',
        details: "Er is een onverwachte fout opgetreden bij het ophalen van de database data"
      },
      { status: 500 }
    )
  }
} 