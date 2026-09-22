import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ListUl: React.FC<IconComponentProps> = ({
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
        <><path d="M7 8H21M7 12H21M7 16H21M3 8H3.01M3 12H3.01M3 16H3.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M4 8C4 8.55229 3.55228 9 3 9C2.44772 9 2 8.55229 2 8C2 7.44772 2.44772 7 3 7C3.55228 7 4 7.44772 4 8Z" fill={color}/>
<path d="M4 12C4 12.5523 3.55228 13 3 13C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11C3.55228 11 4 11.4477 4 12Z" fill={color}/>
<path d="M4 16C4 16.5523 3.55228 17 3 17C2.44772 17 2 16.5523 2 16C2 15.4477 2.44772 15 3 15C3.55228 15 4 15.4477 4 16Z" fill={color}/>
<path d="M7 7C6.44772 7 6 7.44772 6 8C6 8.55229 6.44772 9 7 9H21C21.5523 9 22 8.55229 22 8C22 7.44772 21.5523 7 21 7H7Z" fill={color}/>
<path d="M7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H7Z" fill={color}/>
<path d="M7 15C6.44772 15 6 15.4477 6 16C6 16.5523 6.44772 17 7 17H21C21.5523 17 22 16.5523 22 16C22 15.4477 21.5523 15 21 15H7Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('list-ul', ListUl);
