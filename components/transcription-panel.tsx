"use client"

import { useState } from "react"
import type { TranscriptionSegment } from "@/types/transcription"
import Highlighter from "react-highlight-words"
import styles from "./TranscriptionPanel.module.css"

interface TranscriptionPanelProps {
  transcription: TranscriptionSegment[]
  currentTime: number
  isPlaying: boolean
  onTranscriptionClick: (startTime: number) => void
  isLoading?: boolean;
  error?: Error | null;
}

export default function TranscriptionPanel({
  transcription,
  currentTime,
  isPlaying,
  onTranscriptionClick,
  isLoading,
  error,
}: TranscriptionPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")

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
      <div className={styles.transcriptionPanel}>
        <div className={styles.transcriptionHeader}>
          <h3>Transcrição</h3>
        </div>
        <div className={styles.transcriptionLoading}>
          <div className={"loading-spinner"}></div>
          <p>Carregando transcrição...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.transcriptionPanel}>
        <div className={styles.transcriptionHeader}>
          <h3>Transcrição</h3>
        </div>
        <div className={styles.transcriptionError}>
          <p>Erro ao carregar transcrição</p>
          <p className={styles.errorMessage}>{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.transcriptionPanel}>
      <div className={styles.transcriptionHeader}>
        <h3>Transcrição</h3>
        <input
          placeholder="Buscar na transcrição"
          type="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={styles.transcriptionSearchInput}
        />
        <div className={styles.transcriptionStatus}>
          <span className={`${styles.statusIndicator} ${isPlaying ? styles.playing : ""}`}></span>
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>

      <div className={styles.transcriptionContent}>
        {transcription.length === 0 ? (
          <div className={styles.transcriptionEmpty}>
            <p>Sem transcrição disponível.</p>
          </div>
        ) : (
          <div className={styles.transcriptionSegments}>
            {filteredSegments.map((segment, index) => (
              <div
                key={index}
                className={`${styles.transcriptionSegment} ${isSegmentActive(segment) ? styles.active : ""}`}
                onClick={() => onTranscriptionClick(segment.start)}
              >
                <div className={styles.segmentTime}>
                  {formatTime(segment.start)} - {formatTime(segment.end)}
                </div>
                <div className={styles.segmentText}>
                  <Highlighter
                    highlightClassName={styles.highlight}
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
