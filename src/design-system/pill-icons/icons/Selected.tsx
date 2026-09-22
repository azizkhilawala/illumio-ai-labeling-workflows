import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Selected: React.FC<PillIconComponentProps> = ({
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
      <path d="M9.2 15.6C12.7346 15.6 15.6 12.7347 15.6 9.20005C15.6 5.66543 12.7346 2.80005 9.2 2.80005C5.66538 2.80005 2.8 5.66543 2.8 9.20005C2.8 12.7347 5.66538 15.6 9.2 15.6Z" fill={iconColor}/>
<path d="M4.8 8.80005L8.4 12.4L14.4 6.40005L12.8 4.80005L8.4 9.20005L6.4 7.20005L4.8 8.80005Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('selected', Selected);
