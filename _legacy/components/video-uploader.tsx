"use client"

import type React from "react"
import { useState, useRef } from "react"
import VideoConfirmationModal from "./video-confirmation-modal"

import "../styles/VideoConfirmationModal.css"

interface VideoUploaderProps {
  onVideoUpload: (file: File) => void
}

export default function VideoUploader({ onVideoUpload }: VideoUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const processFile = (file: File) => {
    if (file.type.startsWith("video/")) {
      setSelectedFile(file)
      setIsModalOpen(true)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleConfirmUpload = () => {
    if (selectedFile) {
      onVideoUpload(selectedFile)
    }
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="video-uploader">
      <div
        className={`upload-area ${isDragOver ? "drag-over" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <div className="upload-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10,9 9,9 8,9" />
          </svg>
        </div>

        <h3>Upload de arquivo de vídeo</h3>
        <p>Arraste e solte um arquivo aqui, ou selecione um arquivo.</p>
        <p className="file-types">Formatos suportados: MP4, WebM, AVI, MOV</p>

        <button className="upload-button" type="button">
          Selecionar arquivo.
        </button>
      </div>

      <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileSelect} style={{ display: "none" }} />

      <VideoConfirmationModal
        isOpen={isModalOpen}
        file={selectedFile}
        onConfirm={handleConfirmUpload}
        onClose={handleCloseModal}
      />
    </div>
  )
}
