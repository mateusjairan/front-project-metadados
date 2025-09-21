"use client";

import React, { useEffect, useState } from "react";
import { X, Clock, FileWarning } from "lucide-react";
import styles from "./video-confirmation-modal.module.css";

interface VideoConfirmationModalProps {
  isOpen: boolean;
  file: File | null;
  onConfirm: () => void;
  onClose: () => void;
}

export default function VideoConfirmationModal({
  isOpen,
  file,
  onConfirm,
  onClose,
}: VideoConfirmationModalProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isLoadingThumbnail, setIsLoadingThumbnail] = useState(false);

  useEffect(() => {
    if (isOpen && file) {
      setIsLoadingThumbnail(true);
      setThumbnailUrl(null); // Reset on new file
      const video = document.createElement("video");
      const url = URL.createObjectURL(file);
      video.src = url;
      video.muted = true;
      video.playsInline = true;

      const onLoadedData = () => {
        video.currentTime = 1; // Seek to 1s to get a frame
      };

      const onSeeked = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          setThumbnailUrl(canvas.toDataURL("image/jpeg"));
        }
        setIsLoadingThumbnail(false);
        URL.revokeObjectURL(url);
        video.removeEventListener("loadeddata", onLoadedData);
        video.removeEventListener("seeked", onSeeked);
      };

      const onError = () => {
        setIsLoadingThumbnail(false);
        URL.revokeObjectURL(url);
      };

      video.addEventListener("loadeddata", onLoadedData);
      video.addEventListener("seeked", onSeeked);
      video.addEventListener("error", onError);

      return () => {
        URL.revokeObjectURL(url);
        video.removeEventListener("loadeddata", onLoadedData);
        video.removeEventListener("seeked", onSeeked);
        video.removeEventListener("error", onError);
      };
    }
  }, [isOpen, file]);

  if (!isOpen || !file) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeIcon}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className={styles.modalHeader}>Confirmar o Upload</h2>
        <div className={styles.videoPreview}>
          {isLoadingThumbnail && (
            <div className={styles.thumbnailPlaceholder}>
              <Clock size={48} />
              <span>Gerando pré-visualização...</span>
            </div>
          )}
          {thumbnailUrl && !isLoadingThumbnail && (
            <img
              src={thumbnailUrl}
              alt="Video thumbnail"
              className={styles.videoThumbnail}
            />
          )}
          {!thumbnailUrl && !isLoadingThumbnail && (
            <div className={styles.thumbnailPlaceholder}>
              <FileWarning size={48} />
              <span>Pré-visualização indisponível</span>
            </div>
          )}
        </div>
        <p className={styles.fileName}>{file.name}</p>
        <p className={styles.confirmationText}>
          Este é o vídeo que deseja enviar?
        </p>
        <div className={styles.actionButtons}>
          <button
            className={`${styles.actionButtons} ${styles.secondaryButton}`}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className={`${styles.actionButtons} ${styles.primaryButton}`}
            onClick={onConfirm}
          >
            Confirmar e Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
