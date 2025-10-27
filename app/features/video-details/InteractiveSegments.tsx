"use client";

import { useState } from 'react';
import type { TranscriptionSegment } from '@/app/lib/types';
import styles from './InteractiveSegments.module.css';

interface InteractiveSegmentsProps {
  segments: TranscriptionSegment[];
}

// Helper para formatar o timestamp
const formatTimestamp = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(14, 5); // Formato MM:SS
};

export function InteractiveSegments({ segments }: InteractiveSegmentsProps) {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  if (!segments || segments.length === 0) {
    return <p>Não há segmentos de transcrição para exibir.</p>;
  }

  return (
    <div className={styles.container}>
      <h3>Segmentos Interativos</h3>
      <div className={styles.segmentsWrapper}>
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`${styles.segment} ${activeSegment === index ? styles.active : ''}`}
            onClick={() => setActiveSegment(index)}
          >
            <span className={styles.timestamp}>
              [{formatTimestamp(segment.start)} - {formatTimestamp(segment.end)}]
            </span>
            <p className={styles.text}>{segment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
