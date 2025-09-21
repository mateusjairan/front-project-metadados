"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard de Transcrição',
  description: 'Visualize e gerencie suas transcrições de vídeo.'
}

const queryClient = new QueryClient();

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster theme="dark" richColors />
    </QueryClientProvider>
  )
}
