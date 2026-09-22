import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const PotentiallyBlocked: React.FC<IconComponentProps> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={`ds-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'linear' && (
        <><circle cx="9" cy="9" r="9" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M11.4326 7.11633V8.60471H2.8V9.7954H11.4326V11.2838L15.6 9.20005L11.4326 7.11633Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('potentially-blocked', PotentiallyBlocked);
