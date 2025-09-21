/**
 * Formata uma data no formato ISO para o padrão brasileiro (dd/MM/yyyy HH:mm).
 * @param isoDateString - A data em formato ISO 8601.
 * @returns A data formatada como string.
 */
export function formatDate(isoDateString: string): string {
  if (!isoDateString) return 'N/A';

  try {
    const date = new Date(isoDateString);

    // Intl.DateTimeFormat é a maneira moderna e recomendada para formatação de datas.
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return formatter.format(date);
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
}

/**
 * Formata a duração de segundos para o formato "X min Y s".
 * @param durationInSeconds - A duração total em segundos.
 * @returns A duração formatada como string.
 */
export function formatDuration(durationInSeconds: number): string {
  if (isNaN(durationInSeconds) || durationInSeconds < 0) {
    return '0 s';
  }

  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  if (minutes > 0) {
    return `${minutes} min ${seconds} s`;
  }

  return `${seconds} s`;
}
