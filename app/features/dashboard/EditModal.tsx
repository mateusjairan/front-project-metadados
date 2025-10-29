"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Modal } from "@/app/components/ui/Modal"
import { updateVideo } from "@/app/lib/api"
import type { Video } from "@/app/lib/types"
import styles from "./EditModal.module.css"

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  video: Video | null
}

export function EditModal({ isOpen, onClose, video }: EditModalProps) {
  const [name, setName] = useState("")
  const queryClient = useQueryClient()

  useEffect(() => {
    if (video) {
      setName(video.nome_arquivo)
    }
  }, [video])

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
      onClose()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (video && name.trim()) {
      mutate({ videoId: video.id, nome_arquivo: name.trim() })
    }
  }

  if (!video) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Vídeo">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formBody}>
          <label htmlFor="videoName" className={styles.label}>
            Nome do Arquivo
          </label>
          <input
            id="videoName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            disabled={isPending}
            placeholder="Digite o nome do arquivo"
          />
          {isError && <p className={styles.error}>Erro: {error.message}</p>}
        </div>
        <div className={styles.formFooter}>
          <button type="button" className={styles.cancelButton} onClick={onClose} disabled={isPending}>
            Cancelar
          </button>
          <button type="submit" className={styles.confirmButton} disabled={isPending}>
            {isPending ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </Modal>
  )
}
