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
  const [isMockingEnabled, setIsMockingEnabled] = useState(false)

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      initMocks().then(() => {
        setIsMockingEnabled(true)
      })
    }
  }, [])

  if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled" && !isMockingEnabled) {
    return null // or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
