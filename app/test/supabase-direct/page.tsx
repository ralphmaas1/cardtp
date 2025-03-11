"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function SupabaseDirectTest() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tables, setTables] = useState<string[]>([])
  const [connectionStatus, setConnectionStatus] = useState<"success" | "error" | "loading">("loading")
  
  // Hardcoded Supabase credentials
  const supabaseUrl = "https://cszbcmxuomimthmavzsj.supabase.co"
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzemJjbXh1b21pbXRobWF2enNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMTc5NDQsImV4cCI6MjA1Njc5Mzk0NH0.JNI2MkZrJ4yr6gGWIIUsb26IQb4hXS1brRWmW2hsyyw"
  const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzemJjbXh1b21pbXRobWF2enNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTIxNzk0NCwiZXhwIjoyMDU2NzkzOTQ0fQ.OjgGegW_pSnOEH_pA5IKvOb4d4idl8w9s52bH1eJ1Cc"
  
  const testConnection = async () => {
    setLoading(true)
    setError(null)
    setTables([])
    setConnectionStatus("loading")
    
    try {
      // Create a Supabase client with the service role key for more permissions
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      
      // Test a simple query to check connection
      const { data, error } = await supabase
        .from('pg_catalog.pg_tables')
        .select('schemaname, tablename')
        .eq('schemaname', 'public')
      
      if (error) {
        console.error("Connection error:", error)
        setError(error.message)
        setConnectionStatus("error")
        return
      }
      
      // If we get here, connection was successful
      setConnectionStatus("success")
      
      // Get list of tables in the public schema
      if (data && Array.isArray(data)) {
        setTables(data.map(t => t.tablename))
      }
    } catch (err: any) {
      console.error("Unexpected error:", err)
      setError(err.message || "An unexpected error occurred")
      setConnectionStatus("error")
    } finally {
      setLoading(false)
    }
  }
  
  // Test connection on component mount
  useEffect(() => {
    testConnection()
  }, [])
  
  return (
    <div className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Supabase Direct Connection Test</h1>
      <p className="text-muted-foreground mb-8">
        Testing direct connection to Supabase with hardcoded credentials
      </p>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Connection Status</CardTitle>
          <CardDescription>
            Testing connection to {supabaseUrl}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {connectionStatus === "loading" && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Testing connection...</AlertTitle>
              <AlertDescription>
                Attempting to connect to your Supabase database.
              </AlertDescription>
            </Alert>
          )}
          
          {connectionStatus === "success" && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Connection successful!</AlertTitle>
              <AlertDescription>
                Successfully connected to your Supabase database.
              </AlertDescription>
            </Alert>
          )}
          
          {connectionStatus === "error" && (
            <Alert className="bg-red-50 text-red-800 border-red-200">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertTitle>Connection failed</AlertTitle>
              <AlertDescription>
                {error || "Could not connect to your Supabase database."}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="mt-4">
            <Button 
              onClick={testConnection} 
              disabled={loading}
              variant="outline"
            >
              {loading ? "Testing..." : "Test Connection Again"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {connectionStatus === "success" && (
        <Card>
          <CardHeader>
            <CardTitle>Database Tables</CardTitle>
            <CardDescription>
              Tables found in the public schema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tables.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {tables.map(table => (
                  <li key={table}>{table}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">
                No tables found in the public schema. You might need to create some tables first.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 