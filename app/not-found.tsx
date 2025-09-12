import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[500px] flex items-center justify-center p-4">
      <div className="text-center p-6 lg:p-8 bg-white rounded-lg shadow-sm border max-w-lg w-full">
        {/* Large 404 */}
        <div className="mb-6">
          <h1 className="text-8xl lg:text-9xl font-bold text-gray-300 mb-2">
            404
          </h1>
        </div>
        
        {/* Error message */}
        <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
          Page not found
        </h2>
        
        <p className="text-gray-600 mb-8 text-sm lg:text-base">
          Sorry, we couldn't find the page you're looking for. It may have been moved, 
          deleted, or the URL was typed incorrectly.
        </p>
        
        {/* Actions */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block w-full px-6 py-3 bg-somerset-red text-white rounded-md hover:bg-red-700 transition-colors font-medium btn-focus"
          >
            Go back home
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/admin"
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors btn-focus text-center text-sm"
            >
              Admin Panel
            </Link>
            <Link
              href="/history"
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors btn-focus text-center text-sm"
            >
              View History
            </Link>
          </div>
        </div>
        
        {/* Help section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">
            Need help? Contact Somerset Window Cleaning:
          </p>
          <div className="space-y-1 text-xs">
            <a 
              href="mailto:info@somersetwindowcleaning.co.uk"
              className="text-somerset-red hover:text-red-700 underline block"
            >
              info@somersetwindowcleaning.co.uk
            </a>
            <a 
              href="tel:+441225123456"
              className="text-somerset-red hover:text-red-700 underline block"
            >
              Call us for immediate assistance
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}