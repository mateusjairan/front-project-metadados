"use client"

import type React from "react"
import { useState, useRef } from "react"
import { FileVideo } from "lucide-react"
import VideoConfirmationModal from "./video-confirmation-modal"
import styles from "./video-uploader.module.css"

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

  const uploadAreaClassName = `${styles.uploadArea} ${isDragOver ? styles.dragOver : ""}`

  return (
    <div className={styles.root}>
      <div
        className={uploadAreaClassName}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <div className={styles.icon}>
          <FileVideo size={64} />
        </div>

        <h3 className={styles.title}>Upload de arquivo de vídeo</h3>
        <p className={styles.description}>Arraste e solte um arquivo aqui, ou selecione um arquivo.</p>
        <p className={styles.fileTypes}>Formatos suportados: MP4, WebM, AVI, MOV</p>

        <button className={styles.button} type="button">
          Selecionar arquivo
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
