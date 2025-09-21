export interface Segment {
  start: number;
  end: number;
  text: string;
}

export interface Video {
  id: number;
  nome: string | null;
  dados: string; // JSON string de Segment[]
  nome_arquivo: string;
  caminho_audio: string | null;
  caminho_txt: string | null;
  caminho_json: string | null;
  texto: string;
  idioma: string;
  duracao: number;
  data_transcricao: string; // Formato ISO (ex: "2023-10-27T10:00:00")
}
