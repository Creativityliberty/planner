import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'

export default function Home() {
  const [apiKey, setApiKey] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('openrouter_api_key', apiKey)
    router.push('/planning')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">
          Agent de Planification Quotidienne
        </h1>
        <p className="text-xl mb-8">
          Entrez votre clé API OpenRouter pour commencer
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-xs">
          <Input
            type="password"
            placeholder="Clé API OpenRouter"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mb-4"
          />
          <Button type="submit" className="w-full">
            Accéder à l'interface de planification
          </Button>
        </form>
      </main>
    </div>
  )
}