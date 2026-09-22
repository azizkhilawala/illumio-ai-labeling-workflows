import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const FlipBackward: React.FC<IconComponentProps> = ({
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
        <><path d="M3 8H16.5C18.9853 8 21 10.0147 21 12.5C21 14.9853 18.9853 17 16.5 17H3M3 8L6 5M3 8L6 11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M6.70711 4.29289C7.09763 4.68342 7.09763 5.31658 6.70711 5.70711L5.41421 7H16.5C19.5376 7 22 9.46243 22 12.5C22 15.5376 19.5376 18 16.5 18H3C2.44772 18 2 17.5523 2 17C2 16.4477 2.44772 16 3 16H16.5C18.433 16 20 14.433 20 12.5C20 10.567 18.433 9 16.5 9H5.41421L6.70711 10.2929C7.09763 10.6834 7.09763 11.3166 6.70711 11.7071C6.31658 12.0976 5.68342 12.0976 5.29289 11.7071L2.29289 8.70711C1.90237 8.31658 1.90237 7.68342 2.29289 7.29289L5.29289 4.29289C5.68342 3.90237 6.31658 3.90237 6.70711 4.29289Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('flip-backward', FlipBackward);
