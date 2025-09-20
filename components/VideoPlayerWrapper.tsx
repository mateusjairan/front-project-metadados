"use client"

import VideoPlayer from "@/components/video-player"
import TranscriptionPanel from "@/components/transcription-panel"
import { useVideoSync } from "@/hooks/use-video-sync"
import type { TranscriptionSegment } from "@/types/transcription"
import type { Video } from "@/types/video"
import { useState } from "react"

interface VideoPlayerWrapperProps {
  video: Video;
  segments: TranscriptionSegment[];
}

export default function VideoPlayerWrapper({ video, segments }: VideoPlayerWrapperProps) {
  const {
    currentTime,
    isPlaying,
    videoRef,
    handleTimeUpdate,
    handlePlay,
    handlePause,
    seekToTime,
  } = useVideoSync()

  const handleTranscriptionClick = (startTime: number) => {
    seekToTime(startTime)
  }

  // Assuming the video URL can be constructed from the video data, or is absolute.
  // For now, let's assume a relative path to a public directory.
  // This will likely need to be adjusted based on where the API stores/serves videos.
  const videoUrl = `/videos/${video.nome_arquivo}`;


  return (
    <div className="video-workspace" style={{ direction: "ltr" }}>
      <div className="video-section">
        <VideoPlayer
          ref={videoRef}
          videoUrl={videoUrl}
          onTimeUpdate={handleTimeUpdate}
          onPlay={handlePlay}
          onPause={handlePause}
          transcription={segments}
        />
      </div>

      <div className="transcription-section">
        <TranscriptionPanel
          transcription={segments}
          currentTime={currentTime}
          isPlaying={isPlaying}
          onTranscriptionClick={handleTranscriptionClick}
        />
      </div>
    </div>
  )
}
