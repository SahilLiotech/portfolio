import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Onest } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { SITE_URL } from './site'
import './globals.css'

// Display: Bricolage Grotesque's optical-size axis tightens it at large sizes.
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-display',
})

// Body and UI text.
const sans = Onest({
  subsets: ['latin'],
  variable: '--font-sans',
})

const description =
  'Flutter developer at Tenacious Techies since June 2024, working on the FoodChow ordering, POS and kitchen display apps.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Sahil Pathan, Flutter Developer',
  description,
  authors: [{ name: 'Sahil Pathan', url: 'https://github.com/SahilLiotech' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: 'Sahil Pathan',
    title: 'Sahil Pathan, Flutter Developer',
    description,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sahil Pathan, Flutter Developer',
    description,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f8f6' },
    { media: '(prefers-color-scheme: dark)', color: '#131211' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${sans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
