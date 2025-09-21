"use client";

import Link from 'next/link';
import { Plus } from 'lucide-react';
import VideosTable from '@/app/features/dashboard/VideosTable';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard de Transcrições</h1>
        <Link href="/transcrever" className={styles.button}>
          <Plus size={20} />
          Nova Transcrição
        </Link>
      </header>
      <VideosTable />
    </main>
  );
}
