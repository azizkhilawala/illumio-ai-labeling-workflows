import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const UserRefresh: React.FC<IconComponentProps> = ({
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
        <><path d="M11 14C7.13401 14 4 17.134 4 21H10.5M18.5 20.2361C17.9692 20.7111 17.2684 21 16.5 21C14.8431 21 13.5 19.6569 13.5 18C13.5 16.3431 14.8431 15 16.5 15C17.8062 15 18.9175 15.8348 19.3293 17M20 14.5V17.5H17M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M11 2C8.23858 2 6 4.23858 6 7C6 9.76142 8.23858 12 11 12C13.7614 12 16 9.76142 16 7C16 4.23858 13.7614 2 11 2Z" fill={color}/>
<path d="M11 13C6.58172 13 3 16.5817 3 21C3 21.5523 3.44772 22 4 22H12.0278C11.0777 20.9385 10.5 19.5367 10.5 18C10.5 16.0494 11.4308 14.3162 12.8725 13.2203C12.2718 13.0763 11.6448 13 11 13Z" fill={color}/>
<path d="M21 14.5C21 13.9477 20.5523 13.5 20 13.5C19.4477 13.5 19 13.9477 19 14.5V14.8774C18.3156 14.3286 17.4465 14 16.5 14C14.2909 14 12.5 15.7909 12.5 18C12.5 20.2091 14.2909 22 16.5 22C17.5238 22 18.4599 21.614 19.1669 20.9812C19.5784 20.6129 19.6135 19.9807 19.2451 19.5692C18.8768 19.1577 18.2446 19.1226 17.8331 19.491C17.4786 19.8083 17.0129 20 16.5 20C15.3954 20 14.5 19.1046 14.5 18C14.5 16.8954 15.3954 16 16.5 16C17.0067 16 17.4701 16.1886 17.8231 16.5H17C16.4477 16.5 16 16.9477 16 17.5C16 18.0523 16.4477 18.5 17 18.5H20C20.5523 18.5 21 18.0523 21 17.5V14.5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('user-refresh', UserRefresh);
