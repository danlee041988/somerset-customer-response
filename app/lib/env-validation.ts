export class EnvironmentError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EnvironmentError'
  }
}

export function validateEnvironment(): void {
  const required = {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  }
  
  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key]) => key)
    
  if (missing.length > 0) {
    throw new EnvironmentError(
      `Missing required environment variables: ${missing.join(', ')}`
    )
  }
}

export function checkEnvironmentConfig(): { isValid: boolean; missingVars: string[] } {
  const required = {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  }
  
  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key]) => key)
    
  return {
    isValid: missing.length === 0,
    missingVars: missing
  }
}