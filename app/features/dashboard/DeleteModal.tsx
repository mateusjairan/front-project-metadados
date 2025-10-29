"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Modal } from "@/app/components/ui/Modal"
import { deleteVideo } from "@/app/lib/api"
import type { Video } from "@/app/lib/types"
import styles from "./DeleteModal.module.css"

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  video: Video | null
}

export function DeleteModal({ isOpen, onClose, video }: DeleteModalProps) {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
      onClose()
    },
  })

  const handleDelete = () => {
    if (video) {
      mutate(video.id)
    }
  }

  if (!video) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Excluir Vídeo">
      <div className={styles.body}>
        <p className={styles.message}>
          Tem certeza de que deseja excluir o vídeo <strong className={styles.videoName}>"{video.nome_arquivo}"</strong>
          ?
        </p>
        <p className={styles.warning}>Esta ação não poderá ser desfeita.</p>
        {isError && <p className={styles.error}>Erro: {error.message}</p>}
      </div>
      <div className={styles.footer}>
        <button type="button" className={styles.cancelButton} onClick={onClose} disabled={isPending}>
          Cancelar
        </button>
        <button type="button" className={styles.deleteButton} onClick={handleDelete} disabled={isPending}>
          {isPending ? "Excluindo..." : "Excluir"}
        </button>
      </div>
    </Modal>
  )
}
