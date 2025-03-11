"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function StandardConnectionTest() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [tables, setTables] = useState<string[]>([])
  
  // Hardcoded Supabase credentials
  const supabaseUrl = "https://cszbcmxuomimthmavzsj.supabase.co"
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzemJjbXh1b21pbXRobWF2enNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMTc5NDQsImV4cCI6MjA1Njc5Mzk0NH0.JNI2MkZrJ4yr6gGWIIUsb26IQb4hXS1brRWmW2hsyyw"
  
  useEffect(() => {
    async function testConnection() {
      setLoading(true)
      setError(null)
      setSuccess(false)
      
      try {
        // Create a Supabase client according to the official documentation
        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
          auth: {
            persistSession: false, // Don't persist the session to avoid cookie issues
            autoRefreshToken: false,
          }
        })
        
        // Eenvoudige query om te testen of we verbinding kunnen maken
        const { data, error } = await supabase.rpc('current_database')
        
        if (error) {
          console.error("Connection error:", error)
          setError(error.message)
          return
        }
        
        // Als we hier komen, is de verbinding succesvol
        setSuccess(true)
        
        // Probeer een eenvoudige query naar pg_catalog.pg_tables
        const { data: tablesData, error: tablesError } = await supabase
          .from('pg_tables')
          .select('schemaname')
          .eq('tableowner', 'postgres')
          .limit(20)
        
        if (tablesError) {
          console.error("Tables query error:", tablesError)
        } else if (tablesData) {
          // Verzamel unieke schemanamen
          const schemas = [...new Set(tablesData.map((row: any) => row.schemaname))];
          setTables(schemas);
        }
      } catch (err: any) {
        console.error("Unexpected error:", err)
        setError(err.message || "An unexpected error occurred")
        setSuccess(false)
      } finally {
        setLoading(false)
      }
    }
    
    testConnection()
  }, [])
  
  const retryConnection = async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    
    try {
      // Create a Supabase client according to the official documentation
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        }
      })
      
      // Eenvoudige query om te testen of we verbinding kunnen maken
      const { data, error } = await supabase.rpc('current_database')
      
      if (error) {
        console.error("Connection error:", error)
        setError(error.message)
        return
      }
      
      // Als we hier komen, is de verbinding succesvol
      setSuccess(true)
      
      // Probeer een eenvoudige query naar pg_catalog.pg_tables
      const { data: tablesData, error: tablesError } = await supabase
        .from('pg_tables')
        .select('schemaname')
        .eq('tableowner', 'postgres')
        .limit(20)
      
      if (tablesError) {
        console.error("Tables query error:", tablesError)
      } else if (tablesData) {
        // Verzamel unieke schemanamen
        const schemas = [...new Set(tablesData.map((row: any) => row.schemaname))];
        setTables(schemas);
      }
    } catch (err: any) {
      console.error("Unexpected error:", err)
      setError(err.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Standaard Supabase Verbindingstest</h1>
      <p className="text-muted-foreground mb-8">
        Test de verbinding met Supabase volgens de officiële documentatie
      </p>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Verbindingsstatus</CardTitle>
          <CardDescription>
            Testen van verbinding met {supabaseUrl}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Verbinding testen...</AlertTitle>
              <AlertDescription>
                Bezig met verbinden met de Supabase database.
              </AlertDescription>
            </Alert>
          ) : success ? (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>JA</AlertTitle>
              <AlertDescription>
                Verbinding met Supabase is succesvol.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-red-50 text-red-800 border-red-200">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertTitle>NEE</AlertTitle>
              <AlertDescription>
                {error || "Kon geen verbinding maken met de Supabase database."}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="mt-4">
            <Button 
              onClick={retryConnection} 
              disabled={loading}
              variant="outline"
            >
              {loading ? "Testen..." : "Opnieuw testen"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {success && tables.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Beschikbare schema's</CardTitle>
            <CardDescription>
              Schema's in de database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              {tables.map((table, index) => (
                <li key={index}>{table}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 