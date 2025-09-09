'use client'

import { useState } from 'react'

export default function AdminPanel() {
  const [knowledgeText, setKnowledgeText] = useState('')
  const [category, setCategory] = useState('services')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const categories = [
    { id: 'services', name: 'Services & Offerings' },
    { id: 'pricing', name: 'Pricing & Quotes' },
    { id: 'policies', name: 'Policies & Procedures' },
    { id: 'areas', name: 'Service Areas' },
    { id: 'scheduling', name: 'Scheduling & Availability' },
    { id: 'equipment', name: 'Equipment & Methods' },
    { id: 'customer-service', name: 'Customer Service Guidelines' },
    { id: 'seasonal', name: 'Seasonal Information' },
    { id: 'emergency', name: 'Emergency Procedures' },
    { id: 'general', name: 'General Business Information' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!knowledgeText.trim()) return

    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/update-knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          content: knowledgeText,
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        setMessage('✅ Knowledge updated successfully! Changes will be reflected in new responses.')
        setKnowledgeText('')
      } else {
        setMessage('❌ Error updating knowledge. Please try again.')
      }
    } catch (error) {
      setMessage('❌ Error updating knowledge. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Somerset Knowledge Base Admin
          </h1>
          <p className="text-gray-600">
            Add and update business information that will be used to generate customer responses.
            The system will automatically incorporate this knowledge into future responses.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Add Business Knowledge
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Knowledge Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-somerset-blue focus:border-somerset-blue"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="knowledge-content" className="block text-sm font-medium text-gray-700 mb-2">
                Business Information
              </label>
              <textarea
                id="knowledge-content"
                value={knowledgeText}
                onChange={(e) => setKnowledgeText(e.target.value)}
                placeholder="Paste your detailed business information here... 

Examples:
• Service descriptions and procedures
• Pricing guidelines and quote ranges
• Customer service scripts and responses
• Equipment details and capabilities
• Seasonal schedules and availability
• Policy changes and updates
• Area-specific information
• Special procedures or requirements

The more detailed the information, the better the AI can respond to customers."
                rows={20}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-somerset-blue focus:border-somerset-blue resize-vertical font-mono text-sm"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                You can paste large amounts of text. The system will automatically process and integrate this information.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={!knowledgeText.trim() || isSubmitting}
                className="flex-1 bg-somerset-blue text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Knowledge...
                  </span>
                ) : (
                  'Update Knowledge Base'
                )}
              </button>

              <button
                type="button"
                onClick={() => setKnowledgeText('')}
                disabled={isSubmitting}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                Clear
              </button>
            </div>

            {message && (
              <div className={`p-4 rounded-md ${message.includes('✅') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {message}
              </div>
            )}
          </form>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-blue-900 mb-3">📚 Knowledge Base Tips</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• <strong>Be Specific:</strong> Include exact procedures, pricing ranges, and service details</li>
            <li>• <strong>Update Regularly:</strong> Add new information as your business evolves</li>
            <li>• <strong>Use Examples:</strong> Include sample customer scenarios and preferred responses</li>
            <li>• <strong>Seasonal Info:</strong> Add weather-dependent policies and seasonal schedules</li>
            <li>• <strong>Local Details:</strong> Include area-specific information and local considerations</li>
            <li>• <strong>Emergency Procedures:</strong> Add protocols for urgent situations or complaints</li>
          </ul>
        </div>

        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            ← Back to Customer Response System
          </a>
        </div>
      </div>
    </div>
  )
}