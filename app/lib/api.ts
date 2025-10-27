import type { Video } from './types';

const API_BASE_URL = 'http://localhost:8000';

export async function getVideos(): Promise<Video[]> {
  const response = await fetch(`${API_BASE_URL}/videos`);
  if (!response.ok) {
    throw new Error('Falha ao buscar vídeos');
  }
  return response.json();
}

export async function deleteVideo(videoId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/videos/${videoId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Falha ao excluir o vídeo');
  }
}

export async function transcribeVideo(file: File): Promise<Video> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/transcribe`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    // Tenta extrair uma mensagem de erro do corpo da resposta
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.detail || 'Falha ao transcrever o vídeo';
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function getVideoById(videoId: string): Promise<Video> {
  const response = await fetch(`${API_BASE_URL}/videos/${videoId}`);
  if (!response.ok) {
    throw new Error('Falha ao buscar os detalhes do vídeo');
  }
  return response.json();
}

export async function updateVideo({ videoId, nome_arquivo }: { videoId: string, nome_arquivo: string }): Promise<Video> {
  const response = await fetch(`${API_BASE_URL}/videos/${videoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome_arquivo }),
  });
  if (!response.ok) {
    throw new Error('Falha ao atualizar o vídeo');
  }
  return response.json();
}
