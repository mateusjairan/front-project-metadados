import { factory, primaryKey } from '@mswjs/data'

// In-memory database for MSW.
// Using MSW's data modeling library for a more robust mock database.
export const db = factory({
  video: {
    id: primaryKey(String),
    nome: String,
    nome_arquivo: String,
    idioma: String,
    duracao: Number,
    data_transcricao: String,
    caminho_json: String,
    caminho_txt: String,
    // This is not in the original type, but useful for mocking
    transcription_segments: Array,
  },
})

// Seed the database with some initial data
const video1Id = 'a1b2c3d4-e5f6-7890-1234-567890abcdef'
db.video.create({
  id: video1Id,
  nome: 'Introdução ao React',
  nome_arquivo: 'intro-react.mp4',
  idioma: 'pt-BR',
  duracao: 624,
  data_transcricao: new Date('2023-10-26T10:00:00Z').toISOString(),
  caminho_json: `/api/mock-data/${video1Id}.json`,
  caminho_txt: `/api/mock-data/${video1Id}.txt`,
  transcription_segments: [
    { start: 0, end: 5, text: 'Olá e bem-vindo ao nosso curso de React.' },
    { start: 5, end: 10, text: 'Nesta aula, vamos cobrir os conceitos básicos.' },
  ],
})

const video2Id = 'b2c3d4e5-f6a7-8901-2345-67890abcdef1'
db.video.create({
  id: video2Id,
  nome: 'Next.js Avançado',
  nome_arquivo: 'advanced-nextjs.mp4',
  idioma: 'pt-BR',
  duracao: 1230,
  data_transcricao: new Date('2023-10-27T11:30:00Z').toISOString(),
  caminho_json: `/api/mock-data/${video2Id}.json`,
  caminho_txt: `/api/mock-data/${video2Id}.txt`,
  transcription_segments: [
    { start: 0, end: 4, text: 'Neste vídeo, vamos explorar funcionalidades avançadas do Next.js.' },
    { start: 4, end: 9, text: 'Falaremos sobre Server Components e data fetching.' },
  ],
})

const video3Id = 'c3d4e5f6-a7b8-9012-3456-7890abcdef2'
db.video.create({
  id: video3Id,
  nome: 'Teste de Software',
  nome_arquivo: 'software-testing.mp4',
  idioma: 'en-US',
  duracao: 845,
  data_transcricao: new Date('2023-10-28T14:00:00Z').toISOString(),
  caminho_json: `/api/mock-data/${video3Id}.json`,
  caminho_txt: `/api/mock-data/${video3Id}.txt`,
  transcription_segments: [
    { start: 0, end: 6, text: 'Software testing is a critical part of development.' },
    { start: 6, end: 12, text: 'Let us explore different types of tests.' },
  ],
})
