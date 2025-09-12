'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error)
  }, [error])

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <div className="text-center p-6 lg:p-8 bg-white rounded-lg shadow-sm border max-w-md w-full">
        <div className="flex justify-center mb-4">
          <svg 
            className="h-16 w-16 text-red-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.19 2.5 1.732 2.5z" 
            />
          </svg>
        </div>
        
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h2>
        
        <p className="text-gray-600 mb-6 text-sm lg:text-base">
          We apologize for the inconvenience. An unexpected error occurred while processing your request.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full px-4 py-2 bg-somerset-red text-white rounded-md hover:bg-red-700 transition-colors btn-focus font-medium"
            aria-describedby="retry-help"
          >
            Try again
          </button>
          <p id="retry-help" className="sr-only">
            Retry the operation that caused the error
          </p>
          
          <a
            href="/"
            className="block w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors btn-focus font-medium text-center"
          >
            Go to homepage
          </a>
          
          <div className="pt-4 border-t border-gray-200 text-xs text-gray-500">
            <p>If this problem persists, please contact support:</p>
            <a 
              href="mailto:info@somersetwindowcleaning.co.uk"
              className="text-somerset-red hover:text-red-700 underline"
            >
              info@somersetwindowcleaning.co.uk
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}