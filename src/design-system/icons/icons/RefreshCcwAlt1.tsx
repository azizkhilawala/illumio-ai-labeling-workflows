import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const RefreshCcwAlt1: React.FC<IconComponentProps> = ({
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
        <><path d="M12 21C16.9706 21 21 16.9706 21 12C21 9.69494 20.1334 7.59227 18.7083 6L16 3M12 3C7.02944 3 3 7.02944 3 12C3 14.3051 3.86656 16.4077 5.29168 18L8 21M21 3H16M16 3V8M3 21H8M8 21V16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 14.0488 4.76889 15.9157 6.03544 17.3316C6.0359 17.3321 6.03636 17.3326 6.03682 17.3331L7 18.4V16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16V21C9 21.5523 8.55228 22 8 22H3C2.44772 22 2 21.5523 2 21C2 20.4477 2.44772 20 3 20H5.75001L4.54654 18.6669C2.96367 16.8984 2 14.5605 2 12C2 6.47715 6.47715 2 12 2C12.5523 2 13 2.44772 13 3C13 3.55228 12.5523 4 12 4ZM15 3C15 2.44772 15.4477 2 16 2H21C21.5523 2 22 2.44772 22 3C22 3.55228 21.5523 4 21 4H18.25L19.4535 5.33308C21.0363 7.10161 22 9.43946 22 12C22 17.5228 17.5228 22 12 22C11.4477 22 11 21.5523 11 21C11 20.4477 11.4477 20 12 20C16.4183 20 20 16.4183 20 12C20 9.95112 19.2311 8.08422 17.9645 6.66839C17.9641 6.66789 17.9636 6.6674 17.9632 6.66691L17 5.60001V8C17 8.55228 16.5523 9 16 9C15.4477 9 15 8.55228 15 8V3Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('refresh-ccw-alt-1', RefreshCcwAlt1);
