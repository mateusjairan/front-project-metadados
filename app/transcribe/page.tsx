"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "sonner"
import VideoUploader from "@/components/video-uploader"
import { createTranscription } from "@/services/transcription-api"
import Providers from "@/components/Providers"

function TranscribePageContent() {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: createTranscription,
    onSuccess: (data) => {
      toast.success("Transcrição concluída com sucesso!")
      // Redirect to the details page of the new video
      router.push(`/videos/${data.id}`)
    },
    onError: (error) => {
      toast.error(`Falha na transcrição: ${error.message}`)
    },
  })

  const handleVideoUpload = (file: File) => {
    toast.info("Enviando arquivo para transcrição...")
    mutation.mutate(file)
  }

  return (
    <div>
      <Toaster richColors />
      <div style={{ marginBottom: '2rem' }}>
        <h1>Transcrever Novo Vídeo</h1>
        <p>Envie um arquivo de vídeo ou áudio para iniciar a transcrição.</p>
      </div>

      {mutation.isPending ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          {/* A better loading spinner could be a separate component */}
          <div className="loading-spinner" style={{ margin: '0 auto 1rem' }}></div>
          <h2>Processando...</h2>
          <p>Seu vídeo está sendo transcrito. Por favor, aguarde.</p>
        </div>
      ) : (
        <VideoUploader onVideoUpload={handleVideoUpload} />
      )}
    </div>
  )
}

export default function TranscribePage() {
  return (
    <Providers>
      <TranscribePageContent />
    </Providers>
  )
}
