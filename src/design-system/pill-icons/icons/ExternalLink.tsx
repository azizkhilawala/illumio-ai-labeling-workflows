import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const ExternalLink: React.FC<PillIconComponentProps> = ({
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
<path d="M13.0533 8.99996V13.0533H4.94666V4.94663H8.99999V3.66663H3.66666V14.3333H14.3333V8.99996H13.0533Z" fill={iconColor}/>
<path d="M7.6233 11.28L12.8133 6.10336L14.3066 7.62336L14.2833 3.69336L10.3766 3.70669L11.9233 5.21336L6.71997 10.3767L7.6233 11.28Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('external-link', ExternalLink);
