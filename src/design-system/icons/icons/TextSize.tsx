import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const TextSize: React.FC<IconComponentProps> = ({
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
        <><path d="M8 4V20M17 12V20M6 20H10M15 20H19M13 7V4H3V7M21 14V12H13V14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 4C2 3.44772 2.44772 3 3 3H13C13.5523 3 14 3.44772 14 4V7C14 7.55228 13.5523 8 13 8C12.4477 8 12 7.55228 12 7V5H9V19H10C10.5523 19 11 19.4477 11 20C11 20.5523 10.5523 21 10 21H6C5.44772 21 5 20.5523 5 20C5 19.4477 5.44772 19 6 19H7V5H4V7C4 7.55228 3.55228 8 3 8C2.44772 8 2 7.55228 2 7V4ZM12 12C12 11.4477 12.4477 11 13 11H21C21.5523 11 22 11.4477 22 12V14C22 14.5523 21.5523 15 21 15C20.4477 15 20 14.5523 20 14V13H18V19H19C19.5523 19 20 19.4477 20 20C20 20.5523 19.5523 21 19 21H15C14.4477 21 14 20.5523 14 20C14 19.4477 14.4477 19 15 19H16V13H14V14C14 14.5523 13.5523 15 13 15C12.4477 15 12 14.5523 12 14V12Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('text-size', TextSize);
