import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Decrease: React.FC<PillIconComponentProps> = ({
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
<path d="M10.8872 12.5594L3.71167 5.2938L5.34218 3.66663L12.5078 10.9222L14.2883 9.13167V14.33L9.09669 14.3333L10.8872 12.5594Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('decrease', Decrease);
