import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Archway: React.FC<IconComponentProps> = ({
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
        <><path d="M21 3H3M4 3V21M20 3V21M3 21H8V16C8 13.7909 9.79086 12 12 12C14.2091 12 16 13.7909 16 16V21H21M20 7H4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M3 2C2.44772 2 2 2.44772 2 3C2 3.55228 2.44772 4 3 4H21C21.5523 4 22 3.55228 22 3C22 2.44772 21.5523 2 21 2H3Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M21 6H3V20C2.44772 20 2 20.4477 2 21C2 21.5523 2.44772 22 3 22H8C8.55228 22 9 21.5523 9 21V16C9 14.3431 10.3431 13 12 13C13.6569 13 15 14.3431 15 16V21C15 21.5523 15.4477 22 16 22H21C21.5523 22 22 21.5523 22 21C22 20.4477 21.5523 20 21 20V6Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('archway', Archway);
