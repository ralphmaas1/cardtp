export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Test Pagina</h1>
      <p>Als je deze pagina kunt zien, werkt de server correct.</p>
      <p className="mt-4">
        <a href="/admin" className="text-blue-500 underline">Ga naar admin pagina</a>
      </p>
    </div>
  )
} 