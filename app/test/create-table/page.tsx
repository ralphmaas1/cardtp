"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function CreateTableTest() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  // Hardcoded Supabase credentials
  const supabaseUrl = "https://cszbcmxuomimthmavzsj.supabase.co"
  const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzemJjbXh1b21pbXRobWF2enNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTIxNzk0NCwiZXhwIjoyMDU2NzkzOTQ0fQ.OjgGegW_pSnOEH_pA5IKvOb4d4idl8w9s52bH1eJ1Cc"
  
  const createUsersTable = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    
    try {
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      
      // First, create the execute_sql function if it doesn't exist
      const { error: createFnError } = await supabase.rpc('create_function', {
        function_name: 'execute_sql',
        function_definition: `
          CREATE OR REPLACE FUNCTION execute_sql(sql text)
          RETURNS JSONB AS $$
          DECLARE
            result JSONB;
          BEGIN
            EXECUTE sql;
            RETURN jsonb_build_object('success', true);
          END;
          $$ LANGUAGE plpgsql SECURITY DEFINER;
        `
      })
      
      if (createFnError) {
        console.error("Error creating execute_sql function:", createFnError)
        
        // Try direct SQL execution through postgres_query
        const { error: createQueryFnError } = await supabase.rpc('create_function', {
          function_name: 'postgres_query',
          function_definition: `
            CREATE OR REPLACE FUNCTION postgres_query(query_text TEXT)
            RETURNS JSONB AS $$
            DECLARE
              result JSONB;
            BEGIN
              EXECUTE query_text;
              RETURN jsonb_build_object('success', true);
            END;
            $$ LANGUAGE plpgsql SECURITY DEFINER;
          `
        })
        
        if (createQueryFnError) {
          setError(`Failed to create SQL execution function: ${createQueryFnError.message}`)
          setLoading(false)
          return
        }
        
        // Create users table using postgres_query
        const { error: createTableError } = await supabase.rpc('postgres_query', {
          query_text: `
            CREATE TABLE IF NOT EXISTS users (
              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              email TEXT UNIQUE NOT NULL,
              name TEXT,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
            );
          `
        })
        
        if (createTableError) {
          setError(`Failed to create users table: ${createTableError.message}`)
          setLoading(false)
          return
        }
        
        setSuccess("Users table created successfully!")
        setLoading(false)
        return
      }
      
      // Create users table using execute_sql
      const { error: createTableError } = await supabase.rpc('execute_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email TEXT UNIQUE NOT NULL,
            name TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
          );
        `
      })
      
      if (createTableError) {
        setError(`Failed to create users table: ${createTableError.message}`)
        setLoading(false)
        return
      }
      
      setSuccess("Users table created successfully!")
    } catch (err: any) {
      console.error("Unexpected error:", err)
      setError(err.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }
  
  const createPostsTable = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    
    try {
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      
      // Try to use execute_sql first
      const { error: createTableError } = await supabase.rpc('execute_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS posts (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            title TEXT NOT NULL,
            content TEXT,
            user_id UUID REFERENCES users(id),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
          );
        `
      })
      
      if (createTableError) {
        console.error("Error creating posts table with execute_sql:", createTableError)
        
        // Try with postgres_query
        const { error: createWithQueryError } = await supabase.rpc('postgres_query', {
          query_text: `
            CREATE TABLE IF NOT EXISTS posts (
              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              title TEXT NOT NULL,
              content TEXT,
              user_id UUID REFERENCES users(id),
              created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
            );
          `
        })
        
        if (createWithQueryError) {
          setError(`Failed to create posts table: ${createWithQueryError.message}`)
          setLoading(false)
          return
        }
      }
      
      setSuccess("Posts table created successfully!")
    } catch (err: any) {
      console.error("Unexpected error:", err)
      setError(err.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Create Database Tables</h1>
      <p className="text-muted-foreground mb-8">
        Create test tables in your Supabase database
      </p>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Users Table</CardTitle>
            <CardDescription>
              Create a simple users table in your database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={createUsersTable} 
              disabled={loading}
              className="mb-4"
            >
              {loading ? "Creating..." : "Create Users Table"}
            </Button>
            
            {error && (
              <Alert className="bg-red-50 text-red-800 border-red-200">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Create Posts Table</CardTitle>
            <CardDescription>
              Create a posts table with a foreign key to users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={createPostsTable} 
              disabled={loading}
              className="mb-4"
            >
              {loading ? "Creating..." : "Create Posts Table"}
            </Button>
            
            <p className="text-sm text-muted-foreground mb-4">
              Note: You must create the users table first before creating the posts table.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 