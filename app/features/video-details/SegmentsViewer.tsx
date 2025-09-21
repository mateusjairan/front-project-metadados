"use client";

import { useState, useMemo } from 'react';
import type { Segment } from '@/app/lib/types';
import { formatDuration } from '@/app/lib/utils';
import styles from './SegmentsViewer.module.css';

interface SegmentsViewerProps {
  segmentsJson: string;
}

export default function SegmentsViewer({ segmentsJson }: SegmentsViewerProps) {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  const segments = useMemo(() => {
    try {
      // The data can be a stringified array or a direct array in some mock cases.
      const parsed = JSON.parse(segmentsJson);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      // It might not be a JSON string but a plain string, which is not valid.
      console.error("Failed to parse segments JSON:", error);
      return [];
    }
  }, [segmentsJson]);

  if (segments.length === 0) {
    return (
      <div className={styles.container}>
        <h2>Segmentos da Transcrição</h2>
        <p className={styles.emptyText}>Nenhum segmento de transcrição disponível.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Segmentos da Transcrição</h2>
      <div className={styles.segmentsList}>
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`${styles.segment} ${activeSegment === index ? styles.active : ''}`}
            onClick={() => setActiveSegment(index)}
          >
            <div className={styles.timestamp}>
              [{formatDuration(segment.start)}]
            </div>
            <div className={styles.text}>{segment.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
