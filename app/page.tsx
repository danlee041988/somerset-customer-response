'use client'

import { useState } from 'react'
import MessageInput from './components/MessageInput'
import ResponseDisplay from './components/ResponseDisplay'
import type { CustomerMessage, AIResponse } from './types/index'

export default function Home() {
  const [currentMessage, setCurrentMessage] = useState<CustomerMessage | null>(null)
  const [currentResponse, setCurrentResponse] = useState<AIResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleMessageSubmit = async (message: string, customerEmail?: string) => {
    setIsLoading(true)
    setCurrentMessage({ content: message, customerEmail })
    setCurrentResponse(null)

    try {
      const response = await fetch('/api/ai/generate-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          customerEmail,
          timestamp: new Date().toISOString()
        }),
      })

      const data = await response.json()
      setCurrentResponse(data)
    } catch (error) {
      console.error('Error generating response:', error)
      setCurrentResponse({
        content: 'Sorry, there was an error generating the response. Please try again.',
        confidence: 0,
        suggestions: ['Check your internet connection', 'Verify API configuration']
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Customer Message Processor
            </h2>
            <p className="text-gray-600 mt-2">
              Paste a customer email or message below to generate a professional response 
              tailored to Somerset Window Cleaning&apos;s services and availability.
            </p>
          </div>
          <a
            href="/admin"
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            📚 Manage Knowledge Base
          </a>
        </div>
        
        <MessageInput onSubmit={handleMessageSubmit} isLoading={isLoading} />
      </div>

      {(currentMessage || currentResponse) && (
        <div className="grid md:grid-cols-2 gap-6">
          {currentMessage && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Customer Message
              </h3>
              <div className="bg-gray-50 rounded p-4">
                <p className="whitespace-pre-wrap text-gray-800">
                  {currentMessage.content}
                </p>
                {currentMessage.customerEmail && (
                  <p className="text-sm text-gray-500 mt-2">
                    From: {currentMessage.customerEmail}
                  </p>
                )}
              </div>
            </div>
          )}

          <ResponseDisplay response={currentResponse} isLoading={isLoading} />
        </div>
      )}
    </div>
  )
}