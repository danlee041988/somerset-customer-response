import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const { rating, comments, responseContent, timestamp } = await request.json()

    if (!rating) {
      return NextResponse.json(
        { error: 'Rating is required' },
        { status: 400 }
      )
    }

    // Create feedback record
    const feedback = {
      id: generateId(),
      rating,
      comments: comments || '',
      responseContent,
      timestamp: timestamp || new Date().toISOString(),
      processed: false
    }

    // Save feedback to JSON file (in production, you'd use a proper database)
    await saveFeedback(feedback)

    return NextResponse.json({
      success: true,
      message: 'Feedback received successfully'
    })

  } catch (error) {
    console.error('Error saving feedback:', error)
    
    return NextResponse.json(
      { error: 'Failed to save feedback' },
      { status: 500 }
    )
  }
}

async function saveFeedback(feedback: any) {
  try {
    const dataDir = join(process.cwd(), 'data')
    const feedbackFile = join(dataDir, 'feedback.json')

    // Ensure data directory exists
    try {
      await fs.access(dataDir)
    } catch {
      await fs.mkdir(dataDir, { recursive: true })
    }

    // Read existing feedback or create empty array
    let existingFeedback = []
    try {
      const data = await fs.readFile(feedbackFile, 'utf8')
      existingFeedback = JSON.parse(data)
    } catch {
      // File doesn't exist yet, start with empty array
    }

    // Add new feedback
    existingFeedback.push(feedback)

    // Write back to file
    await fs.writeFile(feedbackFile, JSON.stringify(existingFeedback, null, 2))
    
    console.log('Feedback saved successfully:', feedback.id)
  } catch (error) {
    console.error('Error writing feedback file:', error)
    throw error
  }
}

function generateId(): string {
  return `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}