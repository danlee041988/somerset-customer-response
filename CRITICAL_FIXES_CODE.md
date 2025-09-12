# Critical Fixes - Exact Code Implementation

This document contains the exact code changes needed to fix all critical issues.

## 🔴 CRITICAL FIX 1: Undefined Color

**File**: `/tailwind.config.js`
```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'somerset-black': '#1f2937',
        'somerset-red': '#dc2626', 
        'somerset-white': '#ffffff',
        'somerset-blue': '#3b82f6', // ADD THIS LINE
      },
    },
  },
  plugins: [],
}
```

## 🔴 CRITICAL FIX 2: Navigation Links

**Option A - Remove Broken Links**  
**File**: `/app/components/Navigation.tsx`
```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/admin', label: 'Admin' },
    // TEMPORARILY REMOVED UNTIL IMPLEMENTED
    // { href: '/history', label: 'History' },
    // { href: '/settings', label: 'Settings' },
  ]

  return (
    <nav className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex space-x-8">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-3 px-1 transition-colors border-b-2 ${
                    isActive
                      ? 'text-somerset-red border-somerset-red'
                      : 'text-white border-transparent hover:text-somerset-red hover:border-somerset-red'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
```

**Option B - Create Placeholder Pages**  
**File**: `/app/history/page.tsx`
```typescript
export default function HistoryPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">
        Response History
      </h1>
      <p className="text-gray-600 text-lg">
        Coming soon: View your past customer interactions and AI responses.
      </p>
    </div>
  )
}
```

**File**: `/app/settings/page.tsx`
```typescript
export default function SettingsPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">
        Settings
      </h1>
      <p className="text-gray-600 text-lg">
        Coming soon: Configure your preferences and system settings.
      </p>
    </div>
  )
}
```

## 🔴 CRITICAL FIX 3: Environment Validation

**File**: `/app/lib/env-validation.ts` (CREATE NEW)
```typescript
export class EnvironmentError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EnvironmentError'
  }
}

export function validateEnvironment(): void {
  const required = {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  }
  
  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key]) => key)
    
  if (missing.length > 0) {
    throw new EnvironmentError(
      `Missing required environment variables: ${missing.join(', ')}`
    )
  }
}

// Use in layout.tsx or app startup
try {
  validateEnvironment()
} catch (error) {
  if (error instanceof EnvironmentError) {
    // Show user-friendly error page
    console.error(error.message)
  }
}
```

**File**: `/app/components/EnvErrorBoundary.tsx` (CREATE NEW)
```typescript
'use client'

import { useEffect, useState } from 'react'

export default function EnvErrorBoundary({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // Check for environment errors
    if (!process.env.NEXT_PUBLIC_API_CONFIGURED) {
      setHasError(true)
      setErrorMessage(
        'The application is not properly configured. Please contact the administrator.'
      )
    }
  }, [])

  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Configuration Error
          </h1>
          <p className="text-gray-700 mb-6">{errorMessage}</p>
          <div className="bg-gray-100 rounded p-4">
            <p className="text-sm text-gray-600">
              If you're the administrator, please check that all required 
              environment variables are set in your deployment.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
```

## 🔴 CRITICAL FIX 4: Accessibility

**File**: `/app/components/ResponseDisplay.tsx`
```typescript
// Find the copy button and update it:
<button
  onClick={handleCopy}
  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
  aria-label="Copy response to clipboard"
  title="Copy response"
>
  <span aria-hidden="true">📋</span>
  <span className="ml-2">{copied ? 'Copied!' : 'Copy'}</span>
</button>
```

**File**: `/app/layout.tsx`
```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {/* Skip to main content link for accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-somerset-black text-white p-2 rounded z-50"
          >
            Skip to main content
          </a>
          
          <header className="bg-somerset-black text-somerset-white">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Somerset Window Cleaning</h1>
                  <p className="text-sm opacity-90 mt-1">Customer Response System</p>
                </div>
              </div>
            </div>
            
            <Navigation />
          </header>
          
          <main id="main-content" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
```

**File**: `/app/components/LoadingState.tsx` (CREATE NEW)
```typescript
export default function LoadingState({ message = "Loading..." }) {
  return (
    <div 
      role="status" 
      aria-live="polite" 
      aria-busy="true"
      className="flex flex-col items-center justify-center p-8"
    >
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-somerset-red"></div>
      <p className="mt-4 text-gray-600">
        <span className="sr-only">Loading: </span>
        {message}
      </p>
    </div>
  )
}
```

