import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const FlipForward: React.FC<IconComponentProps> = ({
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
        <><path d="M21 8H7.5C5.01472 8 3 10.0147 3 12.5C3 14.9853 5.01472 17 7.5 17H21M21 8L18 5M21 8L18 11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M17.2929 4.29289C17.6834 3.90237 18.3166 3.90237 18.7071 4.29289L21.7071 7.29289C22.0976 7.68342 22.0976 8.31658 21.7071 8.70711L18.7071 11.7071C18.3166 12.0976 17.6834 12.0976 17.2929 11.7071C16.9024 11.3166 16.9024 10.6834 17.2929 10.2929L18.5858 9H7.5C5.567 9 4 10.567 4 12.5C4 14.433 5.567 16 7.5 16H21C21.5523 16 22 16.4477 22 17C22 17.5523 21.5523 18 21 18H7.5C4.46243 18 2 15.5376 2 12.5C2 9.46243 4.46243 7 7.5 7H18.5858L17.2929 5.70711C16.9024 5.31658 16.9024 4.68342 17.2929 4.29289Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('flip-forward', FlipForward);
