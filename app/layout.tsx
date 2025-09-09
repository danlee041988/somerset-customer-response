import { Inter } from 'next/font/google'
import './globals.css'

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
        <div className="min-h-screen bg-gray-50">
          <header className="bg-somerset-blue text-white p-4">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-xl font-bold">Somerset Window Cleaning</h1>
              <p className="text-sm opacity-90">Customer Response System</p>
            </div>
          </header>
          <main className="max-w-7xl mx-auto py-8 px-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}