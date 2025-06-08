// Mock data para demonstração
const mockTranscription = [
  { start: 0.0, end: 3.0, text: "Seja bem-vindo à plataforma." },
  { start: 3.1, end: 6.0, text: "Aqui você pode carregar vídeos e ver a transcrição." },
  { start: 6.1, end: 9.5, text: "Clique em qualquer trecho da transcrição para navegar." },
  { start: 9.6, end: 13.2, text: "A transcrição é sincronizada com o vídeo em tempo real." },
  { start: 13.3, end: 17.0, text: "Esta tecnologia pode ser usada para conteúdo educacional e acessibilidade." },
  { start: 17.1, end: 21.5, text: "A transcrição é gerada automaticamente e inclui timestamps precisos." },
  { start: 21.6, end: 25.0, text: "Você pode pausar o vídeo a qualquer momento e continuar a leitura." },
  { start: 25.1, end: 30.0, text: "Obrigado por usar nossa plataforma de transcrição de vídeos." },
]

/**
 * Função para obter a transcrição de um vídeo
 * @param {File} videoFile - O arquivo de vídeo para transcrição
 * @returns {Promise<Array>} - Promise com os segmentos de transcrição
 */
export async function getTranscription(videoFile) {
  // Simular delay da API
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Em produção, você faria algo como:
  // const formData = new FormData();
  // formData.append('file', videoFile);
  // formData.append('model', 'whisper-1');
  // formData.append('language', 'pt');
  // formData.append('response_format', 'verbose_json');

  // const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
  //   },
  //   body: formData
  // });

  // const data = await response.json();
  // return data.segments;

  // Para integração com a API do GitHub mencionada:
  // const response = await fetch('https://github.com/MetadadosPy/manipulacao_metadados/tree/master', {
  //   method: 'GET',
  //   headers: {
  //     'Accept': 'application/json',
  //   }
  // });
  // const data = await response.json();
  // return data;

  return mockTranscription
}
