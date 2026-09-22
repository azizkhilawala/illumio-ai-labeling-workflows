import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const WifiWeak: React.FC<IconComponentProps> = ({
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
        <><path d="M12 20H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M11 20C11 19.4477 11.4455 19 11.995 19H12.005C12.5545 19 13 19.4477 13 20C13 20.5523 12.5545 21 12.005 21H11.995C11.4455 21 11 20.5523 11 20Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('wifi-weak', WifiWeak);
