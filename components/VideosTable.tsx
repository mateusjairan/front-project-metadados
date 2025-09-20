import Link from "next/link";
import type { Video } from "@/types/video";
import styles from "./VideosTable.module.css";
import DeleteButton from "./DeleteButton";

interface VideosTableProps {
  videos: Video[];
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function VideosTable({ videos }: VideosTableProps) {
  if (videos.length === 0) {
    return <p>Nenhum vídeo transcrito encontrado.</p>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Arquivo</th>
            <th>Idioma</th>
            <th>Duração</th>
            <th>Data da Transcrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>{video.nome}</td>
              <td>{video.nome_arquivo}</td>
              <td>{video.idioma}</td>
              <td>{formatDuration(video.duracao)}</td>
              <td>{formatDate(video.data_transcricao)}</td>
              <td className={styles.actionsCell}>
                <Link href={`/videos/${video.id}`} passHref>
                  <a className={styles.actionButton}>Detalhes</a>
                </Link>
                <DeleteButton videoId={video.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
