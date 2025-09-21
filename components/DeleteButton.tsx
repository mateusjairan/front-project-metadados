"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteVideo } from "@/services/videos-api"
import ConfirmationModal from "./ConfirmationModal"
import tableStyles from "./VideosTable.module.css" // For button styling

interface DeleteButtonProps {
  videoId: string
}

export default function DeleteButton({ videoId }: DeleteButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => deleteVideo(videoId),
    onSuccess: () => {
      // Invalidate and refetch the videos query to update the list
      queryClient.invalidateQueries({ queryKey: ['videos'] })
      setIsModalOpen(false)
      // Optionally, show a success notification (toast)
    },
    onError: (error) => {
      // Optionally, show an error notification (toast)
      console.error("Failed to delete video:", error)
      alert(`Error: ${error.message}`) // Simple feedback for now
      setIsModalOpen(false)
    },
  })

  const handleConfirmDelete = () => {
    deleteMutation.mutate()
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`${tableStyles.actionButton} ${tableStyles.deleteButton}`}
        disabled={deleteMutation.isPending}
      >
        {deleteMutation.isPending ? "Excluindo..." : "Excluir"}
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message="Tem certeza de que deseja excluir este vídeo e sua transcrição? Esta ação não pode ser desfeita."
      />
    </>
  )
}
