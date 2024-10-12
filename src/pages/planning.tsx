import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function Planning() {
  const [apiKey, setApiKey] = useState('')
  const [userInput, setUserInput] = useState('')
  const [agentResponse, setAgentResponse] = useState('')

  useEffect(() => {
    const storedApiKey = localStorage.getItem('openrouter_api_key')
    if (storedApiKey) {
      setApiKey(storedApiKey)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ api_key: apiKey, messages: [{ role: 'user', content: userInput }] }),
      })
      const data = await response.json()
      setAgentResponse(data.response)
    } catch (error) {
      console.error('Error:', error)
      setAgentResponse("Une erreur s'est produite lors de la communication avec l'agent.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-8">Interface de Planification</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <Textarea
            placeholder="Entrez votre demande de planification ici..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="mb-4"
          />
          <Button type="submit" className="w-full">
            Envoyer
          </Button>
        </form>
        {agentResponse && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">Réponse de l'agent :</h2>
            <p>{agentResponse}</p>
          </div>
        )}
      </main>
    </div>
  )
}