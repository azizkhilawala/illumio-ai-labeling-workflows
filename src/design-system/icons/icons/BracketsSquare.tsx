import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const BracketsSquare: React.FC<IconComponentProps> = ({
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
        <><path d="M9 3H5V21H9M15 21H19V3H15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M4 3C4 2.44772 4.44772 2 5 2H9C9.55228 2 10 2.44772 10 3C10 3.55228 9.55228 4 9 4H6V20H9C9.55228 20 10 20.4477 10 21C10 21.5523 9.55228 22 9 22H5C4.44772 22 4 21.5523 4 21V3ZM14 3C14 2.44772 14.4477 2 15 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H15C14.4477 22 14 21.5523 14 21C14 20.4477 14.4477 20 15 20H18V4H15C14.4477 4 14 3.55228 14 3Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('brackets-square', BracketsSquare);
