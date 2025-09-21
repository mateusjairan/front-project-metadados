import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meta-Transcrição',
    generator: 'v0.app'
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
