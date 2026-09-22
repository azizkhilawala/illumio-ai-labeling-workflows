import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Role: React.FC<PillIconComponentProps> = ({
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
      <path d="M3.60126 2.80005V11.998C3.60126 11.998 5.29687 15.5972 9.19999 15.5972C10.3878 15.6344 11.559 15.3103 12.5587 14.6677C13.5584 14.025 14.3395 13.0941 14.7987 11.998V2.80005H3.60126ZM10.7996 12.3979H6.80054V5.19951H8.40017V10.7982H10.7996V12.3979ZM12.3993 7.59897H9.99981V5.19951H12.3993V7.59897Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('role', Role);
