import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const UserBlockAlt1: React.FC<IconComponentProps> = ({
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
        <><path d="M14.8086 19.7053L19.127 16.3467M4 21C4 17.134 7.13401 14 11 14M20 18C20 19.6569 18.6569 21 17 21C15.3431 21 14 19.6569 14 18C14 16.3431 15.3431 15 17 15C18.6569 15 20 16.3431 20 18ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M11.5218 2C8.76042 2 6.52185 4.23858 6.52185 7C6.52185 9.76142 8.76042 12 11.5218 12C14.2833 12 16.5218 9.76142 16.5218 7C16.5218 4.23858 14.2833 2 11.5218 2Z" fill={color}/>
<path d="M11.5218 13C12.1672 13 12.7966 13.0679 13.4034 13.197C11.9441 14.2915 11 16.0355 11 18C11 19.5367 11.5777 20.9385 12.5278 22H6.52185C5.32763 22 4.73052 22 4.08897 21.5566C3.65466 21.2564 3.12614 20.4187 3.0422 19.8975C2.91822 19.1275 3.07688 18.7949 3.39421 18.1297C4.84134 15.0961 7.9368 13 11.5218 13Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M13 18C13 15.7909 14.7909 14 17 14C19.2091 14 21 15.7909 21 18C21 20.2091 19.2091 22 17 22C14.7909 22 13 20.2091 13 18ZM17 16C15.8954 16 15 16.8954 15 18C15 18.0933 15.0064 18.1851 15.0188 18.275L17.7546 16.1472C17.5217 16.0523 17.267 16 17 16ZM18.9815 17.7267L16.247 19.8534C16.4795 19.9479 16.7336 20 17 20C18.1046 20 19 19.1046 19 18C19 17.9073 18.9937 17.816 18.9815 17.7267Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('user-block-alt-1', UserBlockAlt1);
