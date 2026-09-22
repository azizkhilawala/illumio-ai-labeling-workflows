import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const UserMinus: React.FC<IconComponentProps> = ({
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
        <><path d="M20 18L14 18M11 21H4C4 17.134 7.13401 14 11 14C11.695 14 12.3663 14.1013 13 14.2899M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M11 2C8.23858 2 6 4.23858 6 7C6 9.76142 8.23858 12 11 12C13.7614 12 16 9.76142 16 7C16 4.23858 13.7614 2 11 2Z" fill={color}/>
<path d="M11 13C6.58172 13 3 16.5817 3 21C3 21.5523 3.44772 22 4 22H18C18.5523 22 19 21.5523 19 21H14C12.3431 21 11 19.6569 11 18C11 16.3431 12.3431 15 14 15H16.2916C14.8814 13.7553 13.0289 13 11 13Z" fill={color}/>
<path d="M14 17C13.4477 17 13 17.4477 13 18C13 18.5523 13.4477 19 14 19L20 19C20.5523 19 21 18.5523 21 18C21 17.4477 20.5523 17 20 17L14 17Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('user-minus', UserMinus);
