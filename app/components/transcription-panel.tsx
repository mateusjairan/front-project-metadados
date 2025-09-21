"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getTranscription } from "@/app/lib/api"
import type { TranscriptionSegment } from "@/app/lib/types"
import Highlighter from "react-highlight-words"
import styles from "./transcription-panel.module.css"

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
      <div className={styles.panel}>
        <div className={styles.header}>
          <h3 className={styles.title}>Transcrição</h3>
        </div>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Gerando transcrição...</p>
          <p className={styles.subtitle}>Isso pode levar algum tempo. Tenha paciência.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.panel}>
        <div className={styles.header}>
          <h3 className={styles.title}>Transcrição</h3>
        </div>
        <div className={styles.error}>
          <p>Erro ao gerar transcrição</p>
          <p className={styles.errorMessage}>Por favor tente de novo mais tarde.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.title}>Transcrição</h3>
        <input
          placeholder="Buscar na transcrição"
          type="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.status}>
          <span className={`${styles.indicator} ${isPlaying ? styles.playing : ""}`}></span>
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>

      <div className={styles.content}>
        {transcription.length === 0 && !isLoading ? (
          <div className={styles.empty}>
            <p>Sem transcrição disponível.</p>
          </div>
        ) : (
          <div className={styles.segments}>
            {filteredSegments.map((segment, index) => (
              <div
                key={index}
                className={`${styles.segment} ${isSegmentActive(segment) ? styles.active : ""}`}
                onClick={() => onTranscriptionClick(segment.start)}
              >
                <div className={styles.time}>
                  {formatTime(segment.start)} - {formatTime(segment.end)}
                </div>
                <div className={styles.text}>
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
