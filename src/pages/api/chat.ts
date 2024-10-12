import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { api_key, messages } = req.body

  if (!api_key || !messages) {
    return res.status(400).json({ error: 'Missing required parameters' })
  }

  const openai = new OpenAI({
    apiKey: api_key,
    baseURL: 'https://openrouter.ai/api/v1',
  })

  try {
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      messages: [
        { role: 'system', content: "Vous êtes un agent de planification quotidienne qui aide les utilisateurs à organiser leur emploi du temps de manière optimale." },
        ...messages
      ],
    })

    res.status(200).json({ response: completion.choices[0].message.content })
  } catch (error) {
    console.error('OpenAI API error:', error)
    res.status(500).json({ error: 'An error occurred while processing your request' })
  }
}