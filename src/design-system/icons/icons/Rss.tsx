import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Rss: React.FC<IconComponentProps> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`ds-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'linear' && (
        <><path d="M4 11C6.38695 11 8.67613 11.9482 10.364 13.636C12.0518 15.3239 13 17.6131 13 20M4 4C8.24346 4 12.3131 5.68571 15.3137 8.68629C18.3143 11.6869 20 15.7565 20 20M6 19C6 19.5523 5.55228 20 5 20C4.44772 20 4 19.5523 4 19C4 18.4477 4.44772 18 5 18C5.55228 18 6 18.4477 6 19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3 4C3 3.44772 3.44772 3 4 3C8.50868 3 12.8327 4.79107 16.0208 7.97919C19.2089 11.1673 21 15.4913 21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 16.0218 17.4196 12.2064 14.6066 9.3934C11.7936 6.58035 7.97825 5 4 5C3.44772 5 3 4.55228 3 4ZM3 11C3 10.4477 3.44772 10 4 10C6.65216 10 9.1957 11.0536 11.0711 12.9289C12.9464 14.8043 14 17.3478 14 20C14 20.5523 13.5523 21 13 21C12.4477 21 12 20.5523 12 20C12 17.8783 11.1571 15.8434 9.65685 14.3431C8.15656 12.8429 6.12173 12 4 12C3.44772 12 3 11.5523 3 11ZM3 19C3 17.8954 3.89543 17 5 17C6.10457 17 7 17.8954 7 19C7 20.1046 6.10457 21 5 21C3.89543 21 3 20.1046 3 19Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('rss', Rss);
