import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CircleHalf: React.FC<IconComponentProps> = ({
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
        <><path d="M3 12C3 16.9706 7.02944 21 12 21V3C7.02944 3 3 7.02944 3 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22V2Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('circle-half', CircleHalf);
