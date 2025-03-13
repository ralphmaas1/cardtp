"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function SchemaTest() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [selectedSchema, setSelectedSchema] = useState<string>("sports")
  const [selectedTable, setSelectedTable] = useState<string>("sports_types")
  
  // Hardcoded Supabase credentials
  const supabaseUrl = "https://cszbcmxuomimthmavzsj.supabase.co"
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzemJjbXh1b21pbXRobWF2enNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMTc5NDQsImV4cCI6MjA1Njc5Mzk0NH0.JNI2MkZrJ4yr6gGWIIUsb26IQb4hXS1brRWmW2hsyyw"
  
  const schemas = [
    { value: "sports", label: "Sports" },
    { value: "tcg", label: "TCG" },
    { value: "entertainment", label: "Entertainment" }
  ]
  
  const tables = {
    sports: [
      { value: "sports_types", label: "Sports Types" },
      { value: "leagues", label: "Leagues" },
      { value: "seasons", label: "Seasons" },
      { value: "teams", label: "Teams" },
      { value: "players", label: "Players" },
      { value: "cards", label: "Cards" },
      { value: "card_attributes", label: "Card Attributes" },
      { value: "listings", label: "Listings" }
    ],
    tcg: [
      { value: "games", label: "Games" },
      { value: "series", label: "Series" },
      { value: "sets", label: "Sets" },
      { value: "cards", label: "Cards" },
      { value: "pokemon_attributes", label: "Pokemon Attributes" },
      { value: "magic_attributes", label: "Magic Attributes" },
      { value: "listings", label: "Listings" }
    ],
    entertainment: [
      { value: "subcategories", label: "Subcategories" },
      { value: "cards", label: "Cards" },
      { value: "attributes", label: "Attributes" },
      { value: "listings", label: "Listings" }
    ]
  }
  
  const runQuery = async () => {
    setLoading(true)
    setError(null)
    setResults([])
    
    try {
      // Maak een Supabase client
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        }
      })
      
      // Probeer verschillende benaderingen om de tabel te benaderen
      
      // Methode 1: Probeer de tabel te benaderen met schema_tabelnaam notatie
      try {
        const { data, error } = await supabase
          .from(`${selectedSchema}_${selectedTable}`)
          .select('*')
          .limit(10)
        
        if (error) {
          console.error("Methode 1 fout:", error)
          throw error
        }
        
        setResults(data || [])
        setSuccess(true)
        setLoading(false)
        return
      } catch (err1) {
        console.error("Methode 1 mislukt:", err1)
        
        // Methode 2: Probeer de tabel direct te benaderen (voor het geval dat de tabellen in het public schema staan)
        try {
          const { data, error } = await supabase
            .from(selectedTable)
            .select('*')
            .limit(10)
          
          if (error) {
            console.error("Methode 2 fout:", error)
            throw error
          }
          
          setResults(data || [])
          setSuccess(true)
          setLoading(false)
          return
        } catch (err2) {
          console.error("Methode 2 mislukt:", err2)
          
          // Methode 3: Probeer de REST API met public schema
          try {
            const response = await fetch(`${supabaseUrl}/rest/v1/${selectedSchema}_${selectedTable}?select=*&limit=10`, {
              headers: {
                'apikey': supabaseAnonKey,
                'Authorization': `Bearer ${supabaseAnonKey}`,
                'Content-Type': 'application/json'
              }
            })
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}, ${await response.text()}`)
            }
            
            const data = await response.json()
            setResults(data || [])
            setSuccess(true)
            setLoading(false)
            return
          } catch (err3) {
            console.error("Methode 3 mislukt:", err3)
            
            // Methode 4: Probeer een SQL query via de Supabase client
            try {
              const { data, error } = await supabase.rpc('get_table_data', {
                schema_name: selectedSchema,
                table_name: selectedTable
              })
              
              if (error) {
                console.error("Methode 4 fout:", error)
                throw error
              }
              
              setResults(data || [])
              setSuccess(true)
              setLoading(false)
              return
            } catch (err4) {
              console.error("Methode 4 mislukt:", err4)
              
              // Als alle methoden mislukken, toon een duidelijke foutmelding
              setError(`Kon geen verbinding maken met de tabel: Alle methoden zijn mislukt. 
                Het lijkt erop dat de schema's '${selectedSchema}' niet toegankelijk zijn voor de anonieme gebruiker. 
                Mogelijk staan de tabellen in het 'public' schema met een prefix, of zijn ze helemaal niet toegankelijk.
                
                Probeer de tabellen te benaderen via SQL in de Supabase interface om te controleren of ze bestaan en toegankelijk zijn.`)
              setLoading(false)
              return
            }
          }
        }
      }
    } catch (err) {
      console.error("Onverwachte fout:", err)
      setError(err instanceof Error ? err.message : "Er is een onverwachte fout opgetreden")
      setSuccess(false)
      setLoading(false)
    }
  }
  
  // Run query on component mount
  useEffect(() => {
    runQuery()
  }, [])
  
  return (
    <div className="container py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Schema en Tabel Test</h1>
      <p className="text-muted-foreground mb-8">
        Test de verbinding met specifieke schema's en tabellen in Supabase
      </p>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Query Instellingen</CardTitle>
          <CardDescription>
            Selecteer het schema en de tabel die je wilt testen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Schema</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={selectedSchema}
                onChange={(e) => {
                  setSelectedSchema(e.target.value)
                  setSelectedTable(tables[e.target.value as keyof typeof tables][0].value)
                }}
              >
                {schemas.map((schema) => (
                  <option key={schema.value} value={schema.value}>{schema.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Tabel</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
              >
                {tables[selectedSchema as keyof typeof tables].map((table) => (
                  <option key={table.value} value={table.value}>{table.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <Button 
            onClick={runQuery} 
            disabled={loading}
            className="w-full"
          >
            {loading ? "Query uitvoeren..." : "Query uitvoeren"}
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Resultaten</CardTitle>
          <CardDescription>
            {`Query: SELECT * FROM ${selectedSchema}_${selectedTable} LIMIT 10;`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Query uitvoeren...</AlertTitle>
              <AlertDescription>
                Bezig met het uitvoeren van de query.
              </AlertDescription>
            </Alert>
          ) : error ? (
            <Alert className="bg-red-50 text-red-800 border-red-200">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertTitle>Fout bij uitvoeren query</AlertTitle>
              <AlertDescription className="whitespace-pre-line">
                {error}
              </AlertDescription>
            </Alert>
          ) : results.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(results[0]).map((key) => (
                      <th 
                        key={key}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((value: any, valueIndex) => (
                        <td 
                          key={valueIndex}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertTitle>Geen resultaten</AlertTitle>
              <AlertDescription>
                De query heeft geen resultaten opgeleverd. Mogelijk is de tabel leeg of bestaat deze niet.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 