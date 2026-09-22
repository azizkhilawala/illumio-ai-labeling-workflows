import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Denylist: React.FC<PillIconComponentProps> = ({
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
<path d="M3.66666 3.66663V14.3333H14.3333V3.66663H3.66666ZM7.33332 12H5.99999V10.6666H7.33332V12ZM7.33332 9.66663H5.99999V8.33329H7.33332V9.66663ZM7.33332 7.33329H5.99999V5.99996H7.33332V7.33329ZM9.66666 12H8.33332V10.6666H9.66666V12ZM9.66666 9.66663H8.33332V8.33329H9.66666V9.66663ZM9.66666 7.33329H8.33332V5.99996H9.66666V7.33329ZM12 12H10.6667V10.6666H12V12ZM12 9.66663H10.6667V8.33329H12V9.66663ZM12 7.33329H10.6667V5.99996H12V7.33329Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('denylist', Denylist);
