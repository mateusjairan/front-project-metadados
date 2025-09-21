"use client";

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useGetVideos, useDeleteVideo } from '@/app/lib/hooks';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { formatDuration, formatDate } from '@/app/lib/utils';
import { toast } from 'sonner';
import ConfirmationModal from '@/app/components/ui/ConfirmationModal';
import styles from './VideosTable.module.css';
import { Video } from '@/app/lib/types';

export default function VideosTable() {
  const { data: videos, isLoading, isError, error } = useGetVideos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const deleteVideoMutation = useDeleteVideo();

  const openDeleteModal = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!selectedVideo) return;

    deleteVideoMutation.mutate(selectedVideo.id, {
      onSuccess: () => {
        toast.success(`Vídeo "${selectedVideo.nome_arquivo}" excluído com sucesso.`);
        closeDeleteModal();
      },
      onError: (error) => {
        toast.error(`Falha ao excluir o vídeo: ${error.message}`);
        closeDeleteModal();
      },
    });
  };

  if (isLoading) {
    return <div>Carregando vídeos...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar vídeos: {error.message}</div>;
  }

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome do Arquivo</th>
            <th>Duração</th>
            <th>Idioma</th>
            <th>Data da Transcrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {videos && videos.length > 0 ? (
            videos.map((video) => (
              <tr key={video.id}>
                <td>{video.nome_arquivo}</td>
                <td>{formatDuration(video.duracao)}</td>
                <td>{video.idioma}</td>
                <td>{formatDate(video.data_transcricao)}</td>
                <td className={styles.actions}>
                  <Link href={`/videos/${video.id}`} className={styles.actionButton} title="Visualizar">
                    <Eye size={18} />
                  </Link>
                  <Link href={`/videos/${video.id}/edit`} className={styles.actionButton} title="Editar Nome">
                    <Pencil size={18} />
                  </Link>
                  <button
                    onClick={() => openDeleteModal(video)}
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    title="Excluir"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Nenhuma transcrição encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedVideo && (
        <ConfirmationModal
          isOpen={isModalOpen}
          title="Confirmar Exclusão"
          description={`Tem certeza de que deseja excluir permanentemente o vídeo "${selectedVideo.nome_arquivo}"? Esta ação não pode ser desfeita.`}
          confirmText="Excluir"
          onConfirm={handleDeleteConfirm}
          onClose={closeDeleteModal}
          isConfirming={deleteVideoMutation.isPending}
        />
      )}
    </>
  );
}
