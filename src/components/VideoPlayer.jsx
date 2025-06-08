import { forwardRef } from "react"
import "../styles/player.css"

const VideoPlayer = forwardRef(({ videoUrl, onTimeUpdate, onPlay, onPause }, ref) => {
  return (
    <div className="video-player-container">
      <video
        ref={ref}
        src={videoUrl}
        controls
        onTimeUpdate={onTimeUpdate}
        onPlay={onPlay}
        onPause={onPause}
        className="video-element"
      >
        Seu navegador não suporta a tag de vídeo.
      </video>
    </div>
  )
})

VideoPlayer.displayName = "VideoPlayer"

export default VideoPlayer
