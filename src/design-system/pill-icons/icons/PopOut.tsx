import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const PopOut: React.FC<PillIconComponentProps> = ({
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
<path d="M12.5567 7.11338L5.29334 14.2867L3.66667 12.6567L10.92 5.49338L9.13334 3.71338H14.33L14.3333 8.90338L12.5567 7.11338Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('pop-out', PopOut);
