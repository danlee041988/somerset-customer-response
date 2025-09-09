// Conversation Memory System for Somerset Window Cleaning
// Stores conversation history and context for intelligent responses

interface ConversationMessage {
  id: string
  conversationId: string
  timestamp: Date
  messageType: 'customer' | 'ai_response' | 'internal_note' | 'sms_thread' | 'business_data'
  content: string
  context: string
  sender?: string
  confidence?: number
  businessContext?: {
    serviceAreas?: string[]
    services?: string[]
    customerInfo?: any
  }
}

interface Conversation {
  id: string
  customerId?: string
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  startDate: Date
  lastActivity: Date
  status: 'active' | 'resolved' | 'internal_review' | 'archived'
  conversationType: 'customer_inquiry' | 'existing_customer' | 'internal_communication' | 'sms_thread_review'
  messages: ConversationMessage[]
  summary?: string
  tags: string[]
}

export class ConversationMemory {
  private conversations: Map<string, Conversation> = new Map()
  
  // Serverless-compatible constructor (no localStorage in server environment)
  constructor() {
    // Skip localStorage in serverless environment
  }

  // Intelligent message type detection
  detectMessageType(content: string, context: string): 'customer' | 'ai_response' | 'internal_note' | 'sms_thread' | 'business_data' {
    const lowerContent = content.toLowerCase()
    const lowerContext = context.toLowerCase()

    // Check for SMS thread patterns
    if (content.includes('SMSReply from') || content.includes('SMS sent by') || 
        content.includes('delivery details') || content.includes('Mar ') || 
        content.includes('Jan ') || content.includes('Jul ')) {
      return 'sms_thread'
    }

    // Check for internal business data
    if (lowerContent.includes('appointment is scheduled') || 
        lowerContent.includes('payment using the following link') ||
        lowerContent.includes('invoice') ||
        lowerContext.includes('internal') || 
        lowerContext.includes('review')) {
      return 'business_data'
    }

    // Check for customer inquiries
    if (lowerContent.includes('quote') || lowerContent.includes('window clean') || 
        lowerContent.includes('how much') || lowerContent.includes('service') ||
        lowerContent.includes('when can') || lowerContent.includes('available')) {
      return 'customer'
    }

    // Check for AI responses
    if (lowerContent.includes('somerset window cleaning') || 
        lowerContent.includes('thank you for contacting') ||
        lowerContent.includes('info@somersetwindowcleaning.co.uk')) {
      return 'ai_response'
    }

    return 'internal_note'
  }

  // Get conversation type based on content analysis
  getConversationType(messages: ConversationMessage[]): 'customer_inquiry' | 'existing_customer' | 'internal_communication' | 'sms_thread_review' {
    if (messages.some(m => m.messageType === 'sms_thread' || m.messageType === 'business_data')) {
      return 'sms_thread_review'
    }

    if (messages.some(m => m.messageType === 'customer' && 
        (m.content.toLowerCase().includes('quote') || m.content.toLowerCase().includes('new')))) {
      return 'customer_inquiry'
    }

    if (messages.some(m => m.content.toLowerCase().includes('gail') || 
        m.content.toLowerCase().includes('existing') || 
        m.content.toLowerCase().includes('regular'))) {
      return 'existing_customer'
    }

    return 'internal_communication'
  }

  // Create or update conversation
  addMessage(content: string, context: string, sender?: string): string {
    const messageType = this.detectMessageType(content, context)
    const conversationId = this.generateConversationId(content, context)
    
    let conversation = this.conversations.get(conversationId)
    
    if (!conversation) {
      conversation = {
        id: conversationId,
        startDate: new Date(),
        lastActivity: new Date(),
        status: 'active',
        conversationType: 'customer_inquiry', // Will be updated after adding message
        messages: [],
        tags: []
      }
      this.conversations.set(conversationId, conversation)
    }

    const message: ConversationMessage = {
      id: this.generateMessageId(),
      conversationId,
      timestamp: new Date(),
      messageType,
      content,
      context,
      sender
    }

    conversation.messages.push(message)
    conversation.lastActivity = new Date()
    conversation.conversationType = this.getConversationType(conversation.messages)
    
    // Extract customer information if available
    this.extractCustomerInfo(conversation, content, context)
    
    // Update tags based on content
    this.updateTags(conversation, content, context)

    // Skip saving in serverless environment
    return conversationId
  }

  // Extract customer information from messages
  private extractCustomerInfo(conversation: Conversation, content: string, context: string): void {
    // Extract names
    const nameMatch = content.match(/Hi ([A-Za-z]+)/) || content.match(/from ([A-Za-z]+ [A-Za-z]+)/)
    if (nameMatch && !conversation.customerName) {
      conversation.customerName = nameMatch[1]
    }

    // Extract phone numbers
    const phoneMatch = content.match(/\b\d{11}\b/) || content.match(/07\d{9}/)
    if (phoneMatch && !conversation.customerPhone) {
      conversation.customerPhone = phoneMatch[0]
    }

    // Extract service areas from content
    const areas = ['Bath', 'Bristol', 'Keynsham', 'Saltford', 'Paulton', 'Weston-super-Mare', 'BS23', 'BS22', 'BS24']
    const mentionedAreas = areas.filter(area => 
      content.toLowerCase().includes(area.toLowerCase()) || 
      context.toLowerCase().includes(area.toLowerCase())
    )
    
    if (mentionedAreas.length > 0) {
      if (!conversation.businessContext) conversation.businessContext = {}
      conversation.businessContext.serviceAreas = mentionedAreas
    }
  }

