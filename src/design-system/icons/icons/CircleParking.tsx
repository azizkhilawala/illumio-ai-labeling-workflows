import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CircleParking: React.FC<IconComponentProps> = ({
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
        <><path d="M9.5 16V8H13C14.3807 8 15.5 9.11929 15.5 10.5C15.5 11.8807 14.3807 13 13 13H9.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M13 12H10.5V9H13C13.8284 9 14.5 9.67157 14.5 10.5C14.5 11.3284 13.8284 12 13 12Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9.5 7C8.94772 7 8.5 7.44772 8.5 8V16C8.5 16.5523 8.94772 17 9.5 17C10.0523 17 10.5 16.5523 10.5 16V14H13C14.933 14 16.5 12.433 16.5 10.5C16.5 8.567 14.933 7 13 7H9.5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('circle-parking', CircleParking);
