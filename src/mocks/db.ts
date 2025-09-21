import { factory, primaryKey } from '@mswjs/data'

export const db = factory({
  video: {
    id: primaryKey(String),
    name: String,
    path: String,
    transcription: String,
    createdAt: String,
  },
})