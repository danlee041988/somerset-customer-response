interface LoadingSkeletonProps {
  lines?: number
  className?: string
  showButton?: boolean
}

export default function LoadingSkeleton({ 
  lines = 3, 
  className = "",
  showButton = false 
}: LoadingSkeletonProps) {
  return (
    <div className={`animate-pulse space-y-4 ${className}`} aria-hidden="true">
      {/* Lines of varying widths */}
      {Array.from({ length: lines }).map((_, index) => {
        const widths = ['w-full', 'w-3/4', 'w-5/6', 'w-2/3', 'w-4/5']
        const width = widths[index % widths.length]
        
        return (
          <div key={index} className="space-y-2">
            <div className={`h-4 bg-gray-200 rounded ${width}`}></div>
            {index === 0 && <div className="h-4 bg-gray-200 rounded w-1/2"></div>}
          </div>
        )
      })}
      
      {/* Optional button skeleton */}
      {showButton && (
        <div className="flex gap-3 pt-2">
          <div className="h-10 bg-gray-200 rounded flex-1"></div>
          <div className="h-10 bg-gray-200 rounded w-20"></div>
        </div>
      )}
    </div>
  )
}

export function ResponseSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 lg:p-8">
      <div className="animate-pulse">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
          </div>
        </div>
        
        {/* Content area */}
        <div className="bg-gray-50 rounded p-4 lg:p-5 mb-4 relative">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          
          {/* Copy button */}
          <div className="absolute top-2 right-2 w-9 h-9 bg-gray-200 rounded"></div>
        </div>
        
        {/* Business context */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <div className="h-5 bg-blue-200 rounded w-32 mb-2"></div>
          <div className="space-y-1">
            <div className="h-4 bg-blue-200 rounded w-full"></div>
            <div className="h-4 bg-blue-200 rounded w-2/3"></div>
          </div>
        </div>
        
        {/* Feedback section */}
        <div className="border-t pt-4">
          <div className="h-5 bg-gray-200 rounded w-40 mb-3"></div>
          <div className="flex gap-3">
            <div className="h-10 bg-gray-200 rounded w-20"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MessageSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 lg:p-8">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
        <div className="bg-gray-50 rounded p-4 lg:p-5">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          
          {/* Context section */}
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
            <div className="h-4 bg-blue-200 rounded w-32 mb-1"></div>
            <div className="h-4 bg-blue-200 rounded w-48"></div>
          </div>
        </div>
      </div>
    </div>
  )
}