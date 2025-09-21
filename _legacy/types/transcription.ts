export interface TranscriptionSegment {
  start: number
  end: number
  text: string
}

export interface TranscriptionResponse {
  segments: TranscriptionSegment[]
  language?: string
  duration?: number
}
