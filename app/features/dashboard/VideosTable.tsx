"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Eye, Pencil, Trash2, LoaderCircle, AlertTriangle } from 'lucide-react';
import { getVideos } from '@/app/lib/api';
import { formatDate, formatDuration } from '@/app/lib/utils';
import type { Video } from '@/app/lib/types';
import styles from './VideosTable.module.css';
import { EditModal } from './EditModal';
import { DeleteModal } from './DeleteModal';

export function VideosTable() {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const { data: videos, isLoading, isError, error } = useQuery<Video[]>({
    queryKey: ['videos'],
    queryFn: getVideos,
  });

  const handleEditClick = (video: Video) => {
    setSelectedVideo(video);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (video: Video) => {
    setSelectedVideo(video);
    setDeleteModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedVideo(null);
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <LoaderCircle className="animate-spin" size={32} />
        <p>Carregando vídeos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.error}>
        <AlertTriangle size={32} />
        <p>Erro ao carregar os dados: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.tableContainer}>
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
            {videos?.map((video) => (
              <tr key={video.id}>
                <td>{video.nome_arquivo}</td>
                <td>{formatDuration(video.duracao)}</td>
                <td>{video.idioma}</td>
                <td>{formatDate(video.data_transcricao)}</td>
                <td className={styles.actionsCell}>
                  <Link href={`/videos/${video.id}`} passHref>
                    <button className={styles.actionButton} title="Visualizar">
                      <Eye size={18} />
                    </button>
                  </Link>
                  <button className={styles.actionButton} title="Editar" onClick={() => handleEditClick(video)}>
                    <Pencil size={18} />
                  </button>
                  <button className={styles.actionButton} title="Excluir" onClick={() => handleDeleteClick(video)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeModal}
        video={selectedVideo}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeModal}
        video={selectedVideo}
      />
    </>
  );
}
