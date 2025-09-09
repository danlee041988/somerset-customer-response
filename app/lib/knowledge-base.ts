// Import knowledge base statically to work in serverless environments
import { knowledgeBaseData } from './knowledge-base-data'

interface KnowledgeEntry {
  id: string
  category: string
  content: string
  timestamp: string
  version: number
}

export function getKnowledgeBase(): Record<string, string> {
  try {
    // Convert to category-indexed format for easy retrieval
    const categorizedKnowledge: Record<string, string> = {}
    
    knowledgeBaseData.forEach(entry => {
      categorizedKnowledge[entry.category] = entry.content
    })
    
    return categorizedKnowledge
  } catch (error) {
    console.error('Error processing knowledge base:', error)
    return {}
  }
}

// Fallback knowledge for serverless environments
const FALLBACK_KNOWLEDGE: Record<string, string> = {
  services: 'Window cleaning (4-weekly, 8-weekly), gutter clearing, gutter & fascia cleaning, pressure washing, conservatory cleaning, solar panel cleaning',
  pricing: 'Pricing based on property size and service frequency. Contact for quote.',
  policies: 'All work guaranteed for 48 hours. Weather dependent service.',
  areas: 'Serving Bath, Bristol, Keynsham, Saltford, Paulton, Midsomer Norton, Radstock and surrounding Somerset areas',
  scheduling: 'We work Monday to Friday, 8am-5pm, with Saturday availability for larger jobs. Weather dependent.',
  general: 'Professional window cleaning service covering Somerset areas. Contact info@somersetwindowcleaning.co.uk for quotes.'
}

export function getRelevantKnowledge(customerMessage: string): string {
  let knowledgeBase
  
  try {
    knowledgeBase = getKnowledgeBase()
    
    if (Object.keys(knowledgeBase).length === 0) {
      console.warn('Knowledge base empty, using fallback knowledge')
      knowledgeBase = FALLBACK_KNOWLEDGE
    }
  } catch (error) {
    console.error('Error loading knowledge base, using fallback:', error)
    knowledgeBase = FALLBACK_KNOWLEDGE
  }
  
  let relevantKnowledge = ''
  const messageLower = customerMessage.toLowerCase()
  
  // Check for service-related keywords
  if (messageLower.includes('window') || messageLower.includes('clean') || 
      messageLower.includes('service') || messageLower.includes('quote')) {
    if (knowledgeBase.services) {
      relevantKnowledge += `\nSERVICE INFORMATION:\n${knowledgeBase.services}\n`
    }
  }
  
  // Check for pricing keywords
  if (messageLower.includes('price') || messageLower.includes('cost') || 
      messageLower.includes('quote') || messageLower.includes('charge')) {
    if (knowledgeBase.pricing) {
      relevantKnowledge += `\nPRICING INFORMATION:\n${knowledgeBase.pricing}\n`
    }
  }
  
  // Check for scheduling keywords
  if (messageLower.includes('when') || messageLower.includes('available') || 
      messageLower.includes('book') || messageLower.includes('appointment')) {
    if (knowledgeBase.scheduling) {
      relevantKnowledge += `\nSCHEDULING INFORMATION:\n${knowledgeBase.scheduling}\n`
    }
  }
  
  // Check for area keywords
  const areas = ['bath', 'bristol', 'keynsham', 'saltford', 'paulton', 'midsomer norton', 'radstock']
  if (areas.some(area => messageLower.includes(area))) {
    if (knowledgeBase.areas) {
      relevantKnowledge += `\nSERVICE AREA INFORMATION:\n${knowledgeBase.areas}\n`
    }
  }
  
  // Check for policy keywords
  if (messageLower.includes('cancel') || messageLower.includes('refund') || 
      messageLower.includes('weather') || messageLower.includes('payment')) {
    if (knowledgeBase.policies) {
      relevantKnowledge += `\nPOLICY INFORMATION:\n${knowledgeBase.policies}\n`
    }
  }
  
  // Always include customer service guidelines if available
  if (knowledgeBase['customer-service']) {
    relevantKnowledge += `\nCUSTOMER SERVICE GUIDELINES:\n${knowledgeBase['customer-service']}\n`
  }
  
  // Include general business information
  if (knowledgeBase.general) {
    relevantKnowledge += `\nGENERAL BUSINESS INFORMATION:\n${knowledgeBase.general}\n`
  }
  
  return relevantKnowledge
}

export function getAllKnowledgeForPrompt(): string {
  const knowledgeBase = getKnowledgeBase()
  
  if (Object.keys(knowledgeBase).length === 0) {
    return ''
  }
  
  let allKnowledge = '\n=== COMPREHENSIVE BUSINESS KNOWLEDGE ===\n'
  
  const categoryOrder = [
    'services',
    'pricing', 
    'policies',
    'areas',
    'scheduling',
    'equipment',
    'customer-service',
    'seasonal',
    'emergency',
    'general'
  ]
  
  categoryOrder.forEach(category => {
    if (knowledgeBase[category]) {
      const categoryName = category.replace('-', ' ').toUpperCase()
      allKnowledge += `\n--- ${categoryName} ---\n${knowledgeBase[category]}\n`
    }
  })
  
  allKnowledge += '\n=== END KNOWLEDGE BASE ===\n'
  
  return allKnowledge
}