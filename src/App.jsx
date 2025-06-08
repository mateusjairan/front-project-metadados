"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState, useRef, useEffect } from "react"
import VideoUpload from "./components/VideoUpload"
import VideoPlayer from "./components/VideoPlayer"
import TranscriptPanel from "./components/TranscriptPanel"
import useTranscription from "./hooks/useTranscription"
import "./styles/global.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
  },
})

function AppContent() {
  const [videoFile, setVideoFile] = useState(null)
  const [videoUrl, setVideoUrl] = useState("")
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

  const { data: transcription = [], isLoading, error } = useTranscription(videoFile)

  const handleVideoSelect = (file) => {
    setVideoFile(file)
    const url = URL.createObjectURL(file)
    setVideoUrl(url)
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleSegmentClick = (startTime) => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime
      setCurrentTime(startTime)
      if (!isPlaying) {
        videoRef.current.play()
      }
    }
  }

  // Limpar URL do objeto quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl)
      }
    }
  }, [videoUrl])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Transcrição de Vídeo</h1>
        <p>Faça upload de um vídeo e obtenha a transcrição sincronizada</p>
      </header>

      <main className="app-main">
        {!videoFile ? (
          <VideoUpload onVideoSelect={handleVideoSelect} />
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

            <div className="transcript-section">
              <TranscriptPanel
                transcription={transcription}
                currentTime={currentTime}
                isLoading={isLoading}
                error={error}
                onSegmentClick={handleSegmentClick}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}

export default App
