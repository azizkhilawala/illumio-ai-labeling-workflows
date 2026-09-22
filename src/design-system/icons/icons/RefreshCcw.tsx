import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const RefreshCcw: React.FC<IconComponentProps> = ({
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
        <><path d="M3 3V8M3 8H8M3 8L6 5.29168C7.59227 3.86656 9.69494 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.71683 21 4.13247 18.008 3.22302 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3 2C3.55228 2 4 2.44772 4 3V5.75001L5.33308 4.54654C7.1016 2.96367 9.43946 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C7.23965 22 3.25835 18.6747 2.24781 14.2213C2.12559 13.6827 2.46314 13.147 3.00173 13.0248C3.54032 12.9026 4.07601 13.2401 4.19823 13.7787C5.0066 17.3412 8.194 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.95117 4 8.0843 4.76888 6.66847 6.03542L5.60001 7H8C8.55228 7 9 7.44772 9 8C9 8.55228 8.55228 9 8 9H3C2.44772 9 2 8.55228 2 8V3C2 2.44772 2.44772 2 3 2Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('refresh-ccw', RefreshCcw);
