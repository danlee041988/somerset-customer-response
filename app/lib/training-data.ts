// Training Data Integration for Somerset Window Cleaning
// Learn from actual customer conversations to improve responses

interface TrainingExample {
  id: string
  customerMessage: string
  expectedResponse: string
  context: string
  messageType: 'customer_inquiry' | 'existing_customer' | 'complaint' | 'praise' | 'internal_data'
  responseQuality: 'excellent' | 'good' | 'needs_improvement'
  tags: string[]
  businessLessons: string[]
  createdAt: Date
}

interface ResponsePattern {
  trigger: string
  responseTemplate: string
  context: string
  confidence: number
}

class TrainingDataSystem {
  private trainingExamples: TrainingExample[] = []
  private responsePatterns: ResponsePattern[] = []

  constructor() {
    this.initializeWithSomersetData()
  }

  // Initialize with actual Somerset conversation examples
  private initializeWithSomersetData(): void {
    
    // Example 1: Customer Review/Praise Pattern
    this.addTrainingExample({
      customerMessage: "Hi, I have left you a 5 star review. Easy to do and I meant every word. SMS sent by Gail Ward (Somerset Window Cleaning)",
      expectedResponse: "Thank you so much for your wonderful 5-star review, Gail! We really appreciate your kind words and your continued support—it means a lot to us. We'd be happy to continue providing excellent service for your regular window cleaning. Many thanks from all the team at Somerset Window Cleaning!",
      context: "Customer praise - 5 star review received",
      messageType: 'praise',
      responseQuality: 'excellent',
      tags: ['review', 'praise', 'gail_ward', 'existing_customer', '5_star'],
      businessLessons: [
        'Always thank customers for positive reviews',
        'Acknowledge their continued loyalty', 
        'Keep response warm but professional',
        'Reference ongoing service relationship'
      ]
    })

    // Example 2: SMS Conversation History (SHOULD NOT RESPOND)
    this.addTrainingExample({
      customerMessage: `SMSReply from Gail Ward
      Hi, I have left you a 5 star review. Easy to do and I meant every word.
      SMS sent by Dan (Somerset Window Cleaning)
      Hi Gail. Thank you so much for your 5-star review! We really
      Jan 31 15:34
      delivery details
      SMSReply from Gail Ward
      March 26th 2025
      SMS sent by Dan (Somerset Window Cleaning)
      Hi Gail, Just a quick reminder that your window clean ** £3 Discount
      ** appointment is scheduled within the next two working days. Many
      thanks. Somerset Window Cleaning`,
      expectedResponse: "INTERNAL ANALYSIS: This is SMS conversation history between Somerset Window Cleaning and customer Gail Ward. This appears to be a business review of communication patterns, not a customer inquiry requiring a response. The conversation shows: positive customer relationship, 5-star review received, discount applied (£3), regular service schedule maintained.",
      context: "Internal SMS conversation review",
      messageType: 'internal_data',
      responseQuality: 'excellent',
      tags: ['sms_history', 'gail_ward', 'internal_review', 'business_data', 'no_response_needed'],
      businessLessons: [
        'SMS conversation histories are internal business data',
        'These should trigger analysis, not customer responses',
        'Look for communication patterns and customer satisfaction indicators',
        'Note successful service delivery patterns'
      ]
    })

    // Example 3: New Customer Inquiry
    this.addTrainingExample({
      customerMessage: "Hi, I would like a quote for regular window cleaning for my 3-bedroom house in Weston-super-Mare. What are your prices and when are you next available?",
      expectedResponse: "Hello! Thank you for your enquiry about window cleaning services. We'd be delighted to provide regular window cleaning for your 3-bedroom house in Weston-super-Mare, which is well within our service area. We offer cleaning on either a 4-weekly or 8-weekly basis to suit your preferences. For an accurate quote, we'd need to visit and assess your property, taking into account factors like accessibility and any special requirements. Please email us at info@somersetwindowcleaning.co.uk or call 07123 456789 to arrange a free, no-obligation quote. We're currently booking new customers and would be happy to discuss availability that works for you. Looking forward to hearing from you!",
      context: "New customer inquiry - 3 bed house, Weston-super-Mare, pricing and availability",
      messageType: 'customer_inquiry',
      responseQuality: 'excellent',
      tags: ['new_customer', 'weston_super_mare', 'quote_request', '3_bedroom', 'pricing', 'availability'],
      businessLessons: [
        'Confirm service area coverage',
        'Mention service frequency options',
        'Explain quote process',
        'Provide clear contact information',
        'Indicate availability for new customers'
      ]
    })

    // Example 4: Complaint Pattern
    this.addTrainingExample({
      customerMessage: "Hi, I noticed you missed the back windows during the last clean. They're still quite dirty. Can you please address this?",
      expectedResponse: "I sincerely apologise for missing the back windows during your recent clean - this isn't the standard you should expect from us. We'll arrange to return within the next two working days to complete the back windows at no additional charge. This is covered under our 48-hour service guarantee. Please let me know if there were any access issues (locked gates, dogs, etc.) that we should be aware of for future visits. Thank you for bringing this to our attention, and we appreciate your patience while we put this right.",
      context: "Service complaint - missed back windows",
      messageType: 'complaint',
      responseQuality: 'excellent',
      tags: ['complaint', 'missed_windows', 'back_windows', 'service_issue', '48_hour_guarantee'],
      businessLessons: [
        'Always apologise first',
        'Offer immediate solution',
        'Mention 48-hour guarantee for complaints',
        'Ask about access issues',
        'Thank customer for feedback'
      ]
    })

    // Example 5: Existing Customer Communication
    this.addTrainingExample({
      customerMessage: "Hi, can you tell me which day you'll be coming next week for the windows? Thanks",
      expectedResponse: "Hello! Thanks for getting in touch. I'll check our schedule and confirm your cleaning day for next week. We typically provide service within your regular rotation, and I'll send you a text message confirmation once I've verified the exact day with our team. If you need to make any special arrangements for access, please let me know. Many thanks!",
      context: "Existing customer asking about schedule",
      messageType: 'existing_customer',
      responseQuality: 'good',
      tags: ['existing_customer', 'schedule_inquiry', 'next_week', 'access_arrangements'],
      businessLessons: [
        'Acknowledge regular customer relationship',
        'Offer to confirm specific timing',
        'Mention text message system',
        'Ask about access requirements'
      ]
    })

    this.generateResponsePatterns()
  }

