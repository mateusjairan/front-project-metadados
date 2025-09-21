"use client"

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getVideos } from '@/services/videos-api'
import VideosTable from '@/components/VideosTable'
import Providers from '@/components/Providers'

function DashboardPageContent() {
  const { data: videos, isLoading, error } = useQuery({
    queryKey: ['videos'],
    queryFn: getVideos,
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Dashboard de Vídeos</h1>
        <Link href="/transcribe" passHref>
          <button className="upload-button">Transcrever Novo Vídeo</button>
        </Link>
      </div>
      {isLoading && <div className="loading-spinner" style={{ margin: '2rem auto' }}></div>}
      {error && <p style={{ color: 'red' }}>Erro ao carregar vídeos: {error.message}</p>}
      {videos && <VideosTable videos={videos} />}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Providers>
      <DashboardPageContent />
    </Providers>
  )
}
