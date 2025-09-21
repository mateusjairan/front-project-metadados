"use client"

import { useState, useRef, useCallback } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getVideos, uploadFile, updateVideo, deleteVideo } from "./api"
import { Video } from "./types"

// --- Existing Video Sync Hook ---
export function useVideoSync() {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }, [])

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
  }, [])

  const handlePause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const seekToTime = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  return {
    currentTime,
    isPlaying,
    videoRef,
    handleTimeUpdate,
    handlePlay,
    handlePause,
    seekToTime,
  }
}

// --- New React Query Hooks ---

export function useGetVideos() {
  return useQuery<Video[], Error>({
    queryKey: ['videos'],
    queryFn: getVideos,
  });
}

export function useUploadFile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadFile(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
}

export function useUpdateVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { nome: string } }) => updateVideo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
}

export function useDeleteVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteVideo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
}
