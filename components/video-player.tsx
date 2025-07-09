"use client"

import { forwardRef } from "react"
import { downloadTranscript } from "@/services/download-transcript"
import { TranscriptionSegment } from "@/types/transcription"


interface VideoPlayerProps {
  videoUrl: string
  onTimeUpdate: () => void
  onPlay: () => void
  onPause: () => void
  transcription: TranscriptionSegment[]
  videoFile: File
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ videoUrl, onTimeUpdate, onPlay, onPause}, ref) => {
    return (
      <div className="video-player">
        <video
          ref={ref}
          src={videoUrl}
          controls
          onTimeUpdate={onTimeUpdate}
          onPlay={onPlay}
          onPause={onPause}
          className="video-element"
        >
          Your browser does not support the video tag.
        </video>

        <div className="video-info">
          <h3>Baixar Transcrição</h3>
           <button 
            className="download-button" 
            onClick={downloadTranscript}>
           <img src={"/json-file.png"} alt="Exportar JSON" />

          </button>
        </div>
      </div>
    )
  },
)

VideoPlayer.displayName = "VideoPlayer"

export default VideoPlayer
