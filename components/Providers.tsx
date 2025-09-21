"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"

async function initMocks() {
  if (typeof window !== 'undefined') {
    const { worker } = await import('@/mocks/browser')
    worker.start()
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    // Start MSW mock server in development environment
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      initMocks()
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
