"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useGetVideos } from '@/app/lib/hooks';
import { formatDate, formatDuration } from '@/app/lib/utils';
import { ArrowLeft, Clock, Tag, Calendar } from 'lucide-react';
import SegmentsViewer from '@/app/features/video-details/SegmentsViewer';
import styles from './video-details.module.css';

export default function VideoDetailsPage() {
  const params = useParams();
  const { id } = params;
  const { data: videos, isLoading, isError } = useGetVideos();

  if (isLoading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (isError) {
    return <div className={styles.error}>Erro ao carregar os dados do vídeo.</div>;
  }

  const video = videos?.find(v => v.id.toString() === id);

  if (!video) {
    return <div className={styles.notFound}>Vídeo não encontrado.</div>;
  }

  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backLink}>
        <ArrowLeft size={20} />
        Voltar para o Dashboard
      </Link>
      <header className={styles.header}>
        <h1 className={styles.title}>{video.nome_arquivo}</h1>
      </header>
      <section className={styles.metadata}>
        <div className={styles.metaItem}>
          <Clock size={18} />
          <span>{formatDuration(video.duracao)}</span>
        </div>
        <div className={styles.metaItem}>
          <Tag size={18} />
          <span>{video.idioma}</span>
        </div>
        <div className={styles.metaItem}>
          <Calendar size={18} />
          <span>{formatDate(video.data_transcricao)}</span>
        </div>
      </section>

      <section className={styles.transcriptionSection}>
        <div className={styles.fullText}>
            <h2>Transcrição Completa</h2>
            <textarea readOnly value={video.texto} />
        </div>
        <SegmentsViewer segmentsJson={video.dados} />
      </section>
    </main>
  );
}
