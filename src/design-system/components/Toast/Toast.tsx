"use client";

import React from 'react';
import { Toaster, toast as sonnerToast } from 'sonner';
import { Icon } from '@/design-system/icons';
import './toast.css';

type ToastType = 'loading' | 'success' | 'error' | 'warning' | 'info' | 'general';
type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

// ---------------------------------------------------------------------------
// Loading Spinner Component
// ---------------------------------------------------------------------------

const LoadingSpinner = () => (
  <div className="ds-toast__spinner" />
);

// ---------------------------------------------------------------------------
// Toast Provider (Sonner Toaster - uses custom rendering)
// ---------------------------------------------------------------------------

type ToastProviderProps = {
  children: React.ReactNode;
  position?: ToastPosition;
  duration?: number;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
  duration = 5000,
}) => {
  return (
    <>
      {children}
      <Toaster
        position={position}
        duration={duration}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: 'ds-toast-wrapper',
          },
        }}
      />
    </>
  );
};

// ---------------------------------------------------------------------------
// ToastContent Component (Used by custom sonner rendering)
// ---------------------------------------------------------------------------

type ToastContentProps = {
  type: ToastType;
  title: string;
  description?: string;
  linkText?: string;
  onLinkClick?: () => void;
  onClose: () => void;
};

const ToastContent: React.FC<ToastContentProps> = ({
  type,
  title,
  description,
  linkText,
  onLinkClick,
  onClose,
}) => {
  const renderIcon = () => {
    switch (type) {
      case 'loading':
        return (
          <div className="ds-toast__icon">
            <LoadingSpinner />
          </div>
        );
      case 'success':
        return (
          <div className="ds-toast__icon ds-toast__icon--success">
            <Icon name="circle-check" variant="solid" size={24} color="var(--lightning-green-600, #0C8727)" />
          </div>
        );
      case 'error':
        return (
          <div className="ds-toast__icon ds-toast__icon--error">
            <Icon name="circle-exclamation" variant="solid" size={24} color="var(--lightning-red-600, #C93734)" />
          </div>
        );
      case 'warning':
        return (
          <div className="ds-toast__icon ds-toast__icon--warning">
            <Icon name="circle-exclamation" variant="solid" size={24} color="var(--lightning-orange-500, #EE6F11)" />
          </div>
        );
      case 'info':
        return (
          <div className="ds-toast__icon ds-toast__icon--info">
            <Icon name="circle-exclamation" variant="solid" size={24} color="var(--lightning-blue-600, #2366ed)" />
          </div>
        );
      case 'general':
      default:
        return null;
    }
  };

  return (
    <div className="ds-toast" role="alert">
      {renderIcon()}
      <div className="ds-toast__content">
        <p className="ds-toast__title">{title}</p>
        {description && <p className="ds-toast__description">{description}</p>}
        {linkText && onLinkClick && (
          <button type="button" className="ds-toast__link" onClick={onLinkClick}>
            {linkText}
          </button>
        )}
      </div>
      <button
        type="button"
        className="ds-toast__close"
        onClick={onClose}
        aria-label="Close"
      >
        <Icon name="xmark" size={16} color="var(--lightning-bluegray-500, #8499AB)" />
      </button>
    </div>
  );
};

// ---------------------------------------------------------------------------
// useToast Hook (Wrapper around Sonner's toast API with custom rendering)
// ---------------------------------------------------------------------------

type ToastOptions = {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
  onAutoClose?: () => void;
};

// Custom toast renderer that uses our Toast component design
const renderCustomToast = (
  type: ToastType,
  title: string,
  options?: ToastOptions
) => {
  return sonnerToast.custom(
    (toastId) => (
      <ToastContent
        type={type}
        title={title}
        description={options?.description}
        linkText={options?.action?.label}
        onLinkClick={() => {
          options?.action?.onClick();
          sonnerToast.dismiss(toastId);
        }}
        onClose={() => sonnerToast.dismiss(toastId)}
      />
    ),
    {
      duration: options?.duration,
      onDismiss: options?.onDismiss,
      onAutoClose: options?.onAutoClose,
    }
  );
};

