import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MenuAlt1: React.FC<IconComponentProps> = ({
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
        <><path d="M4 6H20M4 12H14M4 18H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6ZM3 12C3 11.4477 3.44772 11 4 11H14C14.5523 11 15 11.4477 15 12C15 12.5523 14.5523 13 14 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H9C9.55228 17 10 17.4477 10 18C10 18.5523 9.55228 19 9 19H4C3.44772 19 3 18.5523 3 18Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('menu-alt-1', MenuAlt1);
