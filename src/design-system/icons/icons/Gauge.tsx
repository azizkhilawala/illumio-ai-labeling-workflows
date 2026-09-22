import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Gauge: React.FC<IconComponentProps> = ({
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
        <><path d="M12 13C10.8954 13 10 13.8954 10 15C10 16.1046 10.8954 17 12 17C13.1046 17 14 16.1046 14 15C14 13.8954 13.1046 13 12 13ZM12 13V6M8 8H8.01M16 8H16.01M18 12H18.01M6 12H6.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6V12.1707C14.1652 12.5825 15 13.6938 15 15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15C9 13.6938 9.83481 12.5825 11 12.1707V6ZM17 8C17 8.55229 16.5523 9 16 9C15.4477 9 15 8.55229 15 8C15 7.44772 15.4477 7 16 7C16.5523 7 17 7.44772 17 8ZM18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12C17 12.5523 17.4477 13 18 13ZM7 12C7 12.5523 6.55228 13 6 13C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11C6.55228 11 7 11.4477 7 12ZM8 9C8.55229 9 9 8.55229 9 8C9 7.44772 8.55229 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55229 7.44772 9 8 9Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('gauge', Gauge);
