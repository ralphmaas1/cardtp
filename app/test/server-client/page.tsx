import { createClient } from "@/utils/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function ServerClientTest() {
  const supabase = createClient()
  
  let connectionStatus: "success" | "error" = "success"
  let error: string | null = null
  let tables: string[] = []
  
  try {
    // Try to query the database
    const { data, error: queryError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
    
    if (queryError) {
      console.error("Query error:", queryError)
      connectionStatus = "error"
      error = queryError.message
    } else if (data) {
      tables = data.map((row: any) => row.table_name)
    }
  } catch (err: any) {
    console.error("Unexpected error:", err)
    connectionStatus = "error"
    error = err.message || "An unexpected error occurred"
  }
  
  // Get environment variables for debugging
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set (hidden)" : "Not set",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "Set (hidden)" : "Not set",
  }
  
  return (
    <div className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Server-Side Supabase Client Test</h1>
      <p className="text-muted-foreground mb-8">
        Testing the server-side Supabase client from utils/supabase/server.ts
      </p>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Connection Status</CardTitle>
            <CardDescription>
              Testing connection to Supabase
            </CardDescription>
          </CardHeader>
          <CardContent>
            {connectionStatus === "success" ? (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>Connection successful!</AlertTitle>
                <AlertDescription>
                  Successfully connected to your Supabase database.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-red-50 text-red-800 border-red-200">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertTitle>Connection failed</AlertTitle>
                <AlertDescription>
                  {error || "Could not connect to your Supabase database."}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>
              Checking if environment variables are set
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {Object.entries(envVars).map(([key, value]) => (
                <li key={key} className="flex items-start">
                  <span className={`mr-2 ${value === "Not set" ? "text-red-500" : "text-green-500"}`}>
                    {value === "Not set" ? "❌" : "✅"}
                  </span>
                  <div>
                    <span className="font-mono text-sm">{key}</span>
                    <span className="ml-2 text-sm text-muted-foreground">{value}</span>
                  </div>
                </li>
              ))}
            </ul>
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
    </div>
  )
} 