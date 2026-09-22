import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const UserBlock: React.FC<IconComponentProps> = ({
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
        <><path d="M11 14C7.13401 14 4 17.134 4 21H11M14.8086 19.7053L19.127 16.3467M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7ZM20 18C20 19.6569 18.6569 21 17 21C15.3431 21 14 19.6569 14 18C14 16.3431 15.3431 15 17 15C18.6569 15 20 16.3431 20 18Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M11 2C8.23858 2 6 4.23858 6 7C6 9.76142 8.23858 12 11 12C13.7614 12 16 9.76142 16 7C16 4.23858 13.7614 2 11 2Z" fill={color}/>
<path d="M11 13C6.58172 13 3 16.5817 3 21C3 21.5523 3.44772 22 4 22H12.5278C11.5777 20.9385 11 19.5367 11 18C11 16.1072 11.8764 14.4192 13.2456 13.3195C12.5332 13.1115 11.7796 13 11 13Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M13 18C13 15.7909 14.7909 14 17 14C19.2091 14 21 15.7909 21 18C21 20.2091 19.2091 22 17 22C14.7909 22 13 20.2091 13 18ZM17 16C15.8954 16 15 16.8954 15 18C15 18.0933 15.0064 18.1851 15.0188 18.275L17.7546 16.1472C17.5217 16.0523 17.267 16 17 16ZM18.9815 17.7267L16.247 19.8534C16.4795 19.9479 16.7336 20 17 20C18.1046 20 19 19.1046 19 18C19 17.9073 18.9937 17.816 18.9815 17.7267Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('user-block', UserBlock);
