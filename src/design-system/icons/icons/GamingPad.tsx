import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const GamingPad: React.FC<IconComponentProps> = ({
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
        <><path d="M6 15H10M8 13V17M18 16H18.01M15 14H15.01M16 3V6H12V9M8 21C4.68629 21 2 18.3137 2 15C2 11.6863 4.68629 9 8 9H16C19.3137 9 22 11.6863 22 15C22 18.3137 19.3137 21 16 21C14.4783 21 13.0577 20.4058 12 19.4722C10.9385 20.4223 9.53671 21 8 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M17 3C17 2.44772 16.5523 2 16 2C15.4477 2 15 2.44772 15 3V5H12C11.4477 5 11 5.44772 11 6V8H8C4.13401 8 1 11.134 1 15C1 18.866 4.13401 22 8 22C9.48832 22 10.8696 21.5346 12.0041 20.7423C13.1351 21.5229 14.5231 22 16 22C19.866 22 23 18.866 23 15C23 11.134 19.866 8 16 8H13V7H16C16.5523 7 17 6.55228 17 6V3ZM7 13C7 12.4477 7.44772 12 8 12C8.55229 12 9 12.4477 9 13V14H10C10.5523 14 11 14.4477 11 15C11 15.5523 10.5523 16 10 16H9V17C9 17.5523 8.55229 18 8 18C7.44772 18 7 17.5523 7 17V16H6C5.44772 16 5 15.5523 5 15C5 14.4477 5.44772 14 6 14H7V13ZM16 14C16 14.5523 15.5523 15 15 15C14.4477 15 14 14.5523 14 14C14 13.4477 14.4477 13 15 13C15.5523 13 16 13.4477 16 14ZM18 17C18.5523 17 19 16.5523 19 16C19 15.4477 18.5523 15 18 15C17.4477 15 17 15.4477 17 16C17 16.5523 17.4477 17 18 17Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('gaming-pad', GamingPad);
