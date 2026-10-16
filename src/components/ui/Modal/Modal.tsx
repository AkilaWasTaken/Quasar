import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useModalDialog } from '../../../hooks'
import './Modal.css'

interface ModalProps {
  onClose: () => void
  labelledBy: string
  className?: string
  children: ReactNode
}

export const Modal = ({ onClose, labelledBy, className = '', children }: ModalProps) => {
  const dialogRef = useModalDialog(onClose)

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        className={`modal-card ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Închide detaliile">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {children}
      </div>
    </div>,
    document.body
  )
}
