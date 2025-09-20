"use client";

import React, { useEffect, useState } from "react";

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
        // Seek to a point in the video to capture a frame. 1s is a good default.
        video.currentTime = 1;
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
        // Clean up listeners
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-icon" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h2 className="modal-header">Confirmar o Upload</h2>
        <div className="video-preview">
          {isLoadingThumbnail && (
            <div className="thumbnail-placeholder">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Generating preview...</span>
            </div>
          )}
          {thumbnailUrl && !isLoadingThumbnail && (
            <img
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="video-thumbnail"
            />
          )}
          {!thumbnailUrl && !isLoadingThumbnail && (
            <div className="thumbnail-placeholder">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="10" y1="15" x2="10" y2="9" />
                <polyline points="13 12 10 9 7 12" />
              </svg>
              <span>Preview unavailable</span>
            </div>
          )}
        </div>
        <p className="file-name">{file.name}</p>
        <p className="confirmation-text">
          Esse é o video que deseja enviar?
        </p>
        <div className="action-buttons">
          <button className="secondary-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="primary-button" onClick={onConfirm}>
            Confirmar e Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
