export default function SettingsPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">
        System Settings
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Coming soon: Configure your preferences and system settings.
      </p>
      
      <div className="space-y-6">
        {/* Preview of future settings */}
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">AI Response Settings</h3>
          <p className="text-sm text-gray-500 mb-4">Configure how the AI generates customer responses</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Response Tone</span>
              <span className="text-sm text-gray-400">Professional (Coming Soon)</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Response Length</span>
              <span className="text-sm text-gray-400">Medium (Coming Soon)</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Auto-suggest Services</span>
              <span className="text-sm text-gray-400">Enabled (Coming Soon)</span>
            </div>
          </div>
        </div>
        
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Business Information</h3>
          <p className="text-sm text-gray-500 mb-4">Update your business details and service areas</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Service Areas</span>
              <span className="text-sm text-gray-400">24 areas (Coming Soon)</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Contact Information</span>
              <span className="text-sm text-gray-400">Update (Coming Soon)</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Working Hours</span>
              <span className="text-sm text-gray-400">Configure (Coming Soon)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Development Notice
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Settings functionality is currently in development. For immediate configuration changes, please contact the system administrator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}