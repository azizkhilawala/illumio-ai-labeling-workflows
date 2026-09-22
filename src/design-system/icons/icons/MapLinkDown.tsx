import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MapLinkDown: React.FC<IconComponentProps> = ({
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
<path d="M8.66667 2.80005V10.2667H6.53333L9.2 15.6L11.8667 10.2667H9.73333V2.80005H8.66667Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('map-link-down', MapLinkDown);
