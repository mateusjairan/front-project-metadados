"use client";

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useUploadFile, useGetVideos } from '@/app/lib/hooks';
import { toast } from 'sonner';
import { UploadCloud, Loader2 } from 'lucide-react';
import styles from './UploadForm.module.css';

export default function UploadForm() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { data: videos } = useGetVideos();
  const uploadMutation = useUploadFile();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    uploadMutation.mutate(selectedFile, {
      onSuccess: () => {
        toast.success('Arquivo transcrito com sucesso! Redirecionando...');
        // The query will be invalidated automatically by the hook's onSuccess
        // We need to find the new video. The API doesn't return the ID,
        // so we find it by comparing the file name.
        const newVideo = videos?.find(v => v.nome_arquivo === selectedFile.name);
        if (newVideo) {
          router.push(`/videos/${newVideo.id}`);
        } else {
          // Fallback if the video is not found immediately
          router.push('/');
        }
      },
      onError: (error) => {
        toast.error(`Falha na transcrição: ${error.message}`);
      },
    });
  };

  const uploadAreaClassName = `${styles.uploadArea} ${isDragOver ? styles.dragOver : ''}`;

  return (
    <div className={styles.container}>
      <div
        className={uploadAreaClassName}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input ref={fileInputRef} type="file" accept="video/*,audio/*" onChange={handleFileSelect} className={styles.fileInput} />
        <div className={styles.icon}>
          <UploadCloud size={64} />
        </div>
        <h3 className={styles.title}>Arraste e Solte seu Arquivo</h3>
        <p className={styles.description}>ou clique para selecionar</p>
        {selectedFile && <p className={styles.fileName}>Arquivo selecionado: {selectedFile.name}</p>}
      </div>
      <button
        className={styles.submitButton}
        onClick={handleSubmit}
        disabled={!selectedFile || uploadMutation.isPending}
      >
        {uploadMutation.isPending ? (
          <>
            <Loader2 size={20} className={styles.spinner} />
            Processando...
          </>
        ) : (
          'Transcrever Arquivo'
        )}
      </button>
    </div>
  );
}
