"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useGetVideos, useUpdateVideo } from '@/app/lib/hooks';
import { toast } from 'sonner';
import styles from './edit-modal.module.css';

export default function EditVideoModal() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const { data: videos } = useGetVideos();
  const video = videos?.find(v => v.id.toString() === id);

  const [name, setName] = useState('');

  useEffect(() => {
    if (video) {
      setName(video.nome || video.nome_arquivo);
    }
  }, [video]);

  const updateVideoMutation = useUpdateVideo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!video) return;

    updateVideoMutation.mutate({ id: video.id, data: { nome: name } }, {
      onSuccess: () => {
        toast.success('Vídeo atualizado com sucesso!');
        router.back(); // Close the modal
      },
      onError: (error) => {
        toast.error(`Falha ao atualizar: ${error.message}`);
      }
    });
  };

  if (!video) {
    return null; // Or a loading/error state
  }

  return (
    <div className={styles.overlay} onClick={() => router.back()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Editar Nome do Vídeo</h2>
        <p>Editando: {video.nome_arquivo}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
            autoFocus
          />
          <div className={styles.buttons}>
            <button type="button" onClick={() => router.back()} className={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" disabled={updateVideoMutation.isPending} className={styles.submitButton}>
              {updateVideoMutation.isPending ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