## 🔴 CRITICAL FIX 5: Focus Management

**File**: `/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-50 text-gray-900;
  }
  
  /* Focus styles for accessibility */
  *:focus {
    @apply outline-none;
  }
  
  *:focus-visible {
    @apply ring-2 ring-somerset-red ring-offset-2;
  }
  
  /* Skip link styles */
  .sr-only:focus {
    @apply not-sr-only absolute top-4 left-4 z-50;
  }
}

@layer components {
  /* Button focus styles */
  .btn-focus {
    @apply focus:outline-none focus-visible:ring-2 focus-visible:ring-somerset-red focus-visible:ring-offset-2;
  }
  
  /* Input focus styles */
  .input-focus {
    @apply focus:border-somerset-red focus:ring-1 focus:ring-somerset-red;
  }
}
```

## 🔴 MOBILE NAVIGATION FIX

**File**: `/app/components/MobileNav.tsx` (CREATE NEW)
```typescript
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/admin', label: 'Admin' },
  ]
  
  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-64 bg-gray-800 z-50 md:hidden">
            <div className="p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto block p-2 text-white hover:bg-gray-700 rounded-md"
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="px-4">
              <ul className="space-y-2">
                {links.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block py-3 px-4 rounded-md transition-colors ${
                          isActive
                            ? 'bg-gray-700 text-somerset-red'
                            : 'text-white hover:bg-gray-700'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
```

**Update Navigation.tsx to include mobile nav**:
```typescript
import MobileNav from './MobileNav'

export default function Navigation() {
  // ... existing code ...
  
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-gray-800 border-t border-gray-700">
        {/* ... existing desktop nav ... */}
      </nav>
      
      {/* Mobile Navigation */}
      <div className="md:hidden bg-gray-800 border-t border-gray-700 p-4">
        <MobileNav />
      </div>
    </>
  )
}
```

## 🔴 ERROR BOUNDARY FIX

**File**: `/app/error.tsx` (CREATE NEW)
```typescript
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-sm border max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience. An error occurred while processing your request.
        </p>
        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full px-4 py-2 bg-somerset-red text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="block w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Go to homepage
          </a>
        </div>
      </div>
    </div>
  )
}
```

**File**: `/app/not-found.tsx` (CREATE NEW)
```typescript
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-sm border max-w-md">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Page not found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-somerset-red text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}
```

## VALIDATION SCRIPT

**File**: `/scripts/validate-fixes.js` (CREATE NEW)
```javascript
// Run this to validate all fixes are applied correctly
const fs = require('fs');
const path = require('path');

const checks = [
  {
    name: 'Tailwind Config - Somerset Blue',
    file: 'tailwind.config.js',
    test: (content) => content.includes("'somerset-blue': '#3b82f6'"),
  },
  {
    name: 'Navigation - Removed broken links',
    file: 'app/components/Navigation.tsx',
    test: (content) => !content.includes('/history') || fs.existsSync('app/history/page.tsx'),
  },
  {
    name: 'Accessibility - Skip link',
    file: 'app/layout.tsx',
    test: (content) => content.includes('Skip to main content'),
  },
  {
    name: 'Accessibility - Copy button aria-label',
    file: 'app/components/ResponseDisplay.tsx',
    test: (content) => content.includes('aria-label="Copy response to clipboard"'),
  },
  {
    name: '404 Page exists',
    file: 'app/not-found.tsx',
    test: () => fs.existsSync('app/not-found.tsx'),
  },
  {
    name: 'Error Page exists',
    file: 'app/error.tsx',
    test: () => fs.existsSync('app/error.tsx'),
  },
];

console.log('🔍 Validating Critical Fixes...\n');

checks.forEach((check) => {
  try {
    const filePath = path.join(process.cwd(), check.file);
    const content = check.test.length === 0 
      ? '' 
      : fs.readFileSync(filePath, 'utf8');
    
    const passed = check.test(content);
    console.log(`${passed ? '✅' : '❌'} ${check.name}`);
  } catch (error) {
    console.log(`❌ ${check.name} - File not found`);
  }
});

console.log('\n✨ Validation complete!');
```

Run validation: `node scripts/validate-fixes.js`