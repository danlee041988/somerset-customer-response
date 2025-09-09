'use client'

import { useState } from 'react'

interface MessageInputProps {
  onSubmit: (message: string, customerEmail?: string) => void
  isLoading: boolean
}

export default function MessageInput({ onSubmit, isLoading }: MessageInputProps) {
  const [message, setMessage] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSubmit(message.trim(), customerEmail.trim() || undefined)
    }
  }

  const handleClear = () => {
    setMessage('')
    setCustomerEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="customer-email" className="block text-sm font-medium text-gray-700 mb-2">
          Customer Email (Optional)
        </label>
        <input
          id="customer-email"
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          placeholder="customer@email.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-somerset-blue focus:border-somerset-blue"
          disabled={isLoading}
        />
      </div>

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
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-somerset-blue focus:border-somerset-blue resize-vertical"
          required
          disabled={isLoading}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="flex-1 bg-somerset-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
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