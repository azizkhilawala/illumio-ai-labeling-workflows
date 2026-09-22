import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Square: React.FC<IconComponentProps> = ({
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
        <><rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><rect x="3" y="3" width="18" height="18" rx="3" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('Square', Square);
