import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Hotel: React.FC<IconComponentProps> = ({
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
        <><path d="M3 21H5M5 21H10M5 21V3M10 21H14M10 21V16L8 16C10 13.3333 14 13.3333 16 16L14 16V21M14 21H19M19 21H21M19 21V3M3 3H5M5 3H19M19 3H21M9 6.5H10M14 6.5H15M9 10.5H10M14 10.5H15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3 2C2.44772 2 2 2.44772 2 3C2 3.55228 2.44772 4 3 4H4V20H3C2.44772 20 2 20.4477 2 21C2 21.5523 2.44772 22 3 22H10V18L9 18C8.62123 18 8.27497 17.786 8.10558 17.4472C7.93619 17.1084 7.97274 16.703 8.20001 16.4C10 14 14 14 15.8 16.4C16.0273 16.703 16.0638 17.1084 15.8944 17.4472C15.725 17.786 15.3788 18 15 18H14V22H21C21.5523 22 22 21.5523 22 21C22 20.4477 21.5523 20 21 20H20V4H21C21.5523 4 22 3.55228 22 3C22 2.44772 21.5523 2 21 2H3ZM9 6C8.44772 6 8 6.44772 8 7V8C8 8.55228 8.44772 9 9 9H10C10.5523 9 11 8.55228 11 8V7C11 6.44772 10.5523 6 10 6H9ZM14 6C13.4477 6 13 6.44772 13 7V8C13 8.55228 13.4477 9 14 9H15C15.5523 9 16 8.55228 16 8V7C16 6.44772 15.5523 6 15 6H14ZM8 11C8 10.4477 8.44772 10 9 10H10C10.5523 10 11 10.4477 11 11V12C11 12.5523 10.5523 13 10 13H9C8.44772 13 8 12.5523 8 12V11ZM14 10C13.4477 10 13 10.4477 13 11V12C13 12.5523 13.4477 13 14 13H15C15.5523 13 16 12.5523 16 12V11C16 10.4477 15.5523 10 15 10H14Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('hotel', Hotel);
