import type { Metadata } from 'next'
import { Fraunces, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CookieBanner } from '@/components/cookie-banner'
import { SessionTracker } from '@/components/session-tracker'
import { BrowserGuard } from '@/components/browser-guard'
import './globals.css'

const fraunces = Fraunces({ 
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif"
});
const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: 'PCI – Computer Support, IT Services & App Development | Cirencester & Swindon',
  description: 'PCI has been providing expert computer support, bespoke application development and IT consultancy to businesses and private clients across the South-West since 1990.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <BrowserGuard />
        <SessionTracker />
        <CookieBanner />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
