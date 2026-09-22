import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const RefreshCw: React.FC<IconComponentProps> = ({
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
        <><path d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C14.5605 2 16.8984 2.96367 18.6669 4.54655L18.6701 4.5494L18.6701 4.54941L20 5.75001V3C20 2.44772 20.4477 2 21 2C21.5523 2 22 2.44772 22 3V8C22 8.55228 21.5523 9 21 9H16C15.4477 9 15 8.55228 15 8C15 7.44772 15.4477 7 16 7H18.4L17.3331 6.03682C17.3326 6.03636 17.3321 6.0359 17.3316 6.03544C15.9157 4.76889 14.0488 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C15.806 20 18.9934 17.3412 19.8018 13.7787C19.924 13.2401 20.4597 12.9026 20.9983 13.0248C21.5369 13.147 21.8744 13.6827 21.7522 14.2213C20.7416 18.6747 16.7603 22 12 22C6.47715 22 2 17.5228 2 12Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('refresh-cw', RefreshCw);
