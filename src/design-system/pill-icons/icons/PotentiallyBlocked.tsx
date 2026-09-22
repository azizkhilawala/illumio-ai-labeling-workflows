import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const PotentiallyBlocked: React.FC<PillIconComponentProps> = ({
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
      <path fillRule="evenodd" clipRule="evenodd" d="M11.4326 7.11633V8.60471H2.8V9.7954H11.4326V11.2838L15.6 9.20005L11.4326 7.11633Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('potentially-blocked', PotentiallyBlocked);
