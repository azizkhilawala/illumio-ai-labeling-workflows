import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Bold: React.FC<IconComponentProps> = ({
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
        <><path d="M6 12H12.5C14.9853 12 17 9.98528 17 7.5C17 5.01472 14.9853 3 12.5 3H6V12ZM6 12H13.5C15.9853 12 18 14.0147 18 16.5C18 18.9853 15.9853 21 13.5 21H6V12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M5 3C5 2.44772 5.44772 2 6 2H12.5C15.5376 2 18 4.46243 18 7.5C18 9.15879 17.2657 10.6461 16.1043 11.6545C17.8283 12.583 19 14.4047 19 16.5C19 19.5376 16.5376 22 13.5 22H6C5.44772 22 5 21.5523 5 21V3ZM7 13V20H13.5C15.433 20 17 18.433 17 16.5C17 14.567 15.433 13 13.5 13H7ZM7 11H12.5C14.433 11 16 9.433 16 7.5C16 5.567 14.433 4 12.5 4H7V11Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('bold', Bold);
