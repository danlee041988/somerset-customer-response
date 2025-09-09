import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import { join } from 'path'

interface KnowledgeEntry {
  id: string
  category: string
  content: string
  timestamp: string
  version: number
}

export async function POST(request: NextRequest) {
  try {
    const { category, content, timestamp } = await request.json()

    if (!category || !content) {
      return NextResponse.json(
        { error: 'Category and content are required' },
        { status: 400 }
      )
    }

    // Create knowledge entry
    const knowledgeEntry: KnowledgeEntry = {
      id: generateId(),
      category,
      content: content.trim(),
      timestamp: timestamp || new Date().toISOString(),
      version: 1
    }

    // Save to knowledge base
    await saveKnowledgeEntry(knowledgeEntry)

    // Update the business context file with new knowledge
    await updateBusinessContext(category, content)

    return NextResponse.json({
      success: true,
      message: 'Knowledge base updated successfully',
      entryId: knowledgeEntry.id
    })

  } catch (error) {
    console.error('Error updating knowledge base:', error)
    
    return NextResponse.json(
      { error: 'Failed to update knowledge base' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const knowledgeBase = await loadKnowledgeBase()
    
    // Group by category
    const categorizedKnowledge = knowledgeBase.reduce((acc, entry) => {
      if (!acc[entry.category]) {
        acc[entry.category] = []
      }
      acc[entry.category].push(entry)
      return acc
    }, {} as Record<string, KnowledgeEntry[]>)

    return NextResponse.json({
      knowledgeBase: categorizedKnowledge,
      totalEntries: knowledgeBase.length,
      lastUpdated: knowledgeBase.length > 0 ? 
        Math.max(...knowledgeBase.map(entry => new Date(entry.timestamp).getTime())) : 
        null
    })

  } catch (error) {
    console.error('Error loading knowledge base:', error)
    
    return NextResponse.json(
      { error: 'Failed to load knowledge base' },
      { status: 500 }
    )
  }
}

async function saveKnowledgeEntry(entry: KnowledgeEntry) {
  try {
    const dataDir = join(process.cwd(), 'data')
    const knowledgeFile = join(dataDir, 'knowledge-base.json')

    // Ensure data directory exists
    try {
      await fs.access(dataDir)
    } catch {
      await fs.mkdir(dataDir, { recursive: true })
    }

    // Load existing knowledge base
    let knowledgeBase: KnowledgeEntry[] = []
    try {
      const data = await fs.readFile(knowledgeFile, 'utf8')
      knowledgeBase = JSON.parse(data)
    } catch {
      // File doesn't exist yet
    }

    // Check if updating existing entry for same category
    const existingIndex = knowledgeBase.findIndex(
      existing => existing.category === entry.category
    )

    if (existingIndex >= 0) {
      // Update existing entry, increment version
      entry.version = knowledgeBase[existingIndex].version + 1
      knowledgeBase[existingIndex] = entry
    } else {
      // Add new entry
      knowledgeBase.push(entry)
    }

    // Write back to file
    await fs.writeFile(knowledgeFile, JSON.stringify(knowledgeBase, null, 2))
    
    console.log('Knowledge entry saved:', entry.id, entry.category)
  } catch (error) {
    console.error('Error saving knowledge entry:', error)
    throw error
  }
}

async function loadKnowledgeBase(): Promise<KnowledgeEntry[]> {
  try {
    const knowledgeFile = join(process.cwd(), 'data', 'knowledge-base.json')
    const data = await fs.readFile(knowledgeFile, 'utf8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function updateBusinessContext(category: string, content: string) {
  try {
    // Update the business context file to include new knowledge
    const contextFile = join(process.cwd(), 'app', 'lib', 'business-context.ts')
    
    // Read current content
    let currentContent = await fs.readFile(contextFile, 'utf8')
    
    // Add timestamp comment to track when knowledge was updated
    const updateComment = `\n// Knowledge updated: ${new Date().toISOString()} - Category: ${category}\n`
    
    // Insert the comment before the last closing brace
    const insertPosition = currentContent.lastIndexOf('}')
    if (insertPosition > -1) {
      currentContent = currentContent.slice(0, insertPosition) + 
                     updateComment + 
                     currentContent.slice(insertPosition)
    }
    
    await fs.writeFile(contextFile, currentContent)
    
    console.log('Business context updated for category:', category)
  } catch (error) {
    console.error('Error updating business context file:', error)
    // Don't throw - this is a nice-to-have update
  }
}

function generateId(): string {
  return `kb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}