'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileNav from './MobileNav'

export default function Navigation() {
  const pathname = usePathname()
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/admin', label: 'Admin' },
    { href: '/history', label: 'History' },
    { href: '/settings', label: 'Settings' },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex space-x-8" role="list">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href} role="none">
                  <Link
                    href={link.href}
                    className={`block py-3 px-1 transition-colors border-b-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 ${
                      isActive
                        ? 'text-somerset-red border-somerset-red'
                        : 'text-white border-transparent hover:text-somerset-red hover:border-somerset-red'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <div className="md:hidden bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end">
          <MobileNav />
        </div>
      </div>
    </>
  )
}