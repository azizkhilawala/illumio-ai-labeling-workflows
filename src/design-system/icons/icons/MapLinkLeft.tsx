import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MapLinkLeft: React.FC<IconComponentProps> = ({
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
<path d="M2.8 9.20006L5.64444 11.8075V9.91117H15.6V8.48895H5.64444V6.59265L2.8 9.20006Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('map-link-left', MapLinkLeft);
