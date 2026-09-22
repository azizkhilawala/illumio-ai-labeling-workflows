import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Grid: React.FC<PillIconComponentProps> = ({
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
      <path d="M3.66667 4.08337V13.9167H14.3333V4.08337H3.66667ZM8.70334 13.0834H4.33334V11.6034H8.70334V13.0834ZM8.70334 10.9867H4.33334V9.60337H8.70334V10.9867ZM8.70334 8.98671H4.33334V7.59337H8.70334V8.98671ZM8.70334 6.98671H4.33334V5.58337H8.70334V6.98671ZM13.6667 13.0867H9.33334V11.6034H13.6667V13.0867ZM13.6667 10.99H9.33334V9.60337H13.6667V10.99ZM13.6667 8.99004H9.33334V7.59337H13.6667V8.99004ZM13.6667 6.99004H9.33334V5.58337H13.6667V6.99004Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('grid', Grid);
