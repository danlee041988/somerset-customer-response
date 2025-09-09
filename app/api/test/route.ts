import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: "API is working",
    hasApiKey: !!process.env.ANTHROPIC_API_KEY,
    knowledgeBaseTest: "Loading knowledge base...",
    timestamp: new Date().toISOString()
  })
}