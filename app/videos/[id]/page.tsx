import { getVideoById, getTranscriptionSegments } from "@/services/videos-api";
import { notFound } from "next/navigation";
import VideoPlayerWrapper from "@/components/VideoPlayerWrapper";
import Link from "next/link";

interface VideoDetailPageProps {
  params: {
    id: string;
  };
}

export default async function VideoDetailPage({ params }: VideoDetailPageProps) {
  const video = await getVideoById(params.id);

  if (!video) {
    notFound();
  }

  // Fetch segments in parallel
  const segments = await getTranscriptionSegments(video.caminho_json);

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link href="/">&larr; Voltar para o Dashboard</Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{video.nome}</h1>
      </div>
      <VideoPlayerWrapper video={video} segments={segments} />
    </div>
  );
}
