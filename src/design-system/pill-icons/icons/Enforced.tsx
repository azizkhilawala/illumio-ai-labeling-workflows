import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Enforced: React.FC<PillIconComponentProps> = ({
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
      <path d="M9 3.66663C7.73 4.81996 4.33333 4.81996 4.33333 4.81996L4.36333 9.96663C4.36333 9.96663 5.07999 12.74 9 14.3333C12.92 12.74 13.6367 9.96996 13.6367 9.96996L13.6667 4.81996C13.6667 4.81996 10.27 4.81996 9 3.66663Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('enforced', Enforced);
