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
  
  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/admin', label: 'Admin' },
    { href: '/history', label: 'History' },
    { href: '/settings', label: 'Settings' },
  ]
  
  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          {isOpen ? (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          ) : (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          )}
        </svg>
      </button>
      
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <div 
            id="mobile-menu"
            className="fixed right-0 top-0 h-full w-72 bg-gray-800 shadow-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 id="mobile-menu-title" className="text-lg font-semibold text-white">
                Navigation
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white hover:bg-gray-700 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close navigation menu"
              >
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>
            
            {/* Navigation Links */}
            <nav className="p-4" aria-label="Mobile navigation">
              <ul className="space-y-2" role="list">
                {links.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <li key={link.href} role="none">
                      <Link
                        href={link.href}
                        className={`block py-3 px-4 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${\n                          isActive\n                            ? 'bg-somerset-red text-white'\n                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'\n                        }`}\n                        aria-current={isActive ? 'page' : undefined}\n                        tabIndex={0}\n                      >\n                        {link.label}\n                      </Link>\n                    </li>\n                  )\n                })}\n              </ul>\n            </nav>\n            \n            {/* Footer */}\n            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">\n              <div className="text-xs text-gray-400 text-center">\n                Somerset Window Cleaning\n                <br />\n                Customer Response System\n              </div>\n            </div>\n          </div>\n        </>\n      )}\n    </>\n  )\n}