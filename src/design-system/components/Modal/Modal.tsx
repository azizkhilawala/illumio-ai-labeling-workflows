import React, { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/design-system/icons';
import {
  modalVariants,
  overlayVariants,
  MOTION_CONFIG,
  useReducedMotion,
} from '@/design-system/utils/motion';
import './modal.css';

type ModalSize = 'small' | 'medium' | 'large' | 'xlarge';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
  className?: string;
};

type ModalHeaderProps = {
  title: string;
  subtitle?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
};

type ModalBodyProps = {
  children: React.ReactNode;
  className?: string;
};

type ModalFooterProps = {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right' | 'space-between';
  className?: string;
};

type ModalSlotProps = {
  children: React.ReactNode;
  className?: string;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  size = 'medium',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children,
  className = '',
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const reducedMotion = useReducedMotion();
  const transition = reducedMotion ? { duration: 0 } : MOTION_CONFIG.spring;
  const overlayTransition = reducedMotion ? { duration: 0 } : MOTION_CONFIG.overlay;

  // Handle SSR - only render portal after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (closeOnEscape && e.key === 'Escape') {
      onClose();
    }
  }, [closeOnEscape, onClose]);

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Add/remove event listeners and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  const modalClasses = [
    'ds-modal',
    `ds-modal--${size}`,
    className,
  ].filter(Boolean).join(' ');

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="ds-modal-overlay"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          initial={overlayVariants.hidden}
          animate={overlayVariants.visible}
          exit={overlayVariants.hidden}
          transition={overlayTransition}
        >
          <motion.div
            className={modalClasses}
            initial={modalVariants.hidden}
            animate={modalVariants.visible}
            exit={modalVariants.exit}
            transition={transition}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Don't render portal until mounted (SSR safety)
  if (!isMounted) {
    return null;
  }

  // Render to portal
  return createPortal(modalContent, document.body);
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  subtitle,
  onClose,
  showCloseButton = true,
  className = '',
}) => {
  const headerClasses = [
    'ds-modal__header',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={headerClasses}>
      <div className="ds-modal__header-content">
        <h2 className="ds-modal__title">{title}</h2>
        {subtitle && <p className="ds-modal__subtitle">{subtitle}</p>}
      </div>
      {showCloseButton && onClose && (
        <button
          type="button"
          className="ds-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon name="xmark" size={16} />
        </button>
      )}
    </div>
  );
};

export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className = '',
}) => {
  const bodyClasses = [
    'ds-modal__body',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={bodyClasses}>
      {children}
    </div>
  );
};

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  align = 'right',
  className = '',
}) => {
  const footerClasses = [
    'ds-modal__footer',
    align === 'left' ? 'ds-modal__footer--left' : '',
    align === 'center' ? 'ds-modal__footer--center' : '',
    align === 'space-between' ? 'ds-modal__footer--space-between' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={footerClasses}>
      {children}
    </div>
  );
};

export const ModalSlot: React.FC<ModalSlotProps> = ({
  children,
  className = '',
}) => {
  const slotClasses = [
    'ds-modal__slot',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={slotClasses}>
      {children}
    </div>
  );
};

export type { ModalProps, ModalSize, ModalHeaderProps, ModalBodyProps, ModalFooterProps, ModalSlotProps };
