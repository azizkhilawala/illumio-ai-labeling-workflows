import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Critical: React.FC<PillIconComponentProps> = ({
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
<path d="M11.21 3.66663H6.79L3.66667 6.78996V11.21L6.79 14.3333H11.21L14.3333 11.21V6.78996L11.21 3.66663ZM8.29 6.05996H9.70667V9.36663H8.29V6.05996ZM9 11.94C8.8398 11.94 8.6832 11.8925 8.54999 11.8034C8.41679 11.7144 8.31297 11.5879 8.25166 11.4399C8.19036 11.2919 8.17431 11.1291 8.20557 10.9719C8.23682 10.8148 8.31397 10.6705 8.42725 10.5572C8.54053 10.4439 8.68486 10.3668 8.84198 10.3355C8.99911 10.3043 9.16197 10.3203 9.30998 10.3816C9.45799 10.4429 9.58449 10.5467 9.6735 10.6799C9.7625 10.8132 9.81 10.9698 9.81 11.13C9.81 11.3448 9.72467 11.5508 9.57276 11.7027C9.42086 11.8546 9.21483 11.94 9 11.94Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('critical', Critical);
