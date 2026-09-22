import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Users: React.FC<IconComponentProps> = ({
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
        <><path d="M13 20V18C13 15.2386 10.7614 13 8 13C5.23858 13 3 15.2386 3 18V20H13ZM13 20H21V19C21 16.0545 18.7614 14 16 14C14.5867 14 13.3103 14.6255 12.4009 15.6311M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M4 7C4 4.79086 5.79086 3 8 3C10.2091 3 12 4.79086 12 7C12 9.20914 10.2091 11 8 11C5.79086 11 4 9.20914 4 7Z" fill={color}/>
<path d="M2 18C2 14.6863 4.68629 12 8 12C11.3137 12 14 14.6863 14 18V20C14 20.5523 13.5523 21 13 21H3C2.44772 21 2 20.5523 2 20V18Z" fill={color}/>
<path d="M16 6C14.3431 6 13 7.34315 13 9C13 10.6569 14.3431 12 16 12C17.6569 12 19 10.6569 19 9C19 7.34315 17.6569 6 16 6Z" fill={color}/>
<path d="M16 13C15.0835 13 14.218 13.2169 13.4454 13.601C14.4177 14.8031 15.0001 16.3335 15.0001 18V20C15.0001 20.3643 14.9027 20.7058 14.7325 21H21C21.5523 21 22 20.5523 22 20V19C22 15.4781 19.2893 13 16 13Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('users', Users);
