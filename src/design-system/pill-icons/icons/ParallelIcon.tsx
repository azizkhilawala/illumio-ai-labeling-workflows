import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const ParallelIcon: React.FC<PillIconComponentProps> = ({
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
      <path d="M3.96364 4.54541H2.8V13.8545H3.96364V4.54541Z" fill={iconColor}/>
<path d="M15.6 4.54541H14.4364V13.8545H15.6V4.54541Z" fill={iconColor}/>
<path d="M9.78182 4.54541H8.61819V13.8545H9.78182V4.54541Z" fill={iconColor}/>
<path d="M3.38182 4.54541L15.0182 9.19996" stroke="white"/>
<path d="M3.38182 9.19995L9.2 6.87268H15.0182" stroke="white"/>
<path d="M3.38182 11.5272L9.2 9.19995L15.0182 13.8545" stroke="white"/>
<path d="M3.38182 13.8545L15.0182 4.54541" stroke="white"/>
    </svg>
  );
};

registerPillIcon('parallel-icon', ParallelIcon);
