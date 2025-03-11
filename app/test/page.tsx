import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TestHomePage() {
  const testPages = [
    {
      title: "Supabase Direct Test",
      description: "Test direct connection to Supabase with hardcoded credentials",
      path: "/test/supabase-direct",
      icon: "🔌"
    },
    {
      title: "Simple Query Test",
      description: "Test direct SQL queries to Supabase",
      path: "/test/simple-query",
      icon: "🔍"
    },
    {
      title: "Create Table Test",
      description: "Create test tables in your Supabase database",
      path: "/test/create-table",
      icon: "📋"
    },
    {
      title: "Server Client Test",
      description: "Test the server-side Supabase client",
      path: "/test/server-client",
      icon: "🖥️"
    },
    {
      title: "Environment Variables Test",
      description: "Check if environment variables are set correctly",
      path: "/test/env-variables",
      icon: "🔑"
    }
  ]
  
  return (
    <div className="container py-10 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Supabase Test Pages</h1>
          <p className="text-muted-foreground mt-2">
            Various test pages to diagnose Supabase connection issues
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {testPages.map((page) => (
          <Card key={page.path} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="text-2xl mb-2">{page.icon}</div>
              <CardTitle>{page.title}</CardTitle>
              <CardDescription>{page.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-3">
              <Button asChild>
                <Link href={page.path}>Visit Page</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

