import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getSomersetBusinessContext } from '@/app/lib/business-context'
import { getScheduleData } from '@/app/lib/schedule-data'
import { getAllKnowledgeForPrompt, getRelevantKnowledge } from '@/app/lib/knowledge-base'
import { ConversationMemory } from '@/app/lib/conversation-memory'
import { trainingDataSystem } from '@/app/lib/training-data'

// Ensure we're using Node.js runtime for Anthropic SDK
export const runtime = 'nodejs'

// Set function timeout and memory configuration
export const maxDuration = 30
export const dynamic = 'force-dynamic'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
  timeout: 25000, // 25 seconds timeout for serverless
  maxRetries: 2,
  httpAgent: undefined, // Let the SDK handle HTTP agent in serverless
})

export async function POST(request: NextRequest) {
  try {
    // Validate API key first
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not set in environment variables')
      return NextResponse.json(
        { 
          error: 'API configuration error',
          errorType: 'CONFIGURATION_ERROR',
          content: 'I apologize, but I\'m having trouble generating a response right now. Please contact Somerset Window Cleaning directly at info@somersetwindowcleaning.co.uk or call our main number for immediate assistance.',
          confidence: 0,
          suggestions: ['Contact system administrator', 'Check API configuration'],
          timestamp: new Date().toISOString(),
          retryable: false
        },
        { status: 500 }
      )
    }

    const { message, context, timestamp } = await request.json()

    if (!message) {
      return NextResponse.json(
        { 
          error: 'Message is required',
          errorType: 'VALIDATION_ERROR',
          content: 'Please enter a customer message to generate a response.',
          suggestions: ['Enter a customer message in the text area'],
          timestamp: new Date().toISOString(),
          retryable: true
        },
        { status: 400 }
      )
    }

    // Initialize conversation memory system
    const conversationMemory = new ConversationMemory()
    const conversationId = conversationMemory.addMessage(message, context || '', 'unknown')
    const memoryContext = conversationMemory.getAIContext(conversationId)
    const recommendation = conversationMemory.getResponseRecommendation(conversationId)

    // Get training data insights for intelligent responses
    const trainingSuggestion = trainingDataSystem.getResponseSuggestion(message, context || '')

    // Check if we should respond at all
    if (!recommendation.shouldRespond) {
      return NextResponse.json({
        content: `INTERNAL ANALYSIS: ${recommendation.reason}`,
        responseType: recommendation.responseType,
        suggestedAction: recommendation.suggestedAction,
        confidence: 0.95,
        conversationId,
        memoryContext,
        trainingSuggestion,
        shouldRespond: false,
        messageAnalysis: {
          detectedType: trainingSuggestion.messageType,
          businessLessons: trainingSuggestion.businessLessons,
          reasoning: trainingSuggestion.reasoning
        }
      })
    }

    // Get Somerset business context, scheduling, and adaptive knowledge
    let businessContext, scheduleData, relevantKnowledge
    
    try {
      businessContext = getSomersetBusinessContext()
      scheduleData = getScheduleData()
      relevantKnowledge = getRelevantKnowledge(message)
    } catch (contextError) {
      console.error('Error loading business context:', contextError)
      return NextResponse.json(
        { 
          error: 'Configuration error',
          content: 'I apologize, but I\'m having trouble accessing my knowledge base right now. Please contact Somerset Window Cleaning directly at info@somersetwindowcleaning.co.uk for immediate assistance.',
          confidence: 0,
          suggestions: ['Contact directly via email or phone']
        },
        { status: 500 }
      )
    }
    
    // Advanced prompt engineering for Claude 3.5 Sonnet
    const systemPrompt = `You are an EXPERT customer service representative for Somerset Window Cleaning, with deep knowledge of the business and exceptional communication skills.

BUSINESS INTELLIGENCE:
- Service Areas: ${businessContext.serviceAreas.slice(0, 10).join(', ')}... (24 areas total)
- Core Services: ${businessContext.services.map(s => s.name).join(', ')}
- Contact: ${businessContext.contactInfo.email}, ${businessContext.contactInfo.phone}
- Working Hours: ${businessContext.availability.generalAvailability}

${relevantKnowledge}

${memoryContext}

TRAINING DATA INSIGHTS:
- Message Type Detected: ${trainingSuggestion.messageType}
- Confidence: ${(trainingSuggestion.confidence * 100).toFixed(1)}%
- Training Reasoning: ${trainingSuggestion.reasoning}
- Business Lessons: ${trainingSuggestion.businessLessons.slice(0, 3).join('; ')}

ADVANCED ANALYSIS & RESPONSE PROTOCOL:

1. MESSAGE TYPE ANALYSIS:
   - If this is SMS conversation history/business data: Provide internal analysis, NOT customer response
   - If this is a genuine customer inquiry: Provide professional customer service response
   - If this is internal communication: Analyze and suggest business actions

2. CONTEXTUAL INTELLIGENCE:
   - Analyze conversation history and patterns
   - Identify customer type (new/existing/regular)
   - Recognize service requests vs data reviews
   - Detect complaint vs inquiry vs praise patterns

3. RESPONSE CUSTOMIZATION:
   - New customers: Focus on services, areas, contact information
   - Existing customers: Reference their history, be more personal
   - Internal reviews: Provide business insights, not customer responses
   - Complaints: Acknowledge, apologize, offer solutions

4. UK BUSINESS STANDARDS:
   - ALWAYS use UK spelling: colour, realise, centre, organised, favourite
   - UK terminology: postcode (not zip), mobile (not cell), tonnes (not tons)
   - UK currency: £ symbol, proper formatting (£25.00, not $25)
   - UK dates: DD/MM/YYYY or "1st January 2025"
   - Professional British tone: polite, helpful, not overly casual

5. INTELLIGENT RECOMMENDATIONS:
   - Suggest specific services based on message content
   - Reference relevant service areas mentioned
   - Provide appropriate next steps
   - Include contact information when relevant

CRITICAL DECISION FRAMEWORK:
- SMS/business data = Internal analysis only
- Customer inquiry = Professional service response  
- Complaint = Acknowledge + resolve + follow-up
- Review/praise = Thank + request Google review

TEAM CONTEXT: ${context || 'None provided'}
TIMESTAMP: ${timestamp || new Date().toISOString()}`

    const userPrompt = `Please generate a response to this customer message:

"${message}"`

    // Create AI response with retry logic
    let response
    try {
      response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        temperature: 0.3,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      })
    } catch (aiError) {
      console.error('Anthropic API Error:', aiError)
      
      // Return a template-based response for common scenarios  
      const fallbackResponse = generateFallbackResponse(message, businessContext)
      
      return NextResponse.json({
        content: fallbackResponse,
        confidence: 0.6,
        suggestions: ['This is a template response - AI service temporarily unavailable'],
        businessContext: {
          serviceAreas: businessContext.serviceAreas.slice(0, 5),
          suggestedServices: ['Window Cleaning', 'Gutter Cleaning']
        },
        timestamp: new Date().toISOString(),
        fallback: true
      })
    }

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
    const errorDetails = {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined,
      apiKey: process.env.ANTHROPIC_API_KEY ? 'Present' : 'Missing',
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'Unknown'
    }
    
    console.error('AI Response Generation Error:', JSON.stringify(errorDetails, null, 2))
    
    // Check for specific Anthropic API errors
    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('authentication')) {
        console.error('API Authentication Error - Check ANTHROPIC_API_KEY')
      } else if (error.message.includes('429') || error.message.includes('rate limit')) {
        console.error('API Rate Limit Error - Too many requests')
      } else if (error.message.includes('timeout') || error.message.includes('ECONNRESET')) {
        console.error('Network Timeout Error - Request took too long')
      }
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to generate response',
        content: 'I apologize, but I\'m having trouble generating a response right now. Please contact Somerset Window Cleaning directly at info@somersetwindowcleaning.co.uk or call our main number for immediate assistance.',
        confidence: 0,
        suggestions: ['Check API configuration', 'Verify Anthropic API key', 'Try again in a few moments'],
        debug: process.env.NODE_ENV === 'development' ? {
          errorMessage: error instanceof Error ? error.message : 'Unknown error'
        } : undefined
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

