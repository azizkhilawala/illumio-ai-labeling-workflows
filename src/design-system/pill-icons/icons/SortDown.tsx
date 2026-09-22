import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const SortDown: React.FC<PillIconComponentProps> = ({
  size = 18,
  bgColor = 'var(--lightning-bluegray-600)',
  iconColor = 'var(--lightning-contrast-white)',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={`ds-pill-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="9" cy="9" r="9" fill={bgColor} />
      {/* Icon content */}
      <path d="M14.3333 6.96167L9 13.0383L3.66666 6.96167H14.3333Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('sort-down', SortDown);
