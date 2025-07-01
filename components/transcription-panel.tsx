"use client"

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getTranscription } from "@/services/transcription-api"
import type { TranscriptionSegment } from "@/types/transcription"

interface TranscriptionPanelProps {
  videoFile: File
  transcription: TranscriptionSegment[]
  currentTime: number
  isPlaying: boolean
  onTranscriptionReceived: (segments: TranscriptionSegment[]) => void
  onTranscriptionClick: (startTime: number) => void
}

export default function TranscriptionPanel({
  videoFile,
  transcription,
  currentTime,
  isPlaying,
  onTranscriptionReceived,
  onTranscriptionClick,
}: TranscriptionPanelProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["transcription", videoFile.name],
    queryFn: () => getTranscription(videoFile),
    enabled: !!videoFile,
    staleTime: Number.POSITIVE_INFINITY,
  })

  useEffect(() => {
    if (data) {
      onTranscriptionReceived(data)
    }
  }, [data, onTranscriptionReceived])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const isSegmentActive = (segment: TranscriptionSegment) => {
    return currentTime >= segment.start && currentTime <= segment.end
  }

  if (isLoading) {
    return (
      <div className="transcription-panel">
        <div className="transcription-header">
          <h3>Transcrição </h3>
        </div>
        <div className="transcription-loading">
          <div className="loading-spinner"></div>
            <p>Gerando transcrição...</p>
          <p className="loading-subtitle">Isso pode levar algum tempo. Tenha paciência.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="transcription-panel">
        <div className="transcription-header">
          <h3>Transcrição</h3>
        </div>
        <div className="transcription-error">
          <p>Erro ao gerar transcrição</p>
          <p className="error-message">Por favor tente de novo mais tarde.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="transcription-panel">
      <div className="transcription-header">
        <h3>Transcrição</h3>
        <div className="transcription-status">
          <span className={`status-indicator ${isPlaying ? "playing" : "paused"}`}></span>
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>

      <div className="transcription-content">
        {transcription.length === 0 ? (
          <div className="transcription-empty">
            <p>Sem transcrição disponível.</p>
          </div>
        ) : (
          <div className="transcription-segments">
            {transcription.map((segment, index) => (
              <div
                key={index}
                className={`transcription-segment ${isSegmentActive(segment) ? "active" : ""}`}
                onClick={() => onTranscriptionClick(segment.start)}
              >
                <div className="segment-time">
                  {formatTime(segment.start)} - {formatTime(segment.end)}
                </div>
                <div className="segment-text">{segment.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
