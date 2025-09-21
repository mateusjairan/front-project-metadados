import { Video, Segment } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function getVideos(): Promise<Video[]> {
  const res = await fetch(`${API_URL}/videos`);
  if (!res.ok) {
    console.error('Failed to fetch videos:', res.status, res.statusText);
    throw new Error('Falha ao buscar vídeos.');
  }
  return res.json();
}

export async function uploadFile(file: File): Promise<Segment[]> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_URL}/transcribe/`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    console.error('Failed to upload file:', res.status, res.statusText);
    throw new Error('Falha na transcrição do arquivo.');
  }
  return res.json();
}

export async function updateVideo(id: number, data: { nome: string }): Promise<Video> {
  const res = await fetch(`${API_URL}/videos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error('Failed to update video:', res.status, res.statusText);
    throw new Error('Falha ao atualizar o vídeo.');
  }
  return res.json();
}

export async function deleteVideo(id: number): Promise<Response> {
  const res = await fetch(`${API_URL}/videos/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    console.error('Failed to delete video:', res.status, res.statusText);
    throw new Error('Falha ao excluir o vídeo.');
  }
  return res;
}
