import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Overline: React.FC<IconComponentProps> = ({
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
        <><path d="M4 3H20M12 21C9.23858 21 7 18.7614 7 16V12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12V16C17 18.7614 14.7614 21 12 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3 3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3C21 3.55228 20.5523 4 20 4H4C3.44772 4 3 3.55228 3 3ZM6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12V16C18 19.3137 15.3137 22 12 22C8.68629 22 6 19.3137 6 16V12ZM12 8C9.79086 8 8 9.79086 8 12V16C8 18.2091 9.79086 20 12 20C14.2091 20 16 18.2091 16 16V12C16 9.79086 14.2091 8 12 8Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('overline', Overline);
