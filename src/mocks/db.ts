import type { Video } from '@/app/lib/types';

// Um "banco de dados" em memória para simular o armazenamento de vídeos.
// A utilização de `let` permite que os handlers modifiquem esta lista (adicionar, remover, atualizar).
export let videos: Video[] = [
  {
    id: 'b8e6a3a9-497d-44a7-8058-9a57cb99531d',
    nome_arquivo: 'video_institucional_empresa_X.mp4',
    duracao: 125.5,
    idioma: 'pt-BR',
    data_transcricao: '2024-07-29T10:00:00.000Z',
    transcricao: 'Bem-vindos à Empresa X. Nossa missão é inovar e liderar o mercado com soluções de alta tecnologia. Este vídeo demonstra nossos valores e nossa visão para o futuro.',
    segments: [
      { start: 0, end: 5, text: 'Bem-vindos à Empresa X.' },
      { start: 5.1, end: 12, text: 'Nossa missão é inovar e liderar o mercado com soluções de alta tecnologia.' },
      { start: 12.5, end: 18, text: 'Este vídeo demonstra nossos valores e nossa visão para o futuro.' },
    ],
  },
  {
    id: 'f4d3e2c1-b3a9-4a9b-9c8a-7d6e5f4d3c2b',
    nome_arquivo: 'tutorial_produto_novo_recurso.mp4',
    duracao: 320.0,
    idioma: 'pt-BR',
    data_transcricao: '2024-07-28T14:30:00.000Z',
    transcricao: 'Neste tutorial, vamos explorar o novo recurso de exportação. Primeiro, abra o menu de configurações. Em seguida, clique na opção "Exportar como PDF".',
    segments: [
      { start: 0, end: 6, text: 'Neste tutorial, vamos explorar o novo recurso de exportação.' },
      { start: 6.5, end: 10, text: 'Primeiro, abra o menu de configurações.' },
      { start: 10.2, end: 15, text: 'Em seguida, clique na opção "Exportar como PDF".' },
    ],
  },
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    nome_arquivo: 'reuniao_marketing_q3.webm',
    duracao: 1850.8,
    idioma: 'pt-BR',
    data_transcricao: '2024-07-27T18:45:00.000Z',
    transcricao: 'A pauta da reunião de hoje é o planejamento para o terceiro trimestre. As metas de marketing foram revistas e precisamos de novas estratégias para alcançar nosso público-alvo.',
    segments: [
      { start: 0, end: 7, text: 'A pauta da reunião de hoje é o planejamento para o terceiro trimestre.' },
      { start: 7.5, end: 15, text: 'As metas de marketing foram revistas e precisamos de novas estratégias para alcançar nosso público-alvo.' },
    ],
  },
  {
    id: '12345678-90ab-cdef-1234-567890abcdef',
    nome_arquivo: 'entrevista_ceo_podcast.mp3',
    duracao: 3600.0,
    idioma: 'en-US',
    data_transcricao: '2024-07-26T09:15:00.000Z',
    transcricao: 'In today\'s episode, we have the CEO of TechCorp. Thank you for joining us. Let\'s talk about the future of AI.',
    segments: [
      { start: 0, end: 5, text: 'In today\'s episode, we have the CEO of TechCorp.' },
      { start: 5.5, end: 8, text: 'Thank you for joining us.' },
      { start: 8.5, end: 12, text: 'Let\'s talk about the future of AI.' },
    ],
  },
];
