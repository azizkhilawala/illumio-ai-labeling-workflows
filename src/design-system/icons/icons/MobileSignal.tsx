import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MobileSignal: React.FC<IconComponentProps> = ({
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
        <><path d="M9 21H6.2C5.0799 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V6.2C3 5.0799 3 4.51984 3.21799 4.09202C3.40973 3.71569 3.71569 3.40973 4.09202 3.21799C4.51984 3 5.0799 3 6.2 3H11.8C12.9201 3 13.4802 3 13.908 3.21799C14.2843 3.40973 14.5903 3.71569 14.782 4.09202C15 4.51984 15 5.0799 15 6.2V10M21 21H21.01M8 6H10M17 21C17 18.7909 18.7909 17 21 17M13 21C13 16.5817 16.5817 13 21 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H10.1707C10.0602 21.6872 10 21.3506 10 21C10 16.7253 12.4383 13.0201 16 11.1994V5C16 3.34315 14.6569 2 13 2H5ZM8 4C7.44771 4 7 4.44772 7 5C7 5.55228 7.44771 6 8 6H10C10.5523 6 11 5.55228 11 5C11 4.44772 10.5523 4 10 4H8Z" fill={color}/>
<path d="M14 21C14 17.134 17.134 14 21 14C21.5523 14 22 13.5523 22 13C22 12.4477 21.5523 12 21 12C16.0294 12 12 16.0294 12 21C12 21.5523 12.4477 22 13 22C13.5523 22 14 21.5523 14 21Z" fill={color}/>
<path d="M18 21C18 19.3431 19.3431 18 21 18C21.5523 18 22 17.5523 22 17C22 16.4477 21.5523 16 21 16C18.2386 16 16 18.2386 16 21C16 21.5523 16.4477 22 17 22C17.5523 22 18 21.5523 18 21Z" fill={color}/>
<path d="M21 20C20.4477 20 20 20.4477 20 21C20 21.5523 20.4477 22 21 22H21.01C21.5623 22 22.01 21.5523 22.01 21C22.01 20.4477 21.5623 20 21.01 20H21Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('mobile-signal', MobileSignal);
