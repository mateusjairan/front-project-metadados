"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import VideoUploader from "@/components/video-uploader"
import VideoPlayer from "@/components/video-player"
import TranscriptionPanel from "@/components/transcription-panel"
import { useVideoSync } from "@/hooks/use-video-sync"
import type { TranscriptionSegment } from "@/types/transcription"

const queryClient = new QueryClient()

function AccessModal({ onAccessGranted }: { onAccessGranted: () => void }) {
  const [input, setInput] = useState("")
  const [error, setError] = useState("")
  const accessPhrase = "ola mundo"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim().toLowerCase() === accessPhrase) {
      onAccessGranted()
    } else {
      setError("Frase incorreta. Tente novamente.")
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.8)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#222",
          padding: 32,
          borderRadius: 12,
          boxShadow: "0 2px 16px #000",
          minWidth: 320,
        }}
      >
        <h2 style={{ color: "#fff", marginBottom: 16 }}>Acesso restrito</h2>
        <p style={{ color: "#ccc", marginBottom: 16 }}>
          Digite a frase de acesso para continuar: "ola mundo"
        </p>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError("")
          }}
          placeholder="Digite a frase..."
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 4,
            border: "1px solid #444",
            marginBottom: 12,
          }}
          autoFocus
        />
        {error && (
          <div style={{ color: "#ff5555", marginBottom: 8 }}>{error}</div>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 4,
            background: "#444",
            color: "#fff",
            border: "none",
            fontWeight: "bold",
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  )
}

function VideoTranscriptionApp() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string>("")
  const [transcription, setTranscription] = useState<TranscriptionSegment[]>([])
  const [accessGranted, setAccessGranted] = useState(false)

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

  if (!accessGranted) {
    return <AccessModal onAccessGranted={() => setAccessGranted(true)} />
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
