import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const UserSearchAlt1: React.FC<IconComponentProps> = ({
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
        <><path d="M18.5 19.5L20 21M4 21C4 17.134 7.13401 14 11 14M19 17.5C19 18.8807 17.8807 20 16.5 20C15.1193 20 14 18.8807 14 17.5C14 16.1193 15.1193 15 16.5 15C17.8807 15 19 16.1193 19 17.5ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M11.5218 2C8.76042 2 6.52185 4.23858 6.52185 7C6.52185 9.76142 8.76042 12 11.5218 12C14.2833 12 16.5218 9.76142 16.5218 7C16.5218 4.23858 14.2833 2 11.5218 2Z" fill={color}/>
<path d="M11.5218 13C12.0744 13 12.6152 13.0498 13.1402 13.1451C11.8384 14.151 11 15.7276 11 17.5C11 19.3602 11.9234 21.0046 13.3369 22H6.52185C5.32763 22 4.73052 22 4.08897 21.5566C3.65466 21.2564 3.12614 20.4187 3.0422 19.8975C2.91822 19.1275 3.07688 18.7949 3.39421 18.1297C4.84134 15.0961 7.9368 13 11.5218 13Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M16.5 14C14.567 14 13 15.567 13 17.5C13 19.433 14.567 21 16.5 21C17.1028 21 17.6699 20.8476 18.1651 20.5793L19.2929 21.7071C19.6834 22.0976 20.3166 22.0976 20.7071 21.7071C21.0976 21.3166 21.0976 20.6834 20.7071 20.2929L19.5793 19.1651C19.8476 18.6699 20 18.1028 20 17.5C20 15.567 18.433 14 16.5 14ZM15 17.5C15 16.6716 15.6716 16 16.5 16C17.3284 16 18 16.6716 18 17.5C18 18.3284 17.3284 19 16.5 19C15.6716 19 15 18.3284 15 17.5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('user-search-alt-1', UserSearchAlt1);
