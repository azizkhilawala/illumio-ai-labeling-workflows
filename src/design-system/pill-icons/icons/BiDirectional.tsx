import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const BiDirectional: React.FC<PillIconComponentProps> = ({
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
      <path d="M9.00001 1.88892L6.62964 6.62966H8.40742V11.3704H6.62964L9.00001 16.1111L11.3704 11.3704H9.5926V6.62966H11.3704L9.00001 1.88892Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('bi-directional', BiDirectional);
