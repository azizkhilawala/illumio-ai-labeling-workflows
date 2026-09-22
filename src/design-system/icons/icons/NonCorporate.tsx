import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const NonCorporate: React.FC<IconComponentProps> = ({
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
<path d="M15.6 13.7714H2.79999L4.62856 11.7142H13.7714L15.6 13.7714Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M13.7714 4.62854H4.62857V11.0285H13.7714V4.62854ZM12.6286 5.7714H5.77143V9.88568H12.6286V5.7714Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('non-corporate', NonCorporate);
