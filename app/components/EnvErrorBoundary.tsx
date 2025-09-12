'use client'

import { useEffect, useState } from 'react'

export default function EnvErrorBoundary({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // Check for environment configuration on client side
    fetch('/api/health')
      .then(response => {
        if (!response.ok) {
          throw new Error('Configuration error')
        }
        return response.json()
      })
      .catch(() => {
        setHasError(true)
        setErrorMessage(
          'The application is not properly configured. Please contact the administrator.'
        )
      })
  }, [])

  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex items-center mb-4">
            <svg className="h-8 w-8 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.19 2.5 1.732 2.5z" />
            </svg>
            <h1 className="text-2xl font-bold text-red-600">
              Configuration Error
            </h1>
          </div>
          
          <p className="text-gray-700 mb-6">{errorMessage}</p>
          
          <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
            <h3 className="text-sm font-medium text-red-800 mb-2">
              For Administrators:
            </h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Check that ANTHROPIC_API_KEY is set</li>
              <li>• Verify environment variables in deployment</li>
              <li>• Restart the application after adding variables</li>
            </ul>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-somerset-red text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
            <a
              href="mailto:info@somersetwindowcleaning.co.uk"
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-center"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}