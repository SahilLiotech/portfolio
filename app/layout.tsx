import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Sahil Pathan — Flutter Developer',
  keywords: [
    'Sahil Pathan',
    'Flutter Developer',
    'Mobile Application Engineer',
    'Dart',
    'Cross-Platform',
    'POS',
    'KDS',
    'Firebase',
    'Razorpay',
    'Riverpod',
    'BLoC',
  ],
  description:
    'Professional portfolio of Pathan Sahil A., a Flutter Developer with 2+ years of experience building production-grade mobile applications.',
  authors: [{ name: 'Pathan Sahil A.', url: 'https://github.com/SahilLiotech' }],
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
