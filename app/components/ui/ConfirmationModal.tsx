"use client";

import styles from './ConfirmationModal.module.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
  isConfirming?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onClose,
  isConfirming = false,
}: ConfirmationModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={styles.buttons}>
          <button onClick={onClose} className={styles.cancelButton} disabled={isConfirming}>
            {cancelText}
          </button>
          <button onClick={onConfirm} className={styles.confirmButton} disabled={isConfirming}>
            {isConfirming ? 'Confirmando...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
