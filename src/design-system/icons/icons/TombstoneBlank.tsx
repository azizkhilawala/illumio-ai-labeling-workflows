import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const TombstoneBlank: React.FC<IconComponentProps> = ({
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
        <><path d="M19 21V10C19 6.13401 15.866 3 12 3C8.13401 3 5 6.13401 5 10V21M3 21H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C7.58172 2 4 5.58172 4 10V20H3C2.44772 20 2 20.4477 2 21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21C22 20.4477 21.5523 20 21 20H20V10C20 5.58172 16.4183 2 12 2Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('tombstone-blank', TombstoneBlank);
