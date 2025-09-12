import { NextResponse } from 'next/server'
import { checkEnvironmentConfig } from '@/app/lib/env-validation'

export async function GET() {
  try {
    const envCheck = checkEnvironmentConfig()
    
    if (!envCheck.isValid) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Missing required environment variables',
          missingVars: envCheck.missingVars,
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    // Basic connectivity test
    const startTime = Date.now()
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime,
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
      },
      version: '1.0.0'
    })
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Health check failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}