"use client";

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, LoaderCircle, AlertTriangle } from 'lucide-react';
import { getVideoById } from '@/app/lib/api';
import { formatDate, formatDuration } from '@/app/lib/utils';
import { InteractiveSegments } from '@/app/features/video-details/InteractiveSegments';
import styles from './page.module.css';

export default function VideoDetailsPage() {
  const params = useParams();
  const videoId = params.id as string;

  const { data: video, isLoading, isError, error } = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => getVideoById(videoId),
    enabled: !!videoId, // A query só roda se o videoId existir
  });

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <LoaderCircle className="animate-spin" size={32} />
        <p>Carregando detalhes do vídeo...</p>
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

  if (!video) {
    return (
      <div className={styles.error}>
        <p>Vídeo não encontrado.</p>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={18} />
          Voltar para o Dashboard
        </Link>
        <h1 className={styles.title}>{video.nome_arquivo}</h1>
      </header>

      <div className={styles.contentGrid}>
        <div className={styles.mainContent}>
          <div className={styles.transcriptionContainer}>
            <h3>Transcrição Completa</h3>
            <div className={styles.fullText}>
              <p>{video.transcricao}</p>
            </div>
          </div>
          <InteractiveSegments segments={video.segments} />
        </div>

        <aside className={styles.metadataSidebar}>
          <h3>Metadados</h3>
          <ul className={styles.metadataList}>
            <li className={styles.metadataItem}>
              <strong>Duração</strong>
              <span>{formatDuration(video.duracao)}</span>
            </li>
            <li className={styles.metadataItem}>
              <strong>Idioma</strong>
              <span>{video.idioma}</span>
            </li>
            <li className={styles.metadataItem}>
              <strong>Data da Transcrição</strong>
              <span>{formatDate(video.data_transcricao)}</span>
            </li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
