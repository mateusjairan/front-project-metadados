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
    <VideoPlayerWrapper video={video} segments={segments} />
  );
}
