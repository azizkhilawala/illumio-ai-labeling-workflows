import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const GrabHandle: React.FC<PillIconComponentProps> = ({
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
      <path d="M8.40667 3.66663H6.63V5.44329H8.40667V3.66663Z" fill={iconColor}/>
<path d="M11.3701 3.66663H9.59338V5.44329H11.3701V3.66663Z" fill={iconColor}/>
<path d="M8.40667 6.63H6.63V8.40667H8.40667V6.63Z" fill={iconColor}/>
<path d="M11.3701 6.63H9.59338V8.40667H11.3701V6.63Z" fill={iconColor}/>
<path d="M8.40667 9.59326H6.63V11.3699H8.40667V9.59326Z" fill={iconColor}/>
<path d="M11.3701 9.59326H9.59338V11.3699H11.3701V9.59326Z" fill={iconColor}/>
<path d="M8.40667 12.5566H6.63V14.3333H8.40667V12.5566Z" fill={iconColor}/>
<path d="M11.3701 12.5566H9.59338V14.3333H11.3701V12.5566Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('grab-handle', GrabHandle);
