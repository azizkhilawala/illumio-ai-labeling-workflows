import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/design-system/icons';
import {
  slideoutVariants,
  overlayVariants,
  MOTION_CONFIG,
  useReducedMotion,
} from '@/design-system/utils/motion';
import './slideout.css';

type SlideoutSize = 'sm' | 'md' | 'lg' | 'xl';

type SlideoutTab = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  closable?: boolean;
};

type SlideoutAnchor = {
  id: string;
  label: string;
};

type SlideoutProps = {
  isOpen: boolean;
  onClose: () => void;
  size?: SlideoutSize;
  tabs?: SlideoutTab[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
  showTabNav?: boolean;
  onPrevTab?: () => void;
  onNextTab?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
  children: React.ReactNode;
  className?: string;
};

type SlideoutHeaderProps = {
  icon?: React.ReactNode;
  iconColor?: 'blue' | 'purple' | 'green' | 'orange';
  title: React.ReactNode;
  titleHref?: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

type SlideoutBodyProps = {
  anchors?: SlideoutAnchor[];
  activeAnchorId?: string;
  onAnchorChange?: (anchorId: string) => void;
  children: React.ReactNode;
};

type SlideoutSectionProps = {
  id?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
};

type SlideoutFooterProps = {
  split?: boolean;
  children: React.ReactNode;
};


export const Slideout: React.FC<SlideoutProps> = ({
  isOpen,
  onClose,
  size = 'md',
  tabs,
  activeTabId,
  onTabChange,
  onTabClose,
  showTabNav = false,
  onPrevTab,
  onNextTab,
  canPrev = false,
  canNext = false,
  children,
  className = '',
}) => {
  const reducedMotion = useReducedMotion();
  const transition = reducedMotion ? { duration: 0 } : MOTION_CONFIG.spring;
  const overlayTransition = reducedMotion ? { duration: 0 } : MOTION_CONFIG.overlay;

  // Handle escape key
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const slideoutClasses = [
    'ds-slideout',
    'ds-slideout--open',
    `ds-slideout--${size}`,
    className,
  ].filter(Boolean).join(' ');

  if (typeof document === 'undefined') {
    return null;
  }

  const content = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="ds-slideout-overlay ds-slideout-overlay--open"
            onClick={onClose}
            aria-hidden="true"
            initial={overlayVariants.hidden}
            animate={overlayVariants.visible}
            exit={overlayVariants.hidden}
            transition={overlayTransition}
          />
          <motion.div
            className={slideoutClasses}
            role="dialog"
            aria-modal="true"
            initial={slideoutVariants.hidden}
            animate={slideoutVariants.visible}
            exit={slideoutVariants.exit}
            transition={transition}
          >
            {/* Tab Bar */}
            {tabs && tabs.length > 0 && (
              <div className="ds-slideout__tab-bar">
                <button
                  type="button"
                  className="ds-slideout__tab-bar-close"
                  onClick={onClose}
                  aria-label="Close slideout"
                >
                  <Icon name="xmark" size={16} />
                </button>

                {showTabNav && (
                  <div className="ds-slideout__tab-bar-nav">
                    <button
                      type="button"
                      className="ds-slideout__tab-bar-nav-btn"
                      onClick={onPrevTab}
                      disabled={!canPrev}
                      aria-label="Previous tab"
                    >
                      <Icon name="chevron-left" size={16} />
                    </button>
                    <button
                      type="button"
                      className="ds-slideout__tab-bar-nav-btn"
                      onClick={onNextTab}
                      disabled={!canNext}
                      aria-label="Next tab"
                    >
                      <Icon name="chevron-right" size={16} />
                    </button>
                  </div>
                )}

                <div className="ds-slideout__tabs">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      className={`ds-slideout__tab ${activeTabId === tab.id ? 'ds-slideout__tab--active' : ''}`}
                      onClick={() => onTabChange?.(tab.id)}
                    >
                      {tab.icon && (
                        <span className="ds-slideout__tab-icon">{tab.icon}</span>
                      )}
                      <span className="ds-slideout__tab-label">{tab.label}</span>
                      {tab.closable !== false && (
                        <span
                          className="ds-slideout__tab-close"
                          onClick={(e) => {
                            e.stopPropagation();
                            onTabClose?.(tab.id);
                          }}
                          role="button"
                          aria-label={`Close ${tab.label} tab`}
                        >
                          <Icon name="xmark" size={10} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
};

export const SlideoutHeader: React.FC<SlideoutHeaderProps> = ({
  icon,
  iconColor = 'blue',
  title,
  titleHref,
  subtitle,
  actions,
}) => {
  return (
    <div className="ds-slideout__header">
      {icon && (
        <div className={`ds-slideout__header-icon ds-slideout__header-icon--${iconColor}`}>
          {icon}
        </div>
      )}
      <div className="ds-slideout__header-content">
        <h2 className="ds-slideout__header-title">
          {titleHref ? (
            <a href={titleHref} target="_blank" rel="noopener noreferrer">
              {title}
              <span className="ds-slideout__header-title-icon">
                <Icon name="arrow-up-right-from-square" size={14} />
              </span>
            </a>
          ) : (
            title
          )}
        </h2>
        {subtitle && (
          <p className="ds-slideout__header-subtitle">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="ds-slideout__header-actions">
          {actions}
        </div>
      )}
    </div>
  );
};

export const SlideoutBody: React.FC<SlideoutBodyProps> = ({
  anchors,
  activeAnchorId,
  onAnchorChange,
  children,
}) => {
  return (
    <div className="ds-slideout__body">
      {anchors && anchors.length > 0 && (
        <div className="ds-slideout__anchors">
          {anchors.map((anchor) => (
            <button
              key={anchor.id}
              type="button"
              className={`ds-slideout__anchor ${activeAnchorId === anchor.id ? 'ds-slideout__anchor--active' : ''}`}
              onClick={() => onAnchorChange?.(anchor.id)}
            >
              {anchor.label}
            </button>
          ))}
        </div>
      )}
      <div className="ds-slideout__content">
        {children}
      </div>
    </div>
  );
};

export const SlideoutSection: React.FC<SlideoutSectionProps> = ({
  id,
  title,
  description,
  children,
}) => {
  return (
    <div className="ds-slideout__section" id={id}>
      {title && (
        <h3 className="ds-slideout__section-title">{title}</h3>
      )}
      {description && (
        <p className="ds-slideout__section-description">{description}</p>
      )}
      <div className="ds-slideout__section-content">
        {children}
      </div>
    </div>
  );
};

export const SlideoutDivider: React.FC = () => {
  return <div className="ds-slideout__divider" />;
};

export const SlideoutFooter: React.FC<SlideoutFooterProps> = ({
  split = false,
  children,
}) => {
  return (
    <div className={`ds-slideout__footer ${split ? 'ds-slideout__footer--split' : ''}`}>
      {children}
    </div>
  );
};

export const SlideoutFooterGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="ds-slideout__footer-group">{children}</div>;
};

export type {
  SlideoutProps,
  SlideoutSize,
  SlideoutTab,
  SlideoutAnchor,
  SlideoutHeaderProps,
  SlideoutBodyProps,
  SlideoutSectionProps,
  SlideoutFooterProps,
};
