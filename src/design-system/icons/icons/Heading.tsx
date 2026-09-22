import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Heading: React.FC<IconComponentProps> = ({
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
        <><path d="M6 3V21M18 12H7M18 3V21M4 21H8M4 3H8M16 21H20M16 3H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3 3C3 2.44772 3.44772 2 4 2H8C8.55228 2 9 2.44772 9 3C9 3.55228 8.55228 4 8 4H7V11H17V4H16C15.4477 4 15 3.55228 15 3C15 2.44772 15.4477 2 16 2H20C20.5523 2 21 2.44772 21 3C21 3.55228 20.5523 4 20 4H19V20H20C20.5523 20 21 20.4477 21 21C21 21.5523 20.5523 22 20 22H16C15.4477 22 15 21.5523 15 21C15 20.4477 15.4477 20 16 20H17V13H7V20H8C8.55228 20 9 20.4477 9 21C9 21.5523 8.55228 22 8 22H4C3.44772 22 3 21.5523 3 21C3 20.4477 3.44772 20 4 20H5V4H4C3.44772 4 3 3.55228 3 3Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('heading', Heading);
