"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import UploadForm from '@/app/features/transcription/UploadForm';
import styles from './transcrever.module.css';

export default function TranscribePage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={20} />
          Voltar para o Dashboard
        </Link>
        <h1 className={styles.title}>Nova Transcrição</h1>
      </header>
      <div className={styles.content}>
        <UploadForm />
      </div>
    </main>
  );
}
