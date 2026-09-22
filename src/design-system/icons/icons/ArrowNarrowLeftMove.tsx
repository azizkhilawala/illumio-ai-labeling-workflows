import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ArrowNarrowLeftMove: React.FC<IconComponentProps> = ({
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
        <><path d="M20 4V20M4 12H16M4 12L8 8M4 12L8 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20V4C19 3.44772 19.4477 3 20 3ZM8.70711 7.29289C9.09763 7.68342 9.09763 8.31658 8.70711 8.70711L6.41421 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H6.41421L8.70711 15.2929C9.09763 15.6834 9.09763 16.3166 8.70711 16.7071C8.31658 17.0976 7.68342 17.0976 7.29289 16.7071L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929L7.29289 7.29289C7.68342 6.90237 8.31658 6.90237 8.70711 7.29289Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('arrow-narrow-left-move', ArrowNarrowLeftMove);
