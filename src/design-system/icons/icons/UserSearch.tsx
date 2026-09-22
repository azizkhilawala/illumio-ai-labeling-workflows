import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const UserSearch: React.FC<IconComponentProps> = ({
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
        <><path d="M18.5 19.5L20 21M11 14C7.13401 14 4 17.134 4 21H11M19 17.5C19 18.8807 17.8807 20 16.5 20C15.1193 20 14 18.8807 14 17.5C14 16.1193 15.1193 15 16.5 15C17.8807 15 19 16.1193 19 17.5ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M11 2C8.23858 2 6 4.23858 6 7C6 9.76142 8.23858 12 11 12C13.7614 12 16 9.76142 16 7C16 4.23858 13.7614 2 11 2Z" fill={color}/>
<path d="M11 13C6.58172 13 3 16.5817 3 21C3 21.5523 3.44772 22 4 22H13.3369C11.9234 21.0046 11 19.3602 11 17.5C11 15.7899 11.7805 14.262 13.0047 13.2533C12.3641 13.0879 11.6923 13 11 13Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M13 17.5C13 15.567 14.567 14 16.5 14C18.433 14 20 15.567 20 17.5C20 18.1028 19.8476 18.6699 19.5793 19.1651L20.7071 20.2929C21.0976 20.6834 21.0976 21.3166 20.7071 21.7071C20.3166 22.0976 19.6834 22.0976 19.2929 21.7071L18.1651 20.5793C17.6699 20.8476 17.1028 21 16.5 21C14.567 21 13 19.433 13 17.5ZM16.5 16C15.6716 16 15 16.6716 15 17.5C15 18.3284 15.6716 19 16.5 19C17.3284 19 18 18.3284 18 17.5C18 16.6716 17.3284 16 16.5 16Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('user-search', UserSearch);
