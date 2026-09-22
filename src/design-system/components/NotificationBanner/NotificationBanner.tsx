import React from 'react';
import { Icon } from '@/design-system/icons';
import './notificationbanner.css';

type NotificationBannerStatus = 'info' | 'success' | 'warning' | 'error' | 'neutral' | 'readonly';

type NotificationBannerProps = {
  status?: NotificationBannerStatus;
  title?: string;
  description?: string;
  showTitle?: boolean;
  showDescription?: boolean;
  linkText?: string;
  linkHref?: string;
  onLinkClick?: () => void;
  buttonText?: string;
  onButtonClick?: () => void;
  showCloseButton?: boolean;
  onClose?: () => void;
  inlineLinkText?: string;
  inlineLinkHref?: string;
  onInlineLinkClick?: () => void;
  className?: string;
  children?: React.ReactNode;
};

const getStatusIcon = (status: NotificationBannerStatus) => {
  switch (status) {
    case 'success':
      return <Icon name="circle-check" size={20} />;
    case 'warning':
      return <Icon name="triangle-exclamation" size={20} />;
    case 'error':
      return <Icon name="circle-xmark" size={20} />;
    case 'readonly':
      return <Icon name="lock" size={20} />;
    case 'info':
    case 'neutral':
    default:
      return <Icon name="circle-information" size={20} />;
  }
};

export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  status = 'info',
  title,
  description,
  showTitle = true,
  showDescription = true,
  linkText,
  linkHref,
  onLinkClick,
  buttonText,
  onButtonClick,
  showCloseButton = true,
  onClose,
  inlineLinkText,
  inlineLinkHref,
  onInlineLinkClick,
  className = '',
  children,
}) => {
  const bannerClasses = [
    'ds-notification-banner',
    `ds-notification-banner--${status}`,
    className,
  ].filter(Boolean).join(' ');

  const hasActions = linkText || buttonText || showCloseButton;

  return (
    <div className={bannerClasses} role="alert">
      <div className="ds-notification-banner__content">
        <div className="ds-notification-banner__title-group">
          <span className="ds-notification-banner__icon" aria-hidden="true">
            {getStatusIcon(status)}
          </span>
          {showTitle && title && (
            <span className="ds-notification-banner__title">{title}</span>
          )}
        </div>
        {showDescription && description && (
          <span className="ds-notification-banner__description">{description}</span>
        )}
        {children}
        {inlineLinkText && (
          inlineLinkHref ? (
            <a href={inlineLinkHref} className="ds-notification-banner__inline-link">
              {inlineLinkText}
            </a>
          ) : (
            <button
              type="button"
              className="ds-notification-banner__inline-link"
              onClick={onInlineLinkClick}
            >
              {inlineLinkText}
            </button>
          )
        )}
      </div>

      {hasActions && (
        <div className="ds-notification-banner__actions">
          <div className="ds-notification-banner__buttons">
            {linkText && (
              linkHref ? (
                <a href={linkHref} className="ds-notification-banner__link">
                  {linkText}
                </a>
              ) : (
                <button
                  type="button"
                  className="ds-notification-banner__link"
                  onClick={onLinkClick}
                >
                  {linkText}
                </button>
              )
            )}
            {buttonText && onButtonClick && (
              <button
                type="button"
                className={status === 'readonly' ? 'ds-btn ds-btn--secondary-outlined ds-btn--xxs' : 'ds-btn ds-btn--primary ds-btn--xxs'}
                onClick={onButtonClick}
              >
                {buttonText}
              </button>
            )}
          </div>
          {showCloseButton && onClose && (
            <button
              type="button"
              className="ds-notification-banner__close"
              onClick={onClose}
              aria-label="Close notification"
            >
              <Icon name="xmark" size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export type { NotificationBannerProps, NotificationBannerStatus };
