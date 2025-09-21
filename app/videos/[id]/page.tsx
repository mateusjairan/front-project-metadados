"use client"

import { useQuery } from "@tanstack/react-query";
import { getVideoById, getTranscriptionSegments } from "@/services/videos-api";
import { notFound } from "next/navigation";
import VideoPlayerWrapper from "@/components/VideoPlayerWrapper";
import Providers from "@/components/Providers";

interface VideoDetailPageProps {
  params: {
    id: string;
  };
}

function VideoDetailPageContent({ params }: VideoDetailPageProps) {
  const { data: video, isLoading: isVideoLoading, error: videoError } = useQuery({
    queryKey: ['videos', params.id],
    queryFn: () => getVideoById(params.id),
  });

  const { data: segments, isLoading: areSegmentsLoading, error: segmentsError } = useQuery({
    queryKey: ['segments', video?.id],
    queryFn: () => getTranscriptionSegments(video!.caminho_json),
    enabled: !!video, // Only run this query if the video has been fetched
  });

  if (isVideoLoading || areSegmentsLoading) {
    return <div className="loading-spinner" style={{ margin: '4rem auto' }}></div>;
  }

  if (videoError || segmentsError) {
    return <p style={{ color: 'red' }}>Erro ao carregar dados do vídeo.</p>;
  }

  if (!video) {
    // This will be handled by Next.js's notFound mechanism in server components,
    // but in client components, we can render a not found message.
    notFound();
    return null; // Or render a custom 404 component
  }

  return (
    <VideoPlayerWrapper video={video} segments={segments || []} />
  );
}

export default function VideoDetailPage(props: VideoDetailPageProps) {
  return (
    <Providers>
      <VideoDetailPageContent {...props} />
    </Providers>
  )
}
