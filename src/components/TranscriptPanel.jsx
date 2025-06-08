"use client"

import { useEffect } from "react"
import "../styles/transcript.css"

function TranscriptPanel({ transcription, currentTime, isLoading, error, onSegmentClick }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const isSegmentActive = (segment) => {
    return currentTime >= segment.start && currentTime <= segment.end
  }

  // Scroll to active segment
  useEffect(() => {
    const activeSegment = document.querySelector(".transcript-segment.active")
    if (activeSegment) {
      activeSegment.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [currentTime])

  if (isLoading) {
    return (
      <div className="transcript-panel">
        <div className="transcript-header">
          <h3>Transcrição</h3>
        </div>
        <div className="transcript-loading">
          <div className="loading-spinner"></div>
          <p>Gerando transcrição...</p>
          <p className="loading-subtitle">Isso pode levar alguns instantes</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="transcript-panel">
        <div className="transcript-header">
          <h3>Transcrição</h3>
        </div>
        <div className="transcript-error">
          <p>Erro ao gerar transcrição</p>
          <p className="error-message">{error.message || "Tente novamente mais tarde"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="transcript-panel">
      <div className="transcript-header">
        <h3>Transcrição</h3>
        <div className="transcript-time">
          <span className="current-time">{formatTime(currentTime)}</span>
        </div>
      </div>

      <div className="transcript-content">
        {transcription.length === 0 ? (
          <div className="transcript-empty">
            <p>Nenhuma transcrição disponível</p>
          </div>
        ) : (
          <div className="transcript-segments">
            {transcription.map((segment, index) => (
              <div
                key={index}
                className={`transcript-segment ${isSegmentActive(segment) ? "active" : ""}`}
                onClick={() => onSegmentClick(segment.start)}
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

export default TranscriptPanel
