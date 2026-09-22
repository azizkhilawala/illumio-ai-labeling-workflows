import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const SignalFair: React.FC<IconComponentProps> = ({
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
        <><path d="M4 20V19M8 20V16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M8 15C8.55228 15 9 15.4477 9 16V20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20V16C7 15.4477 7.44772 15 8 15ZM4 18C4.55228 18 5 18.4477 5 19V20C5 20.5523 4.55228 21 4 21C3.44772 21 3 20.5523 3 20V19C3 18.4477 3.44772 18 4 18Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('signal-fair', SignalFair);
