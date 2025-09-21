import { http, HttpResponse, delay } from 'msw'
import { db } from './db'
import { API_BASE_URL } from '@/lib/constants'

export const handlers = [
  // Handles a GET /videos request
  http.get(`${API_BASE_URL}/videos`, () => {
    const videos = db.video.getAll()
    return HttpResponse.json(videos)
  }),

  // Handles a GET /videos/:id request
  http.get(`${API_BASE_URL}/videos/:id`, ({ params }) => {
    const { id } = params
    const video = db.video.findFirst({
      where: { id: { equals: id } },
    })

    if (!video) {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found' })
    }

    return HttpResponse.json(video)
  }),

  // Handles a GET request for a video file stream
  http.get(`${API_BASE_URL}/videos/stream/:fileName`, () => {
    // In a real app, this would stream the video.
    // In our mock, we can just forward the request to the static placeholder file.
    // Note: This requires the browser to be on the same origin, which it is.
    return fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_HfrHCD0PkBG4YiV4knL3tlsXLtrD/BfVtZ3tyMpFOAMaDCO49rG/public/placeholder.mp4')
  }),

  // Handles a GET request for transcription segments
  http.get(`/api/mock-data/:videoId.json`, ({ params }) => {
    const { videoId } = params
    const video = db.video.findFirst({
      where: { id: { equals: videoId } },
    })

    if (!video) {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found' })
    }

    return HttpResponse.json({ segments: video.transcription_segments })
  }),

  // Handles a POST /transcribe request
  http.post(`${API_BASE_URL}/transcribe/`, async () => {
    // Simulate a processing delay
    await delay(2000)

    const newVideoId = crypto.randomUUID()
    const newVideo = db.video.create({
      id: newVideoId,
      nome: 'Nova Transcrição Mock',
      nome_arquivo: 'new-mock-video.mp4',
      idioma: 'pt-BR',
      duracao: 123,
      data_transcricao: new Date().toISOString(),
      caminho_json: `/api/mock-data/${newVideoId}.json`,
      caminho_txt: `/api/mock-data/${newVideoId}.txt`,
      transcription_segments: [
        { start: 0, end: 5, text: 'Este é um vídeo gerado pelo mock server.' },
        { start: 5, end: 10, text: 'O upload foi um sucesso.' },
      ],
    })

    return HttpResponse.json(newVideo, { status: 201 })
  }),

  // Handles a DELETE /videos/:id request
  http.delete(`${API_BASE_URL}/videos/:id`, ({ params }) => {
    const { id } = params
    const deletedVideo = db.video.delete({
      where: { id: { equals: id } },
    })

    if (!deletedVideo) {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found' })
    }

    return new HttpResponse(null, { status: 204 })
  }),

  // Handles a PUT /videos/:id request
  http.put(`${API_BASE_URL}/videos/:id`, async ({ params, request }) => {
    const { id } = params
    const videoData = await request.json()

    const updatedVideo = db.video.update({
      where: { id: { equals: id } },
      data: videoData,
    })

    if (!updatedVideo) {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found' })
    }

    return HttpResponse.json(updatedVideo)
  }),
]
