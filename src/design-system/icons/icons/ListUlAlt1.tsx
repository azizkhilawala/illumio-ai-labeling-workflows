import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ListUlAlt1: React.FC<IconComponentProps> = ({
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
        <><path d="M8 8H20M11 12H20M14 16H20M4 8H4.01M7 12H7.01M10 16H10.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M4 9C4.55228 9 5 8.55229 5 8C5 7.44772 4.55228 7 4 7C3.44772 7 3 7.44772 3 8C3 8.55229 3.44772 9 4 9Z" fill={color}/>
<path d="M7 13C7.55228 13 8 12.5523 8 12C8 11.4477 7.55228 11 7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13Z" fill={color}/>
<path d="M11 16C11 16.5523 10.5523 17 10 17C9.44771 17 9 16.5523 9 16C9 15.4477 9.44771 15 10 15C10.5523 15 11 15.4477 11 16Z" fill={color}/>
<path d="M8 7C7.44772 7 7 7.44772 7 8C7 8.55229 7.44772 9 8 9H20C20.5523 9 21 8.55229 21 8C21 7.44772 20.5523 7 20 7H8Z" fill={color}/>
<path d="M10 12C10 11.4477 10.4477 11 11 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H11C10.4477 13 10 12.5523 10 12Z" fill={color}/>
<path d="M14 15C13.4477 15 13 15.4477 13 16C13 16.5523 13.4477 17 14 17H20C20.5523 17 21 16.5523 21 16C21 15.4477 20.5523 15 20 15H14Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('list-ul-alt-1', ListUlAlt1);
