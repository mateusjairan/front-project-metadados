"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getTranscription } from "@/services/transcription-api"
import type { TranscriptionSegment } from "@/types/transcription"
import Highlighter from "react-highlight-words"

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

  const [searchTerm, setSearchTerm] = useState("")

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

  const filteredSegments = transcription.filter(segment =>
    segment.text.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        <input placeholder="Buscar na transcrição" type="search" name="" id="" value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)} className="transcription-search-input" />
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
            {filteredSegments.map((segment, index) => (
              <div
                key={index}
                className={`transcription-segment ${isSegmentActive(segment) ? "active" : ""}`}
                onClick={() => onTranscriptionClick(segment.start)}
              >
                <div className="segment-time">
                  {formatTime(segment.start)} - {formatTime(segment.end)}
                </div>
                <div className="segment-text">
                  <Highlighter
                    highlightClassName="highlight"
                    searchWords={[searchTerm]}
                    autoEscape={true}
                    textToHighlight={segment.text}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
