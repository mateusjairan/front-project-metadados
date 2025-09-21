"use client"

import { forwardRef } from "react"
import { downloadTranscript, downloadTranscriptAsTxt } from "@/app/lib/download-transcript"
import type { TranscriptionSegment } from "@/app/lib/types"
import { FileJson, FileText } from "lucide-react"
import styles from "./video-player.module.css"

interface VideoPlayerProps {
  videoUrl: string
  onTimeUpdate: () => void
  onPlay: () => void
  onPause: () => void
  transcription: TranscriptionSegment[]
  videoFile: File
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ videoUrl, onTimeUpdate, onPlay, onPause, transcription, videoFile }, ref) => {
    return (
      <div className={styles.root}>
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

        <div className={styles.info}>
          <h3 className={styles.title}>Baixar Transcrição</h3>
          <input type="checkbox" name="check-timestamp" id="check-timestamp" className={styles.checkbox} />
          <label htmlFor="check-timestamp" className={styles.checkboxLabel}>Remover marcador de tempo do texto</label>
          <div className={styles.menuButton}>
            <button
              className={styles.downloadButton}
              onClick={() => downloadTranscript(videoFile.name, transcription)}
            >
              <FileJson size={40} />
            </button>
            <button
              className={styles.downloadButton}
              onClick={() => downloadTranscriptAsTxt(videoFile.name, transcription)}
            >
              <FileText size={40} />
            </button>
          </div>
        </div>
      </div>
    )
  },
)

VideoPlayer.displayName = "VideoPlayer"

export default VideoPlayer
