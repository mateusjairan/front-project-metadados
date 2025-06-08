"use client"

import { forwardRef } from "react"

interface VideoPlayerProps {
  videoUrl: string
  onTimeUpdate: () => void
  onPlay: () => void
  onPause: () => void
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ videoUrl, onTimeUpdate, onPlay, onPause }, ref) => {
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
          <h3>Video Player</h3>
          <p>Use the controls to play, pause, and seek through the video</p>
        </div>
      </div>
    )
  },
)

VideoPlayer.displayName = "VideoPlayer"

export default VideoPlayer
