'use client'

import { useState } from 'react'
import MessageInput from './components/MessageInput'
import ResponseDisplay from './components/ResponseDisplay'
import type { CustomerMessage, AIResponse } from './types/index'

export default function Home() {
  const [currentMessage, setCurrentMessage] = useState<CustomerMessage | null>(null)
  const [currentResponse, setCurrentResponse] = useState<AIResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleMessageSubmit = async (message: string, context?: string) => {
    setIsLoading(true)
    setCurrentMessage({ content: message, context })
    setCurrentResponse(null)

    try {
      const response = await fetch('/api/ai/generate-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          context,
          timestamp: new Date().toISOString()
        }),
      })

      const data = await response.json()
      setCurrentResponse(data)
    } catch (error) {
      console.error('Error generating response:', error)
      
      let errorContent = 'Sorry, there was an error generating the response. Please try again.'
      let suggestions = ['Check your internet connection', 'Try again in a moment']
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorContent = 'Unable to connect to the AI service. Please check your internet connection and try again.'
        suggestions = ['Check your internet connection', 'Try again in a few moments', 'Contact support if the problem persists']
      } else if (error instanceof Error && error.message.includes('timeout')) {
        errorContent = 'The request timed out. This usually happens with longer messages. Please try again.'
        suggestions = ['Try again with a shorter message', 'Check your internet connection']
      }
      
      setCurrentResponse({
        content: errorContent,
        confidence: 0,
        suggestions,
        error: true,
        timestamp: new Date().toISOString()
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="bg-white rounded-lg shadow-sm border p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
          <div className="flex-1">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900">
              Customer Message Processor
            </h2>
            <p className="text-gray-600 mt-2 lg:mt-3 text-base lg:text-lg">
              Paste a customer email or message below to generate a professional response 
              tailored to Somerset Window Cleaning&apos;s services and availability.
            </p>
          </div>
          <a
            href="/admin"
            className="inline-flex items-center px-3 lg:px-4 py-2 lg:py-2.5 border border-somerset-red rounded-md text-sm font-medium text-somerset-red bg-white hover:bg-red-50 transition-colors btn-focus self-start"
          >
            <span aria-hidden="true">📚</span>
            <span className="ml-2">Manage Knowledge Base</span>
          </a>
        </div>
        
        <MessageInput onSubmit={handleMessageSubmit} isLoading={isLoading} />
      </div>

      {(currentMessage || currentResponse) && (
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {currentMessage && (
            <div className="bg-white rounded-lg shadow-sm border p-6 lg:p-8">
              <h3 className="text-lg lg:text-xl font-semibold mb-4 text-gray-900">
                Customer Message
              </h3>
              <div className="bg-gray-50 rounded p-4 lg:p-5">
                <p className="whitespace-pre-wrap text-gray-800">
                  {currentMessage.content}
                </p>
                {currentMessage.context && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-sm text-blue-700 font-medium">Additional Context:</p>
                    <p className="text-sm text-blue-800 mt-1">{currentMessage.context}</p>
                  </div>
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