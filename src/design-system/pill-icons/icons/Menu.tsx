import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Menu: React.FC<PillIconComponentProps> = ({
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
      <path d="M3.66667 4.5H14.3333V6.16667H3.66667V4.5Z" fill={iconColor}/>
<path d="M3.66667 8.16663H14.3333V9.83329H3.66667V8.16663Z" fill={iconColor}/>
<path d="M3.66667 11.8334H14.3333V13.5H3.66667V11.8334Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('menu', Menu);
