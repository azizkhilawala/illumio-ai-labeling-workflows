import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const App: React.FC<PillIconComponentProps> = ({
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
<path d="M9.4 8.81951L10.7973 11.3511H8.10222L9.4 8.81951ZM8.68889 3.32617H10.1111L15.0889 13.4737H12.8702L9.368 6.50128L5.86578 13.4737H3.71111L8.68889 3.32617Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('app', App);
