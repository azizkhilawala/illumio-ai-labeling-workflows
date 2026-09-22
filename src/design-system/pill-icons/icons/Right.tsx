import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Right: React.FC<PillIconComponentProps> = ({
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
      <path d="M10.5333 9.01996L6.64999 12.9066L8.07665 14.3333L13.39 9.01996L8.03665 3.66663L6.60999 5.09329L10.5333 9.01996Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('right', Right);
