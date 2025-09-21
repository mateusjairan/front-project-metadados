import type { Metadata } from 'next'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'Dashboard de Transcrição',
  description: 'Visualize e gerencie suas transcrições de vídeo.'
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
