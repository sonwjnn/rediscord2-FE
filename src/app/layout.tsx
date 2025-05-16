import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Providers } from '@/providers'
import { Toaster } from '@/components/ui/sonner'
import { Modals } from '@/components/modals'
import { SubscriptionAlert } from '@/features/subscriptions/components/subscription-alert'

const canvaSans = localFont({
  src: [
    {
      path: '../../public/fonts/CanvaSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CanvaSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CanvaSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-canva-sans',
  display: 'swap',
})

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${canvaSans.className} ${canvaSans.variable}`}>
        <Providers>
          <Toaster />
          <Modals />
          <SubscriptionAlert />
          {children}
        </Providers>
      </body>
    </html>
  )
}