function generateFallbackResponse(message: string, businessContext: any): string {
  const messageLower = message.toLowerCase()
  
  // Common greeting response
  if (messageLower.includes('hello') || messageLower.includes('hi ')) {
    return `Hello! Thank you for contacting Somerset Window Cleaning. We provide professional window cleaning services across Bath, Bristol, Keynsham, and surrounding Somerset areas. How can we help you today?`
  }
  
  // Service inquiry response
  if (messageLower.includes('window') || messageLower.includes('clean')) {
    return `Thank you for your enquiry about our window cleaning services. We offer regular window cleaning on a 4-weekly or 8-weekly basis, as well as one-off cleans. We serve ${businessContext.serviceAreas.slice(0, 6).join(', ')} and surrounding areas. Please email us at ${businessContext.contactInfo.email} or call ${businessContext.contactInfo.phone} for a free quote.`
  }
  
  // Pricing inquiry response
  if (messageLower.includes('price') || messageLower.includes('cost') || messageLower.includes('quote')) {
    return `Thank you for your interest in our services. Our pricing depends on the size of your property and the frequency of cleaning. We offer competitive rates for both regular and one-off cleans. Please contact us at ${businessContext.contactInfo.email} or ${businessContext.contactInfo.phone} with your property details for a personalised quote.`
  }
  
  // Area/location inquiry
  const mentionedArea = businessContext.serviceAreas.find((area: string) => 
    messageLower.includes(area.toLowerCase())
  )
  if (mentionedArea) {
    return `Yes, we do service ${mentionedArea} and the surrounding area. We provide regular window cleaning services throughout Somerset. Please get in touch at ${businessContext.contactInfo.email} or ${businessContext.contactInfo.phone} to discuss your requirements and arrange a quote.`
  }
  
  // Default response
  return `Thank you for contacting Somerset Window Cleaning. We're a professional window cleaning service covering Bath, Bristol, Keynsham, and surrounding Somerset areas. We offer regular cleaning services and one-off cleans. Please contact us at ${businessContext.contactInfo.email} or call ${businessContext.contactInfo.phone} to discuss your requirements.`
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