import { Uploader } from '@/app/features/transcribe/Uploader';
import styles from './page.module.css';

export default function TranscribePage() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Nova Transcrição</h1>
        <p className={styles.description}>
          Envie um arquivo de vídeo ou áudio para gerar uma nova transcrição.
        </p>
      </header>

      <section>
        <Uploader />
      </section>
    </main>
  );
}
