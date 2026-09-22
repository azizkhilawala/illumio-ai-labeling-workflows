import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const CollapseRole: React.FC<PillIconComponentProps> = ({
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
<path d="M4.7 3.66663L6.95 5.90663L7.99333 4.85996L7.99667 7.99663H4.87333L5.91667 6.93663L3.66667 4.69996L4.7 3.66663Z" fill={iconColor}/>
<path d="M13.3033 3.66663L11.05 5.90663L10.0067 4.85996L10.0033 7.99663H13.1267L12.0833 6.93663L14.3333 4.69996L13.3033 3.66663Z" fill={iconColor}/>
<path d="M4.7 14.3333L6.95 12.0933L7.99333 13.14L7.99667 10.0033H4.87333L5.91667 11.0633L3.66667 13.3L4.7 14.3333Z" fill={iconColor}/>
<path d="M13.3033 14.3333L11.05 12.0933L10.0067 13.14L10.0033 10.0033H13.1267L12.0833 11.0633L14.3333 13.3L13.3033 14.3333Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('collapse-role', CollapseRole);
