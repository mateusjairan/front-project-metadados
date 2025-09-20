export interface Video {
  id: string;
  nome: string;
  nome_arquivo: string;
  idioma: string;
  duracao: number; // Assuming duration is in seconds
  data_transcricao: string; // Assuming ISO date string
  caminho_json: string;
  caminho_txt: string;
}
