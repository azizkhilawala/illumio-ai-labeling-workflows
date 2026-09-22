import React from 'react';
import './illustration.css';

export type IllustrationType =
  | 'empty-state'
  | 'success'
  | 'error'
  | 'warning'
  | 'search'
  | 'no-data';

export type IllustrationSize = 'sm' | 'md' | 'lg';

export interface IllustrationProps {
  type?: IllustrationType;
  size?: IllustrationSize;
  className?: string;
}

// Star SVG component for decorations
const Star = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={`ds-illustration__star ${className || ''}`} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" fill="currentColor"/>
  </svg>
);

// Empty State Illustration - matches Figma design
const EmptyStateIllustration = () => (
  <div className="ds-illustration__empty-state">
    {/* Background gradient ellipse */}
    <div className="ds-illustration__ellipse" />

    {/* Dashed circle ring */}
    <div className="ds-illustration__ring">
      {/* Center icon - chart/window */}
      <svg className="ds-illustration__icon" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M2 8H34" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="6" cy="5" r="1" fill="currentColor"/>
        <circle cx="10" cy="5" r="1" fill="currentColor"/>
        <circle cx="14" cy="5" r="1" fill="currentColor"/>
        <path d="M8 20L12 15L16 18L22 12L28 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>

    {/* Decorative stars */}
    <Star className="ds-illustration__star--1" />
    <Star className="ds-illustration__star--2" />
    <Star className="ds-illustration__star--3" />
    <Star className="ds-illustration__star--4" />
    <Star className="ds-illustration__star--5" />
    <Star className="ds-illustration__star--6" />
    <Star className="ds-illustration__star--7" />
    <Star className="ds-illustration__star--8" />
  </div>
);

// Success Illustration
const SuccessIllustration = () => (
  <div className="ds-illustration__success">
    <div className="ds-illustration__ellipse ds-illustration__ellipse--success" />
    <div className="ds-illustration__ring ds-illustration__ring--success">
      <svg className="ds-illustration__icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 16L14 22L24 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <Star className="ds-illustration__star--1" style={{ color: 'var(--lightning-green-300)' }} />
    <Star className="ds-illustration__star--2" style={{ color: 'var(--lightning-green-300)' }} />
    <Star className="ds-illustration__star--3" style={{ color: 'var(--lightning-green-200)' }} />
  </div>
);

// Error Illustration
const ErrorIllustration = () => (
  <div className="ds-illustration__error">
    <div className="ds-illustration__ellipse ds-illustration__ellipse--error" />
    <div className="ds-illustration__ring ds-illustration__ring--error">
      <svg className="ds-illustration__icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 10V18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="16" cy="23" r="1.5" fill="currentColor"/>
      </svg>
    </div>
  </div>
);

// Warning Illustration
const WarningIllustration = () => (
  <div className="ds-illustration__warning">
    <div className="ds-illustration__ellipse ds-illustration__ellipse--warning" />
    <div className="ds-illustration__ring ds-illustration__ring--warning">
      <svg className="ds-illustration__icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 10V18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="16" cy="23" r="1.5" fill="currentColor"/>
      </svg>
    </div>
  </div>
);

// Search/No Results Illustration
const SearchIllustration = () => (
  <div className="ds-illustration__search">
    <div className="ds-illustration__ellipse" />
    <div className="ds-illustration__ring">
      <svg className="ds-illustration__icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M20 20L26 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    </div>
    <Star className="ds-illustration__star--1" />
    <Star className="ds-illustration__star--2" />
  </div>
);

// No Data Illustration
const NoDataIllustration = () => (
  <div className="ds-illustration__no-data">
    <div className="ds-illustration__ellipse" />
    <div className="ds-illustration__ring">
      <svg className="ds-illustration__icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M4 12H28" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M10 18H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 22H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
    <Star className="ds-illustration__star--1" />
    <Star className="ds-illustration__star--3" />
  </div>
);

const illustrationMap: Record<IllustrationType, React.FC> = {
  'empty-state': EmptyStateIllustration,
  'success': SuccessIllustration,
  'error': ErrorIllustration,
  'warning': WarningIllustration,
  'search': SearchIllustration,
  'no-data': NoDataIllustration,
};

export const Illustration: React.FC<IllustrationProps> = ({
  type = 'empty-state',
  size = 'md',
  className = '',
}) => {
  const IllustrationComponent = illustrationMap[type];

  return (
    <div className={`ds-illustration ds-illustration--${size} ${className}`}>
      <IllustrationComponent />
    </div>
  );
};

// EmptyState compound component that includes illustration + text
export interface EmptyStateProps {
  illustration?: IllustrationType;
  title?: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
  onLinkClick?: () => void;
  size?: IllustrationSize;
  className?: string;
  children?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  illustration = 'empty-state',
  title = "You're all caught up!",
  description = "Great job! You've completed everything on your list.",
  linkText,
  linkHref,
  onLinkClick,
  size = 'md',
  className = '',
  children,
}) => {
  return (
    <div className={`ds-empty-state ds-empty-state--${size} ${className}`}>
      <Illustration type={illustration} size={size} />
      <div className="ds-empty-state__content">
        {title && <div className="ds-empty-state__title">{title}</div>}
        {description && <div className="ds-empty-state__description">{description}</div>}
        {linkText && (
          <a
            href={linkHref || '#'}
            className="ds-empty-state__link"
            onClick={onLinkClick}
          >
            {linkText}
          </a>
        )}
        {children}
      </div>
    </div>
  );
};
