"use client"; // A página principal ainda precisa ser um client component para usar o Link do Next.js e o CSS Module da forma como está estruturado

import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import styles from './page.module.css';
import { VideosTable } from '@/app/features/dashboard/VideosTable';

export default function DashboardPage() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard de Transcrições</h1>
        <Link href="/transcrever" passHref>
          <button className={styles.newTranscriptionButton}>
            <PlusCircle size={20} />
            Nova Transcrição
          </button>
        </Link>
      </header>

      <section>
        <VideosTable />
      </section>
    </main>
  );
}
