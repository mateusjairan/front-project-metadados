import { http, HttpResponse, delay } from 'msw'
import { db } from './db'

export const handlers = [
  http.get('/videos', async () => {
    await delay(1000)
    const videos = db.video.getAll()
    return HttpResponse.json(videos)
  }),

  http.post('/videos', async ({ request }) => {
    await delay(1000)

    const data = await request.formData()

    const file = data.get('file') as File

    if (!file) {
      return new HttpResponse(null, { status: 400 })
    }

    const video = db.video.create({
      id: crypto.randomUUID(),
      name: file.name,
      path: '/',
      transcription: '',
      createdAt: new Date().toISOString(),
    })

    return HttpResponse.json(video)
  }),

  http.get('/videos/:id', async ({ params }) => {
    await delay(1000)

    const video = db.video.findFirst({
      where: {
        id: {
          equals: params.id as string,
        },
      },
    })

    return HttpResponse.json(video)
  }),

  http.put('/videos/:id', async ({ request, params }) => {
    await delay(1000)

    const { transcription } = (await request.json()) as { transcription: string }

    const updatedVideo = db.video.update({
      where: {
        id: {
          equals: params.id as string,
        },
      },
      data: {
        transcription,
      },
    })

    return HttpResponse.json(updatedVideo)
  }),

  http.delete('/videos/:id', async ({ params }) => {
    await delay(1000)

    db.video.delete({
      where: {
        id: {
          equals: params.id as string,
        },
      },
    })

    return new HttpResponse(null, { status: 204 })
  }),

  http.post('/videos/:id/transcription', async () => {
    await delay(2000)

    return HttpResponse.json({
      transcription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultricies, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies ultricies, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    })
  }),
]