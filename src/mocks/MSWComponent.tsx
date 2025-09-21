'use client'

import { PropsWithChildren, useEffect, useState } from 'react'

export function MSWComponent({ children }: PropsWithChildren) {
  const [isDev, setIsDev] = useState(false)

  useEffect(() => {
    setIsDev(process.env.NODE_ENV === 'development')
  }, [])

  useEffect(() => {
    if (isDev) {
      async function initMSW() {
        const { worker } = await import('@/src/mocks/browser')
        worker.start()
      }

      initMSW()
    }
  }, [isDev])

  return <>{children}</>
}