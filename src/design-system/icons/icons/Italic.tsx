import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Italic: React.FC<IconComponentProps> = ({
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
        <><path d="M10 3H20M4 21H14M15 3L9 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M14.9767 2.00003H10C9.44772 2.00003 9 2.44774 9 3.00003C9 3.55231 9.44772 4.00003 10 4.00003H13.6126L8.27924 20H4C3.44772 20 3 20.4477 3 21C3 21.5523 3.44772 22 4 22H8.97695C8.99245 22.0004 9.00791 22.0004 9.02333 22H14C14.5523 22 15 21.5523 15 21C15 20.4477 14.5523 20 14 20H10.3874L15.7208 4.00003H20C20.5523 4.00003 21 3.55231 21 3.00003C21 2.44774 20.5523 2.00003 20 2.00003H15.0231C15.0076 1.99966 14.9921 1.99967 14.9767 2.00003Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('italic', Italic);
