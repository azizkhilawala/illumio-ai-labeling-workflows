import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ArrowUpRight: React.FC<IconComponentProps> = ({
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
        <><path d="M7 17L17 7M17 7H8M17 7V16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M7 7C7 6.44772 7.44772 6 8 6H17C17.5523 6 18 6.44772 18 7V16C18 16.5523 17.5523 17 17 17C16.4477 17 16 16.5523 16 16V9.41421L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L14.5858 8H8C7.44772 8 7 7.55228 7 7Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('arrow-up-right', ArrowUpRight);
