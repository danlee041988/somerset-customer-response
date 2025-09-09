'use client'

import { useState } from 'react'
import type { AIResponse } from '../types/index'

interface ResponseDisplayProps {
  response: AIResponse | null
  isLoading: boolean
}

export default function ResponseDisplay({ response, isLoading }: ResponseDisplayProps) {
  const [feedback, setFeedback] = useState<'good' | 'needs-improvement' | null>(null)
  const [customFeedback, setCustomFeedback] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    if (response?.content) {
      try {
        await navigator.clipboard.writeText(response.content)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy text:', err)
      }
    }
  }

  const handleFeedbackSubmit = async () => {
    if (!feedback) return

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: feedback,
          comments: customFeedback,
          responseContent: response?.content,
          timestamp: new Date().toISOString()
        }),
      })
      
      // Reset feedback form
      setFeedback(null)
      setCustomFeedback('')
    } catch (error) {
      console.error('Error submitting feedback:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          AI-Generated Response
        </h3>
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!response) return null

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          AI-Generated Response
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Confidence: {Math.round(response.confidence * 100)}%
          </span>
          {response.confidence > 0.8 ? (
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          ) : response.confidence > 0.6 ? (
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          ) : (
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 rounded p-4 mb-4 relative">
        <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
          {response.content}
        </p>
        
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
          title="Copy to clipboard"
        >
          {isCopied ? (
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>

      {response.businessContext && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <h4 className="font-medium text-blue-900 mb-2">Business Context Used:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            {response.businessContext.serviceAreas && (
              <p><strong>Areas:</strong> {response.businessContext.serviceAreas.join(', ')}</p>
            )}
            {response.businessContext.availableDates && (
              <p><strong>Available:</strong> {response.businessContext.availableDates.join(', ')}</p>
            )}
            {response.businessContext.suggestedServices && (
              <p><strong>Services:</strong> {response.businessContext.suggestedServices.join(', ')}</p>
            )}
          </div>
        </div>
      )}

      {response.suggestions && response.suggestions.length > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <h4 className="font-medium text-yellow-900 mb-2">Suggestions for Improvement:</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            {response.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t pt-4">
        <h4 className="font-medium text-gray-900 mb-3">How was this response?</h4>
        
        <div className="flex gap-3 mb-3">
          <button
            onClick={() => setFeedback('good')}
            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
              feedback === 'good'
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            👍 Good
          </button>
          
          <button
            onClick={() => setFeedback('needs-improvement')}
            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
              feedback === 'needs-improvement'
                ? 'bg-orange-100 text-orange-800 border border-orange-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            👎 Needs Improvement
          </button>
        </div>

        {feedback && (
          <div className="space-y-3">
            <textarea
              value={customFeedback}
              onChange={(e) => setCustomFeedback(e.target.value)}
              placeholder="Any specific feedback or suggestions? (optional)"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-vertical"
            />
            
            <button
              onClick={handleFeedbackSubmit}
              className="px-4 py-2 bg-somerset-red text-white text-sm rounded hover:bg-red-700 transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        )}
      </div>
    </div>
  )
}