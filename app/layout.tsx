import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sahil Portfolio',
  keywords: ['Sahil', 'Portfolio', 'Web Developer', 'Software Engineer', 'Frontend Developer', 'Flutter Developer', 'cross-platform', 'hybrid apps', 'mobile apps', 'web apps', 'developer', 'programmer', 'flutter', 'dart', 'firebase'],
  description: 'Created by Sahil, a flutter developer with expertise in building cross-platform applications.',
  authors: [{ name: 'Sahil', url: 'https://github.com/SahilLiotech' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
