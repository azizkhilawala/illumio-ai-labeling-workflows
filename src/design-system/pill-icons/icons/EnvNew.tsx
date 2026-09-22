import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const EnvNew: React.FC<PillIconComponentProps> = ({
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
      <path d="M7.4 4.19995H5.26666C4.67756 4.19995 4.2 4.67751 4.2 5.26662V7.39995M7.4 13.8H5.26666C4.67756 13.8 4.2 13.3224 4.2 12.7333V10.6M10.6 4.19995H12.7333C13.3224 4.19995 13.8 4.67751 13.8 5.26662V7.39995M13.8 10.6V12.7333C13.8 13.3224 13.3224 13.8 12.7333 13.8H10.6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
};

registerPillIcon('env-new', EnvNew);
