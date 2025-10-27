"use client";

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal } from '@/app/components/ui/Modal';
import { updateVideo } from '@/app/lib/api';
import type { Video } from '@/app/lib/types';
import styles from '@/app/components/ui/Modal.module.css'; // Reutilizando estilos do modal genérico

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: Video | null;
}

export function EditModal({ isOpen, onClose, video }: EditModalProps) {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (video) {
      setName(video.nome_arquivo);
    }
  }, [video]);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (video && name.trim()) {
      mutate({ videoId: video.id, nome_arquivo: name.trim() });
    }
  };

  if (!video) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Vídeo">
      <form onSubmit={handleSubmit}>
        <div className={styles.body}>
          <label htmlFor="videoName" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Nome do Arquivo
          </label>
          <input
            id="videoName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#333', color: '#fff' }}
            disabled={isPending}
          />
          {isError && <p style={{ color: '#f87171', marginTop: '0.5rem' }}>Erro: {error.message}</p>}
        </div>
        <div className={styles.footer}>
          <button type="button" className={styles.cancelButton} onClick={onClose} disabled={isPending}>
            Cancelar
          </button>
          <button type="submit" className={styles.confirmButton} disabled={isPending}>
            {isPending ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
