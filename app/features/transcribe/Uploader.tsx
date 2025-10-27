"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { UploadCloud, File, LoaderCircle } from 'lucide-react';
import { transcribeVideo } from '@/app/lib/api';
import styles from './Uploader.module.css';

export function Uploader() {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: transcribeVideo,
    onSuccess: (data) => {
      toast.success('Transcrição iniciada com sucesso!');
      router.push(`/videos/${data.id}`);
    },
    onError: (error) => {
      toast.error(`Erro na transcrição: ${error.message}`);
      setFile(null); // Limpa o arquivo em caso de erro
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      mutate(selectedFile);
    }
  }, [mutate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/webm': ['.webm'],
      'audio/mpeg': ['.mp3'],
      'audio/wav': ['.wav'],
    },
    multiple: false,
    disabled: isPending,
  });

  const getStatusMessage = () => {
    if (isPending) {
      return (
        <div className={styles.status}>
          <LoaderCircle className="animate-spin" />
          <span>Processando... (Isso pode levar um momento)</span>
        </div>
      );
    }
    if (file) {
      return (
        <div className={styles.fileInfo}>
          <File />
          <span>Arquivo selecionado: {file.name}</span>
        </div>
      );
    }
    return (
      <>
        <UploadCloud size={48} />
        <p>Arraste e solte um arquivo de vídeo/áudio aqui, ou clique para selecionar</p>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ''}`}
      >
        <input {...getInputProps()} />
        {getStatusMessage()}
      </div>
    </div>
  );
}
