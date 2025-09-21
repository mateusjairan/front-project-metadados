"use client"

import { forwardRef } from "react"
import { downloadTranscript, downloadTranscriptAsTxt } from "@/services/download-transcript"
import type { TranscriptionSegment } from "@/types/transcription"
import styles from "./VideoPlayer.module.css"

interface VideoPlayerProps {
  videoUrl: string
  onTimeUpdate: () => void
  onPlay: () => void
  onPause: () => void
  transcription: TranscriptionSegment[]
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ videoUrl, onTimeUpdate, onPlay, onPause, transcription }, ref) => {
    return (
      <div className={styles.videoPlayer}>
        <video
          ref={ref}
          src={videoUrl}
          controls
          onTimeUpdate={onTimeUpdate}
          onPlay={onPlay}
          onPause={onPause}
          className={styles.videoElement}
        >
          Your browser does not support the video tag.
        </video>

        <div className={styles.videoInfo}>
          <h3>Baixar Transcrição</h3>
          <input type="checkbox" name="check-timestamp" id="check-timestamp" className={styles.checkTimestamp} />
          <label htmlFor="check-timestamp">Remover marcador de tempo do texto</label>
          <div className={styles.menuButton}>
            <button
              className={styles.downloadButton}
              onClick={() => downloadTranscript(transcription)}>
              <img src={"/json-file.png"} alt="Exportar JSON" />
            </button>
            <button
              className={styles.downloadButton}
              onClick={() => downloadTranscriptAsTxt(transcription)}>
              <img src={"/txt-file.png"} alt="Exportar TXT" />
            </button>
          </div>
        </div>
      </div>
    )
  },
)

VideoPlayer.displayName = "VideoPlayer"

export default VideoPlayer
