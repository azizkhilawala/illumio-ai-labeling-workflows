import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MenuAlt2: React.FC<IconComponentProps> = ({
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
        <><path d="M4 12H20M4 8H20M4 16H12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 16C3 15.4477 3.44772 15 4 15H12C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17H4C3.44772 17 3 16.5523 3 16Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('menu-alt-2', MenuAlt2);
