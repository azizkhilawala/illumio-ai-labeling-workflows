import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Close: React.FC<PillIconComponentProps> = ({
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
      <g >
<path d="M14.3333 5.40996L12.59 3.66663L9 7.25663L5.41 3.66663L3.66667 5.40996L7.25667 8.99996L3.66667 12.59L5.41 14.3333L9 10.7433L12.59 14.3333L14.3333 12.59L10.7433 8.99996L14.3333 5.40996Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('close', Close);