  // Add new training example from actual conversations
  addTrainingExample(example: Omit<TrainingExample, 'id' | 'createdAt'>): void {
    const trainingExample: TrainingExample = {
      id: `training_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      ...example
    }
    
    this.trainingExamples.push(trainingExample)
    this.generateResponsePatterns()
  }

  // Generate response patterns from training data
  private generateResponsePatterns(): void {
    this.responsePatterns = []

    // Pattern: Customer praise/reviews
    this.responsePatterns.push({
      trigger: 'star review|5 star|review|praise|excellent|brilliant|good job',
      responseTemplate: 'Thank you so much for your {rating} review{customer_name}! We really appreciate your kind words and continued support. {service_continuation} Many thanks from all the team at Somerset Window Cleaning!',
      context: 'customer_praise',
      confidence: 0.9
    })

    // Pattern: SMS conversation history (internal data)
    this.responsePatterns.push({
      trigger: 'SMSReply from|SMS sent by|delivery details|Mar \\d+|Jan \\d+|conversation history',
      responseTemplate: 'INTERNAL ANALYSIS: This appears to be {message_type}. {analysis_summary} This is business data for internal review, not a customer inquiry requiring a response.',
      context: 'internal_data_analysis',
      confidence: 0.95
    })

    // Pattern: New customer inquiries
    this.responsePatterns.push({
      trigger: 'quote|price|cost|new|first time|how much',
      responseTemplate: 'Hello! Thank you for your enquiry about {service_type}. {area_confirmation} For an accurate quote, we\'d need to assess your property. Please email us at info@somersetwindowcleaning.co.uk or call 07123 456789 to arrange a free, no-obligation quote.',
      context: 'new_customer_inquiry',
      confidence: 0.8
    })

    // Pattern: Complaints
    this.responsePatterns.push({
      trigger: 'missed|problem|issue|complaint|unhappy|dirty|not done',
      responseTemplate: 'I sincerely apologise for {specific_issue}. We\'ll arrange to return within the next two working days to resolve this at no additional charge. This is covered under our 48-hour service guarantee.',
      context: 'complaint_response',
      confidence: 0.85
    })

    // Pattern: Scheduling inquiries
    this.responsePatterns.push({
      trigger: 'when|schedule|next|day|time|appointment',
      responseTemplate: 'Thanks for getting in touch{customer_name}. I\'ll check our schedule and confirm your {service_timing}. We\'ll send you a text message confirmation once verified.',
      context: 'scheduling_inquiry',
      confidence: 0.75
    })
  }

  // Get intelligent response suggestions based on training data
  getResponseSuggestion(message: string, context: string): {
    suggestedResponse: string
    confidence: number
    reasoning: string
    businessLessons: string[]
    messageType: string
  } {
    const lowerMessage = message.toLowerCase()
    let bestMatch: ResponsePattern | null = null
    let highestConfidence = 0

    // Find best matching pattern
    for (const pattern of this.responsePatterns) {
      const regex = new RegExp(pattern.trigger, 'gi')
      if (regex.test(message)) {
        if (pattern.confidence > highestConfidence) {
          bestMatch = pattern
          highestConfidence = pattern.confidence
        }
      }
    }

    if (!bestMatch) {
      return {
        suggestedResponse: 'No specific pattern matched. Use general customer service approach.',
        confidence: 0.3,
        reasoning: 'No training data pattern found for this message type',
        businessLessons: ['Consider adding this scenario to training data'],
        messageType: 'unknown'
      }
    }

    // Find similar training examples
    const similarExamples = this.trainingExamples.filter(example => {
      const similarity = this.calculateSimilarity(message, example.customerMessage)
      return similarity > 0.3
    })

    const businessLessons = similarExamples.flatMap(ex => ex.businessLessons)
    const messageType = similarExamples[0]?.messageType || 'unknown'

    return {
      suggestedResponse: this.buildResponseFromPattern(bestMatch, message, context),
      confidence: highestConfidence,
      reasoning: `Matched pattern: ${bestMatch.trigger}. Found ${similarExamples.length} similar training examples.`,
      businessLessons: [...new Set(businessLessons)], // Remove duplicates
      messageType
    }
  }

  // Build response from pattern template
  private buildResponseFromPattern(pattern: ResponsePattern, message: string, context: string): string {
    let response = pattern.responseTemplate

    // Extract customer name if available
    const nameMatch = message.match(/from ([A-Za-z]+ [A-Za-z]+)/) || message.match(/Hi ([A-Za-z]+)/)
    const customerName = nameMatch ? `, ${nameMatch[1]}` : ''
    response = response.replace('{customer_name}', customerName)

    // Extract service type
    const serviceMatch = message.match(/(window clean|gutter|pressure wash|conservatory)/i)
    const serviceType = serviceMatch ? serviceMatch[1] : 'window cleaning services'
    response = response.replace('{service_type}', serviceType)

    // Extract rating if mentioned
    const ratingMatch = message.match(/(\d+)\s*star/i)
    const rating = ratingMatch ? ratingMatch[1] + '-star' : 'excellent'
    response = response.replace('{rating}', rating)

    // Area confirmation
    const areas = ['Bath', 'Bristol', 'Weston-super-Mare', 'Keynsham', 'BS23', 'BS22']
    const mentionedArea = areas.find(area => message.toLowerCase().includes(area.toLowerCase()))
    const areaConfirmation = mentionedArea ? `We serve ${mentionedArea} and surrounding areas.` : ''
    response = response.replace('{area_confirmation}', areaConfirmation)

    // Service timing
    response = response.replace('{service_timing}', 'cleaning appointment')
    response = response.replace('{service_continuation}', 'We look forward to continuing to provide excellent service.')

    // Analysis for internal data
    if (pattern.context === 'internal_data_analysis') {
      response = response.replace('{message_type}', 'SMS conversation history or business data')
      response = response.replace('{analysis_summary}', 'The message contains business communication records.')
    }

    // Specific issue for complaints
    const issueMatch = message.match(/(missed|dirty|not done|problem with) ([^.]+)/i)
    const specificIssue = issueMatch ? issueMatch[0] : 'the service issue'
    response = response.replace('{specific_issue}', specificIssue)

    return response
  }

  // Calculate message similarity for training matching
  private calculateSimilarity(message1: string, message2: string): number {
    const words1 = message1.toLowerCase().split(/\s+/)
    const words2 = message2.toLowerCase().split(/\s+/)
    
    const commonWords = words1.filter(word => words2.includes(word))
    const totalWords = Math.max(words1.length, words2.length)
    
    return commonWords.length / totalWords
  }

  // Get training insights for system improvement
  getTrainingInsights(): {
    totalExamples: number
    messageTypes: Record<string, number>
    qualityDistribution: Record<string, number>
    commonTags: string[]
    businessLessons: string[]
  } {
    const messageTypes: Record<string, number> = {}
    const qualityDistribution: Record<string, number> = {}
    const tagCounts: Record<string, number> = {}
    const allLessons: string[] = []

    this.trainingExamples.forEach(example => {
      messageTypes[example.messageType] = (messageTypes[example.messageType] || 0) + 1
      qualityDistribution[example.responseQuality] = (qualityDistribution[example.responseQuality] || 0) + 1
      
      example.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
      
      allLessons.push(...example.businessLessons)
    })

    const commonTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([tag]) => tag)

    const uniqueLessons = [...new Set(allLessons)]

    return {
      totalExamples: this.trainingExamples.length,
      messageTypes,
      qualityDistribution,
      commonTags,
      businessLessons: uniqueLessons
    }
  }

  // Export training data for analysis
  exportTrainingData(): TrainingExample[] {
    return this.trainingExamples
  }

  // Load training data from external source
  importTrainingData(examples: TrainingExample[]): void {
    this.trainingExamples = examples
    this.generateResponsePatterns()
  }
}

// Export singleton instance
export const trainingDataSystem = new TrainingDataSystem()
export type { TrainingExample, ResponsePattern }