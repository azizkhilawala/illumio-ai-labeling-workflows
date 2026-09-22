import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Provision: React.FC<PillIconComponentProps> = ({
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
<path d="M12.8533 10.3333V12.8533H5.14999V10.3333H3.66666V14.3333H14.3333V10.3333H12.8533Z" fill={iconColor}/>
<path d="M10.1099 6.76663V11.1333H7.90328V6.76663H5.87994L8.99661 3.66663L12.1233 6.76663H10.1099Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('provision', Provision);
