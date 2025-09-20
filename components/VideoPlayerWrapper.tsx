"use client"

import VideoPlayer from "@/components/video-player"
import TranscriptionPanel from "@/components/transcription-panel"
import EditVideoModal from "./EditVideoModal"
import { useVideoSync } from "@/hooks/use-video-sync"
import type { TranscriptionSegment } from "@/types/transcription"
import type { Video } from "@/types/video"
import { useState } from "react"
import Link from "next/link"
import { Pencil } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateVideo } from "@/services/videos-api"
import { Toaster, toast } from "sonner"
import { API_BASE_URL } from "@/lib/constants"

interface VideoPlayerWrapperProps {
  video: Video;
  segments: TranscriptionSegment[];
}

export default function VideoPlayerWrapper({ video: initialVideo, segments }: VideoPlayerWrapperProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  // Use state to manage the video data so it can be updated on the client
  const [video, setVideo] = useState(initialVideo)

  const queryClient = useQueryClient()

  const {
    currentTime,
    isPlaying,
    videoRef,
    handleTimeUpdate,
    handlePlay,
    handlePause,
    seekToTime,
  } = useVideoSync()

  const updateMutation = useMutation({
    mutationFn: updateVideo,
    onSuccess: (updatedVideo) => {
      toast.success("Nome do vídeo atualizado com sucesso!")
      setVideo(updatedVideo) // Update local state to reflect the change immediately
      // Invalidate queries to refetch data on other pages
      queryClient.invalidateQueries({ queryKey: ['videos'] })
      queryClient.invalidateQueries({ queryKey: ['videos', video.id] })
      setIsEditModalOpen(false)
    },
    onError: (error) => {
      toast.error(`Falha ao atualizar o vídeo: ${error.message}`)
    },
  })

  const handleTranscriptionClick = (startTime: number) => {
    seekToTime(startTime)
  }

  const handleSaveName = (newName: string) => {
    if (newName !== video.nome) {
      updateMutation.mutate({ videoId: video.id, data: { nome: newName } })
    } else {
      setIsEditModalOpen(false) // Close modal if name is unchanged
    }
  }

  // This URL will be intercepted by MSW in a development environment
  const videoUrl = `${API_BASE_URL}/videos/stream/${video.nome_arquivo}`;

  return (
    <>
      <Toaster richColors />
      <div>
          <div style={{ marginBottom: '1.5rem' }}>
              <Link href="/">&larr; Voltar para o Dashboard</Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                  <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{video.nome}</h1>
                  <button onClick={() => setIsEditModalOpen(true)} className="upload-button" style={{ padding: '0.5rem' }} title="Editar Nome">
                      <Pencil size={20} />
                  </button>
              </div>
          </div>
          <div className="video-workspace" style={{ direction: "ltr" }}>
          <div className="video-section">
              <VideoPlayer
              ref={videoRef}
              videoUrl={videoUrl}
              onTimeUpdate={handleTimeUpdate}
              onPlay={handlePlay}
              onPause={handlePause}
              transcription={segments}
              />
          </div>

          <div className="transcription-section">
              <TranscriptionPanel
              transcription={segments}
              currentTime={currentTime}
              isPlaying={isPlaying}
              onTranscriptionClick={handleTranscriptionClick}
              />
          </div>
          </div>
      </div>
      <EditVideoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveName}
        video={video}
      />
    </>
  )
}
