// Definição para um segmento da transcrição
export interface TranscriptionSegment {
  start: number;
  end: number;
  text: string;
}

// Definição para o objeto principal de Vídeo
export interface Video {
  id: string;
  nome_arquivo: string;
  duracao: number;
  idioma: string;
  data_transcricao: string; // Formato ISO 8601: "YYYY-MM-DDTHH:mm:ss.sssZ"
  transcricao: string; // O texto completo da transcrição
  segments: TranscriptionSegment[]; // Array de segmentos da transcrição
}
