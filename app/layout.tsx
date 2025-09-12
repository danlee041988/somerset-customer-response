import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from './components/Navigation'
import EnvErrorBoundary from './components/EnvErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Somerset Customer Response System',
  description: 'AI-powered customer service for Somerset Window Cleaning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EnvErrorBoundary>
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
        </EnvErrorBoundary>
      </body>
    </html>
  )
}