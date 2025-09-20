import Link from 'next/link'
import { getVideos } from '@/services/videos-api'
import VideosTable from '@/components/VideosTable'
import Providers from '@/components/Providers'

export default async function DashboardPage() {
  const videos = await getVideos()

  return (
    <Providers>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>Dashboard de Vídeos</h1>
          <Link href="/transcribe" passHref>
            <button className="upload-button">Transcrever Novo Vídeo</button>
          </Link>
        </div>
        <VideosTable videos={videos} />
      </div>
    </Providers>
  )
}
