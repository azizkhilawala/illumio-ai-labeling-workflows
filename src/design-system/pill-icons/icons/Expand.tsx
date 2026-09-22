import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Expand: React.FC<PillIconComponentProps> = ({
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
      <path d="M4.49834 9.88996L9.14501 14.3333L13.5983 9.69663L12.3583 8.50996L9.09501 11.91L5.68834 8.66663L4.49834 9.88996ZM4.40167 5.04996L9.04167 9.49329L13.495 4.85663L12.255 3.66663L8.99167 7.06663L5.58501 3.80996L4.40167 5.04996Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('expand', Expand);