  // Update conversation tags
  private updateTags(conversation: Conversation, content: string, context: string): void {
    const lowerContent = content.toLowerCase()
    const lowerContext = context.toLowerCase()

    const tagKeywords = {
      'review': ['review', 'star', 'rating'],
      'complaint': ['complaint', 'unhappy', 'problem', 'issue'],
      'pricing': ['price', 'cost', 'quote', 'charge'],
      'scheduling': ['when', 'available', 'appointment', 'book'],
      'gutter': ['gutter', 'fascia', 'soffit'],
      'window': ['window', 'glass', 'clean'],
      'regular_customer': ['gail', 'regular', 'existing'],
      'new_customer': ['new', 'first time', 'quote'],
      'sms_history': ['smsreply', 'delivery details', 'mar ', 'jan '],
      'payment': ['payment', 'invoice', 'link', 'sqgee.com'],
      'discount': ['discount', '£3', 'offer'],
      'motorhome': ['motorhome', 'caravan', 'move']
    }

    for (const [tag, keywords] of Object.entries(tagKeywords)) {
      if (keywords.some(keyword => lowerContent.includes(keyword) || lowerContext.includes(keyword))) {
        if (!conversation.tags.includes(tag)) {
          conversation.tags.push(tag)
        }
      }
    }
  }

  // Get conversation history for intelligent responses
  getConversationHistory(conversationId: string): Conversation | null {
    return this.conversations.get(conversationId) || null
  }

  // Get context for AI response generation
  getAIContext(conversationId: string): string {
    const conversation = this.conversations.get(conversationId)
    if (!conversation) return ''

    let contextString = `\nCONVERSATION MEMORY:\n`
    contextString += `- Type: ${conversation.conversationType}\n`
    contextString += `- Status: ${conversation.status}\n`
    contextString += `- Tags: ${conversation.tags.join(', ')}\n`
    
    if (conversation.customerName) {
      contextString += `- Customer: ${conversation.customerName}\n`
    }
    
    if (conversation.businessContext?.serviceAreas) {
      contextString += `- Service Areas Mentioned: ${conversation.businessContext.serviceAreas.join(', ')}\n`
    }

    contextString += `- Message Count: ${conversation.messages.length}\n`
    contextString += `- Last Activity: ${conversation.lastActivity.toLocaleDateString()}\n`

    // Add recent message context (last 3 messages)
    const recentMessages = conversation.messages.slice(-3)
    if (recentMessages.length > 0) {
      contextString += `\nRECENT MESSAGES:\n`
      recentMessages.forEach((msg, index) => {
        contextString += `${index + 1}. [${msg.messageType}] ${msg.content.substring(0, 100)}${msg.content.length > 100 ? '...' : ''}\n`
      })
    }

    return contextString
  }

  // Generate conversation ID based on content patterns
  private generateConversationId(content: string, context: string): string {
    // Try to extract customer name or phone for consistent ID
    const nameMatch = content.match(/from ([A-Za-z]+ [A-Za-z]+)/) || content.match(/Hi ([A-Za-z]+)/)
    if (nameMatch) {
      return `conv_${nameMatch[1].toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`
    }

    const phoneMatch = content.match(/\b\d{11}\b/)
    if (phoneMatch) {
      return `conv_phone_${phoneMatch[0]}`
    }

    // For SMS threads, use a pattern-based ID
    if (content.includes('SMSReply from')) {
      const senderMatch = content.match(/SMSReply from ([A-Za-z]+ [A-Za-z]+)/)
      if (senderMatch) {
        return `sms_thread_${senderMatch[1].toLowerCase().replace(/\s+/g, '_')}`
      }
    }

    // Fallback to timestamp-based ID
    return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Get intelligent recommendations for response type
  getResponseRecommendation(conversationId: string): {
    shouldRespond: boolean
    responseType: 'customer_service' | 'internal_analysis' | 'no_response_needed'
    reason: string
    suggestedAction?: string
  } {
    const conversation = this.conversations.get(conversationId)
    if (!conversation) {
      return {
        shouldRespond: false,
        responseType: 'no_response_needed',
        reason: 'No conversation context available'
      }
    }

    // Analyze conversation type and content
    switch (conversation.conversationType) {
      case 'sms_thread_review':
        return {
          shouldRespond: false,
          responseType: 'internal_analysis',
          reason: 'This appears to be SMS conversation history for internal review',
          suggestedAction: 'Analyze customer communication patterns and service delivery quality'
        }

      case 'internal_communication':
        return {
          shouldRespond: false,
          responseType: 'internal_analysis',
          reason: 'Internal business communication detected',
          suggestedAction: 'Process as internal business data, no customer response needed'
        }

      case 'customer_inquiry':
        return {
          shouldRespond: true,
          responseType: 'customer_service',
          reason: 'New customer inquiry requiring response',
          suggestedAction: 'Provide helpful information about services, pricing, and availability'
        }

      case 'existing_customer':
        return {
          shouldRespond: true,
          responseType: 'customer_service',
          reason: 'Existing customer communication',
          suggestedAction: 'Provide personalized response based on customer history'
        }

      default:
        return {
          shouldRespond: true,
          responseType: 'customer_service',
          reason: 'Default customer service response',
          suggestedAction: 'Provide general Somerset Window Cleaning assistance'
        }
    }
  }

  // Export conversation data for analysis
  exportConversations(): Conversation[] {
    return Array.from(this.conversations.values())
  }

  // Clear old conversations (data management)
  cleanupOldConversations(daysOld: number = 90): number {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysOld)
    
    let removedCount = 0
    for (const [id, conversation] of this.conversations.entries()) {
      if (conversation.lastActivity < cutoffDate && conversation.status !== 'active') {
        this.conversations.delete(id)
        removedCount++
      }
    }
    
    // Skip saving in serverless environment
    return removedCount
  }
}

// Export singleton instance
export const conversationMemory = new ConversationMemory()

// Export types for use in other components
export type { Conversation, ConversationMessage }