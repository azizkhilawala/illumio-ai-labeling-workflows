import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Frame: React.FC<IconComponentProps> = ({
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
        <><path d="M6 3V21M18 3V21M3 6H21M3 18H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M6 2C6.55228 2 7 2.44772 7 3V5H17V3C17 2.44772 17.4477 2 18 2C18.5523 2 19 2.44772 19 3V5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H19V17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H19V21C19 21.5523 18.5523 22 18 22C17.4477 22 17 21.5523 17 21V19H7V21C7 21.5523 6.55228 22 6 22C5.44772 22 5 21.5523 5 21V19H3C2.44772 19 2 18.5523 2 18C2 17.4477 2.44772 17 3 17H5V7H3C2.44772 7 2 6.55228 2 6C2 5.44772 2.44772 5 3 5H5V3C5 2.44772 5.44772 2 6 2ZM7 7V17H17V7H7Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('frame', Frame);
