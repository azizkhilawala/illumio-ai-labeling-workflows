import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const PopIn: React.FC<PillIconComponentProps> = ({
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
<path d="M10.885 12.5566L3.715 5.29329L5.34166 3.66663L12.505 10.92L14.285 9.13329V14.33L9.095 14.3333L10.885 12.5566Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('pop-in', PopIn);
