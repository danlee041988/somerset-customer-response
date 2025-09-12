'use client'

import { useState } from 'react'

interface MessageInputProps {
  onSubmit: (message: string, context?: string) => void
  isLoading: boolean
}

const MAX_MESSAGE_LENGTH = 2000
const MAX_CONTEXT_LENGTH = 500
const MIN_MESSAGE_LENGTH = 10

export default function MessageInput({ onSubmit, isLoading }: MessageInputProps) {
  const [message, setMessage] = useState('')
  const [context, setContext] = useState('')
  const [errors, setErrors] = useState<{message?: string; context?: string}>({})

  const validateInput = () => {
    const newErrors: {message?: string; context?: string} = {}
    
    if (!message.trim()) {
      newErrors.message = 'Please enter a customer message'
    } else if (message.trim().length < MIN_MESSAGE_LENGTH) {
      newErrors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters long`
    } else if (message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message is too long (${message.length}/${MAX_MESSAGE_LENGTH} characters)`
    }
    
    if (context.length > MAX_CONTEXT_LENGTH) {
      newErrors.context = `Context is too long (${context.length}/${MAX_CONTEXT_LENGTH} characters)`
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateInput()) {
      onSubmit(message.trim(), context.trim() || undefined)
    }
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setMessage(value)
    
    // Clear message error when user starts typing
    if (errors.message && value.trim()) {
      setErrors(prev => ({ ...prev, message: undefined }))
    }
  }

  const handleContextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setContext(value)
    
    // Clear context error when under limit
    if (errors.context && value.length <= MAX_CONTEXT_LENGTH) {
      setErrors(prev => ({ ...prev, context: undefined }))
    }
  }

  const handleClear = () => {
    setMessage('')
    setContext('')
    setErrors({})
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
          onChange={handleMessageChange}
          placeholder="Paste the customer's email or message here..."
          rows={8}
          className={`w-full px-3 py-2 border rounded-md shadow-sm resize-vertical input-focus ${
            errors.message 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300'
          }`}
          required
          disabled={isLoading}
          maxLength={MAX_MESSAGE_LENGTH}
          aria-describedby={`message-help ${errors.message ? 'message-error' : ''}`}
          aria-invalid={!!errors.message}
        />
        <div className="mt-1 flex justify-between items-start">
          <div>
            {errors.message ? (
              <p id="message-error" className="text-xs text-red-600" role="alert">
                {errors.message}
              </p>
            ) : (
              <p id="message-help" className="text-xs text-gray-500">
                Required: Enter the customer's message or email that needs a response.
              </p>
            )}
          </div>
          <div className={`text-xs ${
            message.length > MAX_MESSAGE_LENGTH * 0.9 
              ? 'text-red-600' 
              : message.length > MAX_MESSAGE_LENGTH * 0.7 
                ? 'text-yellow-600' 
                : 'text-gray-500'
          }`}>
            {message.length}/{MAX_MESSAGE_LENGTH}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="additional-context" className="block text-sm font-medium text-gray-700 mb-2">
          Additional Context (Optional)
        </label>
        <textarea
          id="additional-context"
          value={context}
          onChange={handleContextChange}
          placeholder="Add internal notes, scheduling info, etc. (e.g., 'Book Thursday 18th', 'Customer prefers mornings', 'Large property - quote accordingly')"
          rows={3}
          className={`w-full px-3 py-2 border rounded-md shadow-sm resize-vertical input-focus ${
            errors.context 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300'
          }`}
          disabled={isLoading}
          maxLength={MAX_CONTEXT_LENGTH}
          aria-describedby={`context-help ${errors.context ? 'context-error' : ''}`}
          aria-invalid={!!errors.context}
        />
        <div className="mt-1 flex justify-between items-start">
          <div>
            {errors.context ? (
              <p id="context-error" className="text-xs text-red-600" role="alert">
                {errors.context}
              </p>
            ) : (
              <p id="context-help" className="text-xs text-gray-500">
                Internal notes to help generate a better response - not visible to customer
              </p>
            )}
          </div>
          <div className={`text-xs ${
            context.length > MAX_CONTEXT_LENGTH * 0.9 
              ? 'text-red-600' 
              : context.length > MAX_CONTEXT_LENGTH * 0.7 
                ? 'text-yellow-600' 
                : 'text-gray-500'
          }`}>
            {context.length}/{MAX_CONTEXT_LENGTH}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!message.trim() || isLoading || Object.keys(errors).length > 0}
          className="flex-1 bg-somerset-red text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium btn-focus"
          aria-describedby="submit-help"
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
        <p id="submit-help" className="sr-only">
          Generate an AI response based on the customer message and any additional context provided.
        </p>

        <button
          type="button"
          onClick={handleClear}
          disabled={isLoading}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors btn-focus"
          aria-label="Clear all input fields"
        >
          Clear
        </button>
      </div>
    </form>
  )
}