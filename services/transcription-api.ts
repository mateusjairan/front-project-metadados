import type { TranscriptionSegment } from "@/types/transcription"

// Mock data para demonstração
const mockTranscription: TranscriptionSegment[] = [
  {
    start: 0,
    end: 3.5,
    text: "Welcome to this video demonstration of our transcription service.",
  },
  {
    start: 3.5,
    end: 7.2,
    text: "In this example, we'll show how the transcription synchronizes with the video playback.",
  },
  {
    start: 7.2,
    end: 11.8,
    text: "You can click on any segment to jump to that specific moment in the video.",
  },
  {
    start: 11.8,
    end: 15.5,
    text: "The current segment is highlighted as the video plays, providing real-time synchronization.",
  },
  {
    start: 15.5,
    end: 19.3,
    text: "This technology can be used for educational content, interviews, and accessibility purposes.",
  },
  {
    start: 19.3,
    end: 23.0,
    text: "The transcription is generated automatically and includes precise timestamps.",
  },
]

export async function getTranscription(videoFile: File): Promise<TranscriptionSegment[]> {
  // Simular delay da API
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Em produção, você faria algo como:
  // const formData = new FormData()
  // formData.append('video', videoFile)
  // const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
  //   },
  //   body: formData
  // })
  // return response.json()

  // Para integração com a API do GitHub mencionada:
  // const response = await fetch('https://api.github.com/repos/MetadadosPy/manipulacao_metadados/contents/', {
  //   method: 'GET',
  //   headers: {
  //     'Accept': 'application/vnd.github.v3+json',
  //   }
  // })

  return mockTranscription
}