export const useToast = () => {
  return {
    // Convenience methods using custom rendering
    success: (message: string, options?: ToastOptions) => renderCustomToast('success', message, options),
    error: (message: string, options?: ToastOptions) => renderCustomToast('error', message, options),
    warning: (message: string, options?: ToastOptions) => renderCustomToast('warning', message, options),
    info: (message: string, options?: ToastOptions) => renderCustomToast('info', message, options),
    loading: (message: string, options?: ToastOptions) => renderCustomToast('loading', message, options),
    general: (message: string, options?: ToastOptions) => renderCustomToast('general', message, options),

    // Sonner's promise helper for async operations
    promise: sonnerToast.promise,

    // Dismiss helpers
    dismiss: sonnerToast.dismiss,
    dismissAll: () => sonnerToast.dismiss(),

    // Custom toast (for fully custom JSX)
    custom: sonnerToast.custom,
  };
};

// ---------------------------------------------------------------------------
// Standalone Toast Component (for custom rendering)
// ---------------------------------------------------------------------------

type ToastProps = {
  type?: ToastType;
  title?: string;
  description?: string;
  linkText?: string;
  onLinkClick?: () => void;
  onClose?: () => void;
  showIcon?: boolean;
  showCloseButton?: boolean;
  icon?: React.ReactNode;
  className?: string;
};

export const Toast: React.FC<ToastProps> = ({
  type = 'general',
  title,
  description,
  linkText,
  onLinkClick,
  onClose,
  showIcon = true,
  showCloseButton = true,
  icon,
  className = '',
}) => {
  const renderIcon = () => {
    if (!showIcon) return null;

    if (icon) {
      return <div className="ds-toast__icon">{icon}</div>;
    }

    switch (type) {
      case 'loading':
        return (
          <div className="ds-toast__icon">
            <LoadingSpinner />
          </div>
        );
      case 'success':
        return (
          <div className="ds-toast__icon ds-toast__icon--success">
            <Icon name="circle-check" variant="solid" size={24} color="var(--lightning-green-600, #0C8727)" />
          </div>
        );
      case 'error':
        return (
          <div className="ds-toast__icon ds-toast__icon--error">
            <Icon name="circle-exclamation" variant="solid" size={24} color="var(--lightning-red-600, #C93734)" />
          </div>
        );
      case 'warning':
        return (
          <div className="ds-toast__icon ds-toast__icon--warning">
            <Icon name="circle-exclamation" variant="solid" size={24} color="var(--lightning-orange-500, #EE6F11)" />
          </div>
        );
      case 'info':
        return (
          <div className="ds-toast__icon ds-toast__icon--info">
            <Icon name="circle-exclamation" variant="solid" size={24} color="var(--lightning-blue-600, #2366ed)" />
          </div>
        );
      case 'general':
      default:
        return null;
    }
  };

  const toastClasses = [
    'ds-toast',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={toastClasses} role="alert">
      {renderIcon()}
      <div className="ds-toast__content">
        {title && <p className="ds-toast__title">{title}</p>}
        {description && <p className="ds-toast__description">{description}</p>}
        {linkText && (
          <button type="button" className="ds-toast__link" onClick={onLinkClick}>
            {linkText}
          </button>
        )}
      </div>
      {showCloseButton && onClose && (
        <button
          type="button"
          className="ds-toast__close"
          onClick={onClose}
          aria-label="Close"
        >
          <Icon name="xmark" size={16} color="var(--lightning-bluegray-500, #8499AB)" />
        </button>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Direct toast API (for use without hook)
// ---------------------------------------------------------------------------

export const toast = {
  success: (message: string, options?: ToastOptions) => renderCustomToast('success', message, options),
  error: (message: string, options?: ToastOptions) => renderCustomToast('error', message, options),
  warning: (message: string, options?: ToastOptions) => renderCustomToast('warning', message, options),
  info: (message: string, options?: ToastOptions) => renderCustomToast('info', message, options),
  loading: (message: string, options?: ToastOptions) => renderCustomToast('loading', message, options),
  message: (message: string, options?: ToastOptions) => renderCustomToast('general', message, options),
  promise: sonnerToast.promise,
  dismiss: sonnerToast.dismiss,
  custom: sonnerToast.custom,
};

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { ToastProps, ToastType, ToastPosition, ToastOptions, ToastProviderProps };
