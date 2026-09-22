import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const BracketSquareRight: React.FC<IconComponentProps> = ({
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
        <><path d="M10 21H14L14 3H10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M15 21C15 21.5523 14.5523 22 14 22H10C9.44772 22 9 21.5523 9 21C9 20.4477 9.44772 20 10 20H13L13 4H10C9.44772 4 9 3.55228 9 3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3L15 21Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('bracket-square-right', BracketSquareRight);
