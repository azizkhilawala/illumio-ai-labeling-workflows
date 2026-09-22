import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@/design-system/icons';
import './tooltip.css';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
type TooltipVariant = 'default' | 'warning';

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: TooltipPosition;
  variant?: TooltipVariant;
  showArrow?: boolean;
  delay?: number;
  className?: string;
  usePortal?: boolean;
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  variant = 'default',
  showArrow = true,
  delay = 0,
  className = '',
  usePortal = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [portalPosition, setPortalPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updatePortalPosition = useCallback(() => {
    if (!triggerRef.current || !usePortal) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipWidth = tooltipRef.current?.offsetWidth || 320;
    const tooltipHeight = tooltipRef.current?.offsetHeight || 100;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipHeight - 8;
        left = triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + 8;
        left = triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2;
        break;
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - tooltipHeight / 2;
        left = triggerRect.left - tooltipWidth - 8;
        break;
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - tooltipHeight / 2;
        left = triggerRect.right + 8;
        break;
    }

    // Keep tooltip within viewport
    left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));
    top = Math.max(8, top);

    setPortalPosition({ top, left });
  }, [position, usePortal]);

  const showTooltip = useCallback(() => {
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        if (usePortal) updatePortalPosition();
      }, delay);
    } else {
      setIsVisible(true);
      if (usePortal) updatePortalPosition();
    }
  }, [delay, usePortal, updatePortalPosition]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (isVisible && usePortal) {
      updatePortalPosition();
    }
  }, [isVisible, usePortal, updatePortalPosition]);

  const tooltipClasses = [
    'ds-tooltip',
    usePortal ? 'ds-tooltip--portal' : `ds-tooltip--${position}`,
    variant === 'warning' ? 'ds-tooltip--warning' : '',
    !showArrow ? 'ds-tooltip--no-arrow' : '',
    isVisible ? 'ds-tooltip--visible' : '',
    className,
  ].filter(Boolean).join(' ');

  const renderContent = () => {
    if (variant === 'warning') {
      return (
        <div className="ds-tooltip__content">
          <span className="ds-tooltip__icon">
            <Icon name="triangle-exclamation" size={16} />
          </span>
          <span className="ds-tooltip__text">{content}</span>
        </div>
      );
    }
    return <div className="ds-tooltip__content">{content}</div>;
  };

  const tooltipElement = (
    <div
      ref={tooltipRef}
      className={tooltipClasses}
      role="tooltip"
      aria-hidden={!isVisible}
      style={usePortal ? { position: 'fixed', top: portalPosition.top, left: portalPosition.left } : undefined}
    >
      {renderContent()}
      {showArrow && !usePortal && <div className="ds-tooltip__arrow" />}
    </div>
  );

  return (
    <div
      ref={triggerRef}
      className="ds-tooltip-wrapper"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {usePortal && typeof document !== 'undefined'
        ? createPortal(tooltipElement, document.body)
        : tooltipElement}
    </div>
  );
};

export type { TooltipProps, TooltipPosition, TooltipVariant };
