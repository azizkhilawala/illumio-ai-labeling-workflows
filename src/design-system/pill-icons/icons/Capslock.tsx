import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Capslock: React.FC<PillIconComponentProps> = ({
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
<path d="M11.6667 3.66663H6.33334C5.62609 3.66663 4.94782 3.94758 4.44772 4.44767C3.94762 4.94777 3.66667 5.62605 3.66667 6.33329L3.66667 11.6666C3.66667 12.3739 3.94762 13.0521 4.44772 13.5522C4.94782 14.0523 5.62609 14.3333 6.33334 14.3333H11.6667C12.3739 14.3333 13.0522 14.0523 13.5523 13.5522C14.0524 13.0521 14.3333 12.3739 14.3333 11.6666V6.33329C14.3333 5.62605 14.0524 4.94777 13.5523 4.44767C13.0522 3.94758 12.3739 3.66663 11.6667 3.66663V3.66663ZM10.3333 12.86H7.75334V11.93H10.3333V12.86ZM10.3333 7.37996V10.7466H7.75334V7.37996H5.92667L9.04001 4.74663L12.15 7.37996H10.3333Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('capslock', Capslock);
