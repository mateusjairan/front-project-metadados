import { useQuery } from "@tanstack/react-query"
import { getTranscription } from "../api/transcribe"

/**
 * Hook personalizado para gerenciar a transcrição de vídeo usando React Query
 * @param {File|null} videoFile - O arquivo de vídeo para transcrição
 * @returns {Object} - Estado da transcrição
 */
function useTranscription(videoFile) {
  return useQuery({
    queryKey: ["transcription", videoFile?.name],
    queryFn: () => getTranscription(videoFile),
    enabled: !!videoFile,
    staleTime: 1000 * 60 * 5, // 5 minutos
    cacheTime: 1000 * 60 * 10, // 10 minutos
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export default useTranscription
