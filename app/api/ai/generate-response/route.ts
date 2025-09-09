import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getSomersetBusinessContext } from '@/app/lib/business-context'
import { getScheduleData } from '@/app/lib/schedule-data'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function POST(request: NextRequest) {
  try {
    const { message, customerEmail, timestamp } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get Somerset business context and current scheduling
    const businessContext = getSomersetBusinessContext()
    const scheduleData = getScheduleData()
    
    // Build comprehensive prompt for Claude
    const systemPrompt = `You are a customer service assistant for Somerset Window Cleaning, a professional window cleaning service in Somerset, UK.

BUSINESS CONTEXT:
${JSON.stringify(businessContext, null, 2)}

CURRENT SCHEDULE & AVAILABILITY:
${JSON.stringify(scheduleData, null, 2)}

INSTRUCTIONS:
1. Generate a professional, friendly response to the customer's inquiry
2. Use the provided business context to give accurate information about services, areas, and availability
3. If the customer asks about pricing, refer them to contact for a quote rather than giving specific prices
4. If they ask about scheduling, reference current availability from the schedule data
5. Always maintain Somerset Window Cleaning's professional, reliable, and friendly tone
6. If you need more information to provide a complete answer, ask relevant follow-up questions
7. End responses with appropriate next steps or contact information

CUSTOMER EMAIL: ${customerEmail || 'Not provided'}
TIMESTAMP: ${timestamp || new Date().toISOString()}`

    const userPrompt = `Please generate a response to this customer message:

"${message}"`

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ]
    })

    const responseContent = response.content[0]
    const generatedResponse = responseContent.type === 'text' ? responseContent.text : ''

    // Calculate confidence based on message complexity and business context match
    const confidence = calculateConfidence(message, generatedResponse, businessContext)

    // Generate suggestions if confidence is low
    const suggestions = confidence < 0.7 ? generateSuggestions(message, businessContext) : []

    // Extract business context used in response
    const usedBusinessContext = extractBusinessContext(generatedResponse, businessContext, scheduleData)

    return NextResponse.json({
      content: generatedResponse,
      confidence,
      suggestions,
      businessContext: usedBusinessContext,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error generating AI response:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate response',
        content: 'I apologize, but I\'m having trouble generating a response right now. Please contact Somerset Window Cleaning directly at info@somersetwindowcleaning.co.uk or call our main number for immediate assistance.',
        confidence: 0,
        suggestions: ['Check API configuration', 'Verify Anthropic API key', 'Try again in a few moments']
      },
      { status: 500 }
    )
  }
}

function calculateConfidence(
  originalMessage: string, 
  response: string, 
  businessContext: any
): number {
  let confidence = 0.5 // Base confidence

  // Check if response mentions specific Somerset services
  const mentionedServices = businessContext.services.filter((service: any) => 
    response.toLowerCase().includes(service.name.toLowerCase())
  )
  if (mentionedServices.length > 0) confidence += 0.2

  // Check if response mentions service areas
  const mentionedAreas = businessContext.serviceAreas.filter((area: string) => 
    response.toLowerCase().includes(area.toLowerCase())
  )
  if (mentionedAreas.length > 0) confidence += 0.2

  // Check response length and completeness
  if (response.length > 100 && response.length < 1000) confidence += 0.1

  // Check if response includes contact information
  if (response.includes(businessContext.contactInfo.email) || 
      response.includes(businessContext.contactInfo.phone)) {
    confidence += 0.1
  }

  return Math.min(confidence, 1.0)
}

function generateSuggestions(message: string, businessContext: any): string[] {
  const suggestions = []

  if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
    suggestions.push('Consider providing more specific service details for accurate pricing')
  }

  if (message.toLowerCase().includes('when') || message.toLowerCase().includes('availability')) {
    suggestions.push('Check current schedule data for more specific availability')
  }

  if (!message.includes('window')) {
    suggestions.push('Clarify which Somerset Window Cleaning services they need')
  }

  return suggestions
}

function extractBusinessContext(response: string, businessContext: any, scheduleData: any) {
  const context: any = {}

  // Find mentioned service areas
  const mentionedAreas = businessContext.serviceAreas.filter((area: string) => 
    response.toLowerCase().includes(area.toLowerCase())
  )
  if (mentionedAreas.length > 0) {
    context.serviceAreas = mentionedAreas
  }

  // Find mentioned services
  const mentionedServices = businessContext.services
    .filter((service: any) => response.toLowerCase().includes(service.name.toLowerCase()))
    .map((service: any) => service.name)
  if (mentionedServices.length > 0) {
    context.suggestedServices = mentionedServices
  }

  // Find mentioned dates
  const availableDates = scheduleData.filter((schedule: any) => 
    schedule.availability === 'available'
  ).map((schedule: any) => schedule.date)
  
  if (response.toLowerCase().includes('available') && availableDates.length > 0) {
    context.availableDates = availableDates.slice(0, 3) // Show next 3 available dates
  }

  return context
}