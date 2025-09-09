'use client'

import { useState } from 'react'

interface MessageInputProps {
  onSubmit: (message: string, context?: string) => void
  isLoading: boolean
}

export default function MessageInput({ onSubmit, isLoading }: MessageInputProps) {
  const [message, setMessage] = useState('')
  const [context, setContext] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSubmit(message.trim(), context.trim() || undefined)
    }
  }

  const handleClear = () => {
    setMessage('')
    setContext('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="customer-message" className="block text-sm font-medium text-gray-700 mb-2">
          Customer Message *
        </label>
        <textarea
          id="customer-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste the customer's email or message here..."
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-somerset-red focus:border-somerset-red resize-vertical"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="additional-context" className="block text-sm font-medium text-gray-700 mb-2">
          Additional Context (Optional)
        </label>
        <textarea
          id="additional-context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Add internal notes, scheduling info, etc. (e.g., 'Book Thursday 18th', 'Customer prefers mornings', 'Large property - quote accordingly')"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-somerset-red focus:border-somerset-red resize-vertical"
          disabled={isLoading}
        />
        <p className="mt-1 text-xs text-gray-500">
          Internal notes to help generate a better response - not visible to customer
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="flex-1 bg-somerset-red text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Response...
            </span>
          ) : (
            'Generate Response'
          )}
        </button>

        <button
          type="button"
          onClick={handleClear}
          disabled={isLoading}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          Clear
        </button>
      </div>
    </form>
  )
}