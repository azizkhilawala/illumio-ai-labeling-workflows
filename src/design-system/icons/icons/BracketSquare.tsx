import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const BracketSquare: React.FC<IconComponentProps> = ({
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
        <><path d="M14 3H10V21H14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M9 3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3C15 3.55228 14.5523 4 14 4H11V20H14C14.5523 20 15 20.4477 15 21C15 21.5523 14.5523 22 14 22H10C9.44772 22 9 21.5523 9 21V3Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('bracket-square', BracketSquare);
