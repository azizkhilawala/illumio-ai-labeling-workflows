import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ListUlAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M3.5 7.5C4.32843 7.5 5 6.82843 5 6C5 5.17157 4.32843 4.5 3.5 4.5C2.67157 4.5 2 5.17157 2 6C2 6.82843 2.67157 7.5 3.5 7.5Z" fill={color}/>
<path d="M3.5 13.5C4.32843 13.5 5 12.8284 5 12C5 11.1716 4.32843 10.5 3.5 10.5C2.67157 10.5 2 11.1716 2 12C2 12.8284 2.67157 13.5 3.5 13.5Z" fill={color}/>
<path d="M5 18C5 18.8284 4.32843 19.5 3.5 19.5C2.67157 19.5 2 18.8284 2 18C2 17.1716 2.67157 16.5 3.5 16.5C4.32843 16.5 5 17.1716 5 18Z" fill={color}/>
<path d="M8 5C7.44772 5 7 5.44772 7 6C7 6.55228 7.44772 7 8 7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H8Z" fill={color}/>
<path d="M7 12C7 11.4477 7.44772 11 8 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H8C7.44772 13 7 12.5523 7 12Z" fill={color}/>
<path d="M8 17C7.44772 17 7 17.4477 7 18C7 18.5523 7.44772 19 8 19H21C21.5523 19 22 18.5523 22 18C22 17.4477 21.5523 17 21 17H8Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('list-ul-alt', ListUlAlt);
