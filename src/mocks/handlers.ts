import { http, HttpResponse, delay } from 'msw';
import { videos } from './db';
import type { Video } from '@/app/lib/types';

// A URL base da nossa API mockada
const API_URL = 'http://localhost:8000';

export const handlers = [
  // Handler para GET /videos
  http.get(`${API_URL}/videos`, async () => {
    await delay(150); // Simula um delay de rede
    return HttpResponse.json(videos);
  }),

  // Handler para GET /videos/:videoId
  http.get(`${API_URL}/videos/:videoId`, async ({ params }) => {
    const { videoId } = params;
    const video = videos.find((v) => v.id === videoId);

    await delay(150);

    if (!video) {
      return new HttpResponse(null, { status: 404, statusText: 'Video Not Found' });
    }

    return HttpResponse.json(video);
  }),

  // Handler para POST /transcribe
  http.post(`${API_URL}/transcribe`, async ({ request }) => {
    // Em um cenário real, analisaríamos o 'request.formData()'
    // Aqui, vamos apenas simular a criação de um novo vídeo.

    await delay(1500); // Simula o tempo de processamento do vídeo

    const newVideo: Video = {
      id: crypto.randomUUID(),
      nome_arquivo: `novo_video_${Date.now()}.mp4`,
      duracao: 180,
      idioma: 'pt-BR',
      data_transcricao: new Date().toISOString(),
      transcricao: 'Esta é uma transcrição gerada para o novo vídeo. O conteúdo foi processado com sucesso.',
      segments: [
        { start: 0, end: 5, text: 'Esta é uma transcrição gerada para o novo vídeo.' },
        { start: 5.5, end: 10, text: 'O conteúdo foi processado com sucesso.' },
      ],
    };

    videos.push(newVideo);

    return HttpResponse.json(newVideo, { status: 201 });
  }),

  // Handler para PUT /videos/:videoId
  http.put(`${API_URL}/videos/:videoId`, async ({ request, params }) => {
    const { videoId } = params;
    const body = await request.json() as { nome_arquivo: string };
    const videoIndex = videos.findIndex((v) => v.id === videoId);

    await delay(200);

    if (videoIndex === -1) {
      return new HttpResponse(null, { status: 404, statusText: 'Video Not Found' });
    }

    videos[videoIndex].nome_arquivo = body.nome_arquivo;

    return HttpResponse.json(videos[videoIndex]);
  }),

  // Handler para DELETE /videos/:videoId
  http.delete(`${API_URL}/videos/:videoId`, async ({ params }) => {
    const { videoId } = params;
    const videoIndex = videos.findIndex((v) => v.id === videoId);

    await delay(300);

    if (videoIndex === -1) {
      return new HttpResponse(null, { status: 404, statusText: 'Video Not Found' });
    }

    videos.splice(videoIndex, 1);

    return new HttpResponse(null, { status: 204 });
  }),
];
