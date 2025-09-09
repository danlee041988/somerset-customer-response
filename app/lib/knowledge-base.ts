import { promises as fs } from 'fs'
import { join } from 'path'

interface KnowledgeEntry {
  id: string
  category: string
  content: string
  timestamp: string
  version: number
}

export async function getKnowledgeBase(): Promise<Record<string, string>> {
  try {
    const knowledgeFile = join(process.cwd(), 'data', 'knowledge-base.json')
    const data = await fs.readFile(knowledgeFile, 'utf8')
    const knowledgeBase: KnowledgeEntry[] = JSON.parse(data)
    
    // Convert to category-indexed format for easy retrieval
    const categorizedKnowledge: Record<string, string> = {}
    
    knowledgeBase.forEach(entry => {
      categorizedKnowledge[entry.category] = entry.content
    })
    
    return categorizedKnowledge
  } catch (error) {
    console.log('Knowledge base not found, using default business context')
    return {}
  }
}

export async function getRelevantKnowledge(customerMessage: string): Promise<string> {
  const knowledgeBase = await getKnowledgeBase()
  
  if (Object.keys(knowledgeBase).length === 0) {
    return ''
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

export async function getAllKnowledgeForPrompt(): Promise<string> {
  const knowledgeBase = await getKnowledgeBase()
  
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