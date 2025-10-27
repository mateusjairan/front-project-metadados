"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal } from '@/app/components/ui/Modal';
import { deleteVideo } from '@/app/lib/api';
import type { Video } from '@/app/lib/types';
import styles from '@/app/components/ui/Modal.module.css'; // Reutilizando estilos

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: Video | null;
}

export function DeleteModal({ isOpen, onClose, video }: DeleteModalProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      onClose();
    },
  });

  const handleDelete = () => {
    if (video) {
      mutate(video.id);
    }
  };

  if (!video) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Excluir Vídeo">
      <div className={styles.body}>
        <p>
          Tem certeza de que deseja excluir o vídeo{' '}
          <strong style={{ color: '#f0f0f0' }}>"{video.nome_arquivo}"</strong>?
        </p>
        <p style={{ marginTop: '1rem', color: '#aaa' }}>
          Esta ação não poderá ser desfeita.
        </p>
        {isError && <p style={{ color: '#f87171', marginTop: '1rem' }}>Erro: {error.message}</p>}
      </div>
      <div className={styles.footer}>
        <button type="button" className={styles.cancelButton} onClick={onClose} disabled={isPending}>
          Cancelar
        </button>
        <button
          type="button"
          className={styles.confirmButton}
          onClick={handleDelete}
          disabled={isPending}
          style={{ backgroundColor: '#ef4444', color: 'white' }}
        >
          {isPending ? 'Excluindo...' : 'Excluir'}
        </button>
      </div>
    </Modal>
  );
}
