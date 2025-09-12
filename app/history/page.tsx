export default function HistoryPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">
        Response History
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Coming soon: View your past customer interactions and AI responses.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Feature in Development
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                This feature will allow you to track and review all customer interactions processed through the AI system, providing valuable insights for improving customer service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}