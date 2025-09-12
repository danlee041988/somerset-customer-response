'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/admin', label: 'Admin' },
    { href: '/history', label: 'History' },
    { href: '/settings', label: 'Settings' },
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