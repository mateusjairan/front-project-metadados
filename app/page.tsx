"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import VideoUploader from "@/components/video-uploader"
import VideoPlayer from "@/components/video-player"
import TranscriptionPanel from "@/components/transcription-panel"
import { useVideoSync } from "@/hooks/use-video-sync"
import type { TranscriptionSegment } from "@/types/transcription"

const queryClient = new QueryClient()


function VideoTranscriptionApp() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string>("")
  const [transcription, setTranscription] = useState<TranscriptionSegment[]>([])

  const {
    currentTime,
    isPlaying,
    videoRef,
    handleTimeUpdate,
    handlePlay,
    handlePause,
    seekToTime,
  } = useVideoSync()

  const handleVideoUpload = (file: File) => {
    setVideoFile(file)
    const url = URL.createObjectURL(file)
    setVideoUrl(url)
  }

  const handleTranscriptionReceived = (segments: TranscriptionSegment[]) => {
    setTranscription(segments)
  }

  const handleTranscriptionClick = (startTime: number) => {
    seekToTime(startTime)
  }


  return (
    <div className="app">
      <header className="app-header">
        <h1>Transcrição de Vídeo</h1>
        <p>Faça o upload de um vídeo para criar uma transcrição sincronizada.</p>
      </header>

      <main className="app-main">
        {!videoFile ? (
          <VideoUploader onVideoUpload={handleVideoUpload} />
        ) : (
          <div className="video-workspace">
            <div className="video-section">
              <VideoPlayer
                ref={videoRef}
                videoUrl={videoUrl}
                onTimeUpdate={handleTimeUpdate}
                onPlay={handlePlay}
                onPause={handlePause}
              />
            </div>

            <div className="transcription-section">
              <TranscriptionPanel
                videoFile={videoFile}
                transcription={transcription}
                currentTime={currentTime}
                isPlaying={isPlaying}
                onTranscriptionReceived={handleTranscriptionReceived}
                onTranscriptionClick={handleTranscriptionClick}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <VideoTranscriptionApp />
    </QueryClientProvider>
  )
}
