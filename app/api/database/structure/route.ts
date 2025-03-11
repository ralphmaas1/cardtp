import { NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createServiceRoleClient()
    
    // Haal alle tabellen op
    const { data: tablesData, error: tablesError } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public')
      .order('tablename')
    
    if (tablesError) {
      console.error('Fout bij ophalen tabellen:', tablesError)
      return NextResponse.json(
        { 
          error: `Fout bij ophalen tabellen: ${tablesError.message}`,
          details: "De service role key heeft mogelijk niet voldoende rechten om tabellen op te halen"
        },
        { status: 500 }
      )
    }
    
    if (!tablesData || tablesData.length === 0) {
      return NextResponse.json({ tables: [] })
    }
    
    // Voor elke tabel, haal de kolommen op
    const tablesWithColumns = await Promise.all(
      tablesData.map(async (table: { tablename: string }) => {
        // Haal kolommen op
        const { data: columnsData, error: columnsError } = await supabase
          .from('information_schema.columns')
          .select('column_name, data_type, is_nullable, column_default, is_identity')
          .eq('table_schema', 'public')
          .eq('table_name', table.tablename)
          .order('ordinal_position')
        
        if (columnsError) {
          console.error(`Fout bij ophalen kolommen voor ${table.tablename}:`, columnsError)
          return {
            name: table.tablename,
            columns: [],
            error: columnsError.message
          }
        }
        
        // Verwerk kolommen
        const columns = columnsData?.map((col: any) => ({
          name: col.column_name,
          data_type: col.data_type,
          is_nullable: col.is_nullable === 'YES',
          default_value: col.column_default,
          is_identity: col.is_identity === 'YES'
        })) || []
        
        return {
          name: table.tablename,
          columns
        }
      })
    )
    
    return NextResponse.json({ tables: tablesWithColumns })
  } catch (err) {
    console.error('Onverwachte fout bij ophalen database structuur:', err)
    return NextResponse.json(
      { 
        error: err instanceof Error ? err.message : 'Onbekende fout',
        details: "Er is een onverwachte fout opgetreden bij het ophalen van de database structuur"
      },
      { status: 500 }
    )
  }
} 