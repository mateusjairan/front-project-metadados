import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) {
    return '00:00';
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy HH:mm", { locale: ptBR });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Data inválida";
  }
}
