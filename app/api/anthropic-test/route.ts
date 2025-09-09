import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const runtime = 'nodejs'

export async function GET() {
  try {
    // Validate API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({
        error: 'API key missing',
        hasApiKey: false
      })
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 100,
      temperature: 0.7,
      system: 'You are a helpful assistant.',
      messages: [
        {
          role: 'user',
          content: 'Say hello in exactly 5 words.'
        }
      ]
    })

    const responseContent = response.content[0]
    const generatedResponse = responseContent.type === 'text' ? responseContent.text : ''

    return NextResponse.json({
      success: true,
      response: generatedResponse,
      hasApiKey: true
    })

  } catch (error) {
    console.error('Anthropic test error:', error)
    return NextResponse.json({
      error: 'Anthropic API call failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      hasApiKey: !!process.env.ANTHROPIC_API_KEY
    })
  }
}