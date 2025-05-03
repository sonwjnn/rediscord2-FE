import type { Metadata } from 'next'
import { Mona_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from '@/providers'

const mona = Mona_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'sondraw',
  description: 'Build Something Great!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${mona.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
