import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Loading: React.FC<PillIconComponentProps> = ({
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
      <path fillRule="evenodd" clipRule="evenodd" d="M10.8604 7.26355V10.7364L14.3333 8.99998L10.8604 7.26355Z" fill={iconColor}/>
<path d="M10.8605 8.50391H3.66666V9.49615H10.8605V8.50391Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('loading', Loading);
