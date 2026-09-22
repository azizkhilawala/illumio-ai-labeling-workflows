import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MapLink: React.FC<IconComponentProps> = ({
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
<path d="M2.8 8.48895V9.91117H12.7556V11.8075L15.6 9.20006L12.7556 6.59265V8.48895H2.8Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('map-link', MapLink);
