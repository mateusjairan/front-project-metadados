"use client"

import { useState, useEffect } from "react"
import styles from "./EditVideoModal.module.css"
import type { Video } from "@/types/video"

interface EditVideoModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (newName: string) => void
  video: Video | null
}

export default function EditVideoModal({ isOpen, onClose, onSave, video }: EditVideoModalProps) {
  const [name, setName] = useState("")

  useEffect(() => {
    // When the modal opens, pre-fill the input with the current video name
    if (isOpen && video) {
      setName(video.nome)
    }
  }, [isOpen, video])

  if (!isOpen || !video) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSave(name.trim())
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalHeader}>Editar Nome do Vídeo</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="video-name" className={styles.formLabel}>
              Nome do Vídeo
            </label>
            <input
              id="video-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>
          <div className={styles.actionButtons}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.saveButton} disabled={!name.trim()}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
