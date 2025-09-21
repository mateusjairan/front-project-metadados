import type { Metadata } from 'next'
import './globals.css'
import { MSWComponent } from '@/src/mocks/MSWComponent'
import { Providers } from './providers'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Dashboard de Transcrição',
  description: 'Dashboard para gerenciar transcrições de vídeo.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body>
        <MSWComponent />
        <Providers>
          {children}
          <Toaster richColors theme="dark" />
        </Providers>
      </body>
    </html>
  )
}
