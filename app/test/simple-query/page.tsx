"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function SimpleQueryTest() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [queryResult, setQueryResult] = useState<any>(null)
  const [connectionStatus, setConnectionStatus] = useState<"success" | "error" | "loading">("loading")
  
  // Hardcoded Supabase credentials
  const supabaseUrl = "https://cszbcmxuomimthmavzsj.supabase.co"
  const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzemJjbXh1b21pbXRobWF2enNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTIxNzk0NCwiZXhwIjoyMDU2NzkzOTQ0fQ.OjgGegW_pSnOEH_pA5IKvOb4d4idl8w9s52bH1eJ1Cc"
  
  const runQuery = async () => {
    setLoading(true)
    setError(null)
    setQueryResult(null)
    setConnectionStatus("loading")
    
    try {
      // Create a Supabase client with the service role key for more permissions
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      
      // Test a simple query using raw SQL
      const { data, error } = await supabase.rpc('postgres_query', {
        query_text: `
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public'
          ORDER BY table_name;
        `
      })
      
      if (error) {
        console.error("Query error:", error)
        
        // Try creating the postgres_query function if it doesn't exist
        if (error.message.includes("Could not find the function")) {
          console.log("Creating postgres_query function...")
          
          const createFnResult = await supabase.rpc('postgres_query_create')
          
          if (createFnResult.error) {
            console.error("Error creating function:", createFnResult.error)
            
            // Try direct SQL query as a last resort
            const directResult = await supabase.from('information_schema.tables')
              .select('table_name')
              .eq('table_schema', 'public')
            
            if (directResult.error) {
              setError(`Failed to query tables: ${directResult.error.message}`)
              setConnectionStatus("error")
              return
            }
            
            setQueryResult(directResult.data)
            setConnectionStatus("success")
            return
          }
          
          // Try the query again after creating the function
          const retryResult = await supabase.rpc('postgres_query', {
            query_text: `
              SELECT table_name 
              FROM information_schema.tables 
              WHERE table_schema = 'public'
              ORDER BY table_name;
            `
          })
          
          if (retryResult.error) {
            setError(`Failed to query tables after creating function: ${retryResult.error.message}`)
            setConnectionStatus("error")
            return
          }
          
          setQueryResult(retryResult.data)
          setConnectionStatus("success")
          return
        }
        
        setError(error.message)
        setConnectionStatus("error")
        return
      }
      
      // If we get here, query was successful
      setQueryResult(data)
      setConnectionStatus("success")
    } catch (err: any) {
      console.error("Unexpected error:", err)
      setError(err.message || "An unexpected error occurred")
      setConnectionStatus("error")
    } finally {
      setLoading(false)
    }
  }
  
  // Create postgres_query_create function
  const createQueryFunction = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      
      // Create a function to create the postgres_query function
      const { error } = await supabase.rpc('create_function', {
        function_name: 'postgres_query_create',
        function_definition: `
          CREATE OR REPLACE FUNCTION postgres_query_create()
          RETURNS JSONB AS $$
          BEGIN
            -- Create the postgres_query function
            CREATE OR REPLACE FUNCTION postgres_query(query_text TEXT)
            RETURNS JSONB AS $inner$
            DECLARE
              result JSONB;
            BEGIN
              EXECUTE 'SELECT jsonb_agg(row_to_json(t)) FROM (' || query_text || ') t' INTO result;
              RETURN result;
            END;
            $inner$ LANGUAGE plpgsql SECURITY DEFINER;
            
            RETURN jsonb_build_object('success', true);
          END;
          $$ LANGUAGE plpgsql SECURITY DEFINER;
        `
      })
      
      if (error) {
        console.error("Error creating function creator:", error)
        
        // Try direct creation of postgres_query
        const directCreate = await supabase.rpc('create_function', {
          function_name: 'postgres_query',
          function_definition: `
            CREATE OR REPLACE FUNCTION postgres_query(query_text TEXT)
            RETURNS JSONB AS $$
            DECLARE
              result JSONB;
            BEGIN
              EXECUTE 'SELECT jsonb_agg(row_to_json(t)) FROM (' || query_text || ') t' INTO result;
              RETURN result;
            END;
            $$ LANGUAGE plpgsql SECURITY DEFINER;
          `
        })
        
        if (directCreate.error) {
          setError(`Failed to create query function: ${directCreate.error.message}`)
          return
        }
      }
      
      // Run the query after creating the function
      runQuery()
    } catch (err: any) {
      console.error("Unexpected error:", err)
      setError(err.message || "An unexpected error occurred")
    }
  }
  
  // Run query on component mount
  useEffect(() => {
    runQuery()
  }, [])
  
  return (
    <div className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Simple SQL Query Test</h1>
      <p className="text-muted-foreground mb-8">
        Testing direct SQL queries to Supabase with hardcoded credentials
      </p>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Query Status</CardTitle>
          <CardDescription>
            Querying tables from {supabaseUrl}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {connectionStatus === "loading" && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Running query...</AlertTitle>
              <AlertDescription>
                Attempting to query your Supabase database.
              </AlertDescription>
            </Alert>
          )}
          
          {connectionStatus === "success" && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Query successful!</AlertTitle>
              <AlertDescription>
                Successfully queried your Supabase database.
              </AlertDescription>
            </Alert>
          )}
          
          {connectionStatus === "error" && (
            <Alert className="bg-red-50 text-red-800 border-red-200">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertTitle>Query failed</AlertTitle>
              <AlertDescription>
                {error || "Could not query your Supabase database."}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="mt-4 space-x-2">
            <Button 
              onClick={runQuery} 
              disabled={loading}
              variant="outline"
            >
              {loading ? "Running..." : "Run Query Again"}
            </Button>
            
            <Button 
              onClick={createQueryFunction} 
              disabled={loading}
              variant="outline"
            >
              Create Query Function
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {connectionStatus === "success" && (
        <Card>
          <CardHeader>
            <CardTitle>Query Results</CardTitle>
            <CardDescription>
              Tables found in the public schema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {queryResult && queryResult.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {queryResult.map((row: any, index: number) => (
                  <li key={index}>{row.table_name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">
                No tables found in the public schema. You might need to create some tables first.
              </p>
            )}
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Raw Response:</h3>
              <pre className="bg-gray-100 p-3 rounded-md text-xs overflow-auto max-h-60">
                {JSON.stringify(queryResult, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 